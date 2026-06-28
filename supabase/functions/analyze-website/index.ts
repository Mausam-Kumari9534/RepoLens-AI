const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LighthouseAudit {
  score: number | null;
  displayValue?: string;
  numericValue?: number;
}

interface LighthouseCategory {
  score: number | null;
}

interface PageSpeedResult {
  lighthouseResult?: {
    categories: {
      performance?: LighthouseCategory;
      accessibility?: LighthouseCategory;
      'best-practices'?: LighthouseCategory;
      seo?: LighthouseCategory;
    };
    audits: {
      'largest-contentful-paint'?: LighthouseAudit;
      'cumulative-layout-shift'?: LighthouseAudit;
      'interaction-to-next-paint'?: LighthouseAudit;
      'first-contentful-paint'?: LighthouseAudit;
      'speed-index'?: LighthouseAudit;
      'total-blocking-time'?: LighthouseAudit;
      'interactive'?: LighthouseAudit;
      'uses-https'?: LighthouseAudit;
      'is-crawlable'?: LighthouseAudit;
      'viewport'?: LighthouseAudit;
      'document-title'?: LighthouseAudit;
      'meta-description'?: LighthouseAudit;
      'errors-in-console'?: LighthouseAudit;
    };
    timing?: {
      total: number;
    };
  };
  loadingExperience?: {
    metrics?: {
      LARGEST_CONTENTFUL_PAINT_MS?: { percentile: number };
      CUMULATIVE_LAYOUT_SHIFT_SCORE?: { percentile: number };
      INTERACTION_TO_NEXT_PAINT?: { percentile: number };
    };
    overall_category?: string;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { websiteUrl, strategy = 'mobile' } = await req.json();

    if (!websiteUrl) {
      return new Response(
        JSON.stringify({ success: false, error: 'Website URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Normalize URL
    let normalizedUrl = websiteUrl.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    console.log(`Analyzing website: ${normalizedUrl} (strategy: ${strategy})`);

    // PageSpeed Insights API is free and doesn't require an API key for basic usage
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalizedUrl)}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo`;

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('PageSpeed API error:', errorData);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: errorData.error?.message || `Failed to analyze website (status ${response.status})` 
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data: PageSpeedResult = await response.json();
    
    if (!data.lighthouseResult) {
      return new Response(
        JSON.stringify({ success: false, error: 'No Lighthouse results available' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const analysis = processLighthouseResults(data, normalizedUrl, strategy);

    console.log('Website analysis complete:', { 
      url: normalizedUrl, 
      performance: analysis.scores.performance,
      strategy 
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: analysis,
        source: 'PageSpeed Insights API'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error analyzing website:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Analysis failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function processLighthouseResults(data: PageSpeedResult, url: string, strategy: string) {
  const lighthouse = data.lighthouseResult!;
  const categories = lighthouse.categories;
  const audits = lighthouse.audits;
  const fieldData = data.loadingExperience;

  // Extract category scores (multiply by 100 as they come as 0-1)
  const performance = Math.round((categories.performance?.score ?? 0) * 100);
  const accessibility = Math.round((categories.accessibility?.score ?? 0) * 100);
  const bestPractices = Math.round((categories['best-practices']?.score ?? 0) * 100);
  const seo = Math.round((categories.seo?.score ?? 0) * 100);

  // Core Web Vitals from lab data
  const lcp = audits['largest-contentful-paint']?.numericValue 
    ? parseFloat((audits['largest-contentful-paint'].numericValue / 1000).toFixed(1))
    : 2.5;
  
  const cls = audits['cumulative-layout-shift']?.numericValue 
    ? parseFloat(audits['cumulative-layout-shift'].numericValue.toFixed(3))
    : 0.1;
  
  // INP might not always be available, use a reasonable default
  const inp = audits['interaction-to-next-paint']?.numericValue
    ? Math.round(audits['interaction-to-next-paint'].numericValue)
    : Math.round(audits['total-blocking-time']?.numericValue ?? 200);

  // Additional metrics
  const fcp = audits['first-contentful-paint']?.numericValue 
    ? parseFloat((audits['first-contentful-paint'].numericValue / 1000).toFixed(1))
    : null;
  
  const speedIndex = audits['speed-index']?.numericValue
    ? parseFloat((audits['speed-index'].numericValue / 1000).toFixed(1))
    : null;

  const tti = audits['interactive']?.numericValue
    ? parseFloat((audits['interactive'].numericValue / 1000).toFixed(1))
    : null;

  // Security check
  const usesHttps = audits['uses-https']?.score === 1;
  const securityScore = usesHttps ? 100 : 50;

  // SEO checks
  const isCrawlable = audits['is-crawlable']?.score === 1;
  const hasViewport = audits['viewport']?.score === 1;
  const hasTitle = audits['document-title']?.score === 1;
  const hasMetaDescription = audits['meta-description']?.score === 1;

  // Console errors
  const consoleErrors = audits['errors-in-console']?.score === 0 ? 1 : 0;

  // Generate strengths and weaknesses based on real data
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // Performance analysis
  if (performance >= 90) {
    strengths.push('Excellent overall performance score');
  } else if (performance >= 50) {
    strengths.push('Acceptable performance, room for improvement');
  } else {
    weaknesses.push('Performance needs significant optimization');
  }

  // Core Web Vitals analysis
  if (lcp <= 2.5) {
    strengths.push(`Good LCP (${lcp}s) - fast content loading`);
  } else if (lcp > 4.0) {
    weaknesses.push(`Poor LCP (${lcp}s) - slow main content loading`);
  }

  if (cls <= 0.1) {
    strengths.push('Minimal layout shift for stable UX');
  } else if (cls > 0.25) {
    weaknesses.push(`High CLS (${cls}) - layout instability issues`);
  }

  // Accessibility
  if (accessibility >= 90) {
    strengths.push(`Strong accessibility (${accessibility}%)`);
  } else if (accessibility < 70) {
    weaknesses.push(`Accessibility issues need attention (${accessibility}%)`);
  }

  // SEO
  if (seo >= 90) {
    strengths.push('Well optimized for search engines');
  } else if (seo < 70) {
    weaknesses.push('SEO improvements needed');
  }

  // Security
  if (usesHttps) {
    strengths.push('HTTPS properly configured');
  } else {
    weaknesses.push('Site not using HTTPS');
  }

  // Best Practices
  if (bestPractices >= 90) {
    strengths.push('Follows modern web best practices');
  } else if (bestPractices < 70) {
    weaknesses.push('Not following some web best practices');
  }

  // Ensure minimum items
  if (strengths.length === 0) {
    strengths.push('Website is accessible and loads content');
  }
  if (weaknesses.length === 0 && performance < 100) {
    weaknesses.push('Minor optimizations possible for perfect score');
  }

  const overallScore = Math.round((performance + accessibility + bestPractices + seo) / 4);

  return {
    url,
    strategy,
    analyzedAt: new Date().toISOString(),
    scores: {
      performance,
      seo,
      accessibility,
      bestPractices,
      overall: overallScore,
    },
    coreWebVitals: {
      lcp,
      cls,
      inp,
      fcp,
      speedIndex,
      tti,
    },
    security: {
      https: usesHttps,
      score: securityScore,
    },
    seoDetails: {
      isCrawlable,
      hasViewport,
      hasTitle,
      hasMetaDescription,
    },
    consoleErrors,
    mobileScore: strategy === 'mobile' ? performance : null,
    desktopScore: strategy === 'desktop' ? performance : null,
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 3),
    fieldData: fieldData?.overall_category || null,
  };
}
