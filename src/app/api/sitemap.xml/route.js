export async function GET() {
  const baseUrl = "https://connectingdotserp.com";

  const cities = [
    "pune",
    "mumbai",
    "delhi",
    "kolkata",
    "chennai",
    "bangalore",
    "hyderabad",
    "ahmedabad",
    "jaipur",
    "lucknow",
    "kanpur",
    "nagpur",
    "patna",
    "indore",
    "bhopal",
    "visakhapatnam",
    "vadodara",
    "ludhiana",
    "agra",
    "nashik",
    "rajkot",
    "varanasi",
    "kerala",
    "surat",
    "dehradun",
    "madurai",
    "mysore",
    "pondicherry",
    "ranchi",
    "coimbatore",
    "chandigarh",
    "bhubaneswar",
    "tirupati",
    "vizag",
    "trivandrum",
    "jalandhar",
    "mohali",
    "raipur",
    "cochin",
    "mangalore",
    "katraj",
    "pimpri-chinchwad",
    "shivaji-nagar",
    "koregaon-park",
    "viman-nagar",
    "pimple-saudagar",
    "baner",
    "hinjewadi",
    "wakad",
    "kothrud",
    "hadapsar",
    "aundh",
    "navi-mumbai",
    "thane",
    "kalyan",
    "bandra",
    "andheri",
    "powai",
    "worli",
    "chembur",
    "malad",
    "vile-parle",
    "matunga",
  ];

  const courses = [
    "sap-course-in",
    "it-course-in",
    "hr-training-course-in",
    "data-visualization-course-in",
    "data-science-course-in",
    "data-analytics-course-in",
    "business-analytics-course-in",
    "chatgpt-course-in",
    "full-stack-developer-course-in",
    "java-course-in",
    "mern-stack-course-in",
    "python-course-in",
    "salesforce-course-in",
    "ui-ux-course-in",
    "sap-ewm-course-in",
    "sap-abap-course-in",
    "sap-ariba-course-in",
    "sap-basis-course-in",
    "sap-bwbi-course-in",
    "sap-fico-course-in",
    "sap-s4-hana-course-in",
    "sap-hr-hcm-course-in",
    "sap-mm-course-in",
    "sap-pm-course-in",
    "sap-pp-course-in",
    "sap-ps-course-in",
    "sap-qm-course-in",
    "sap-scm-course-in",
    "sap-sd-course-in",
    "sap-successfactors-course-in",
    "power-bi-course-in",
    "sql-course-in",
    "tableau-course-in",
    "digital-marketing-course-in",
    "hr-analytics-course-in",
    "core-hr-course-in",
    "hr-management-course-in",
    "hr-payroll-course-in",
    "hr-generalist-course-in",
  ];

  const quizPages = ["react", "javascript", "nextjs"];

  // Get current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

  // Generate course and city URLs
  const courseUrls = courses.flatMap((course) =>
    cities.map((city) => {
      const url = `${baseUrl}/${course}-${city}`;
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
  );

  // Generate city sitemap URLs
  const citySitemapUrls = cities.map((city) => {
    const url = `${baseUrl}/sitemap/${city}`;
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Generate quiz URLs
  const quizUrls = [
    // Main quiz page
    `  <url>
    <loc>${baseUrl}/quiz</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`,
    // Individual quiz pages
    ...quizPages.map((quiz) => {
      const url = `${baseUrl}/quiz/${quiz}`;
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }),
  ];

  // Static pages (Home, About Us, Courses, etc.)
  const staticUrls = [
    `  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`,
    `  <url>
    <loc>${baseUrl}/aboutus</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`,
    `  <url>
    <loc>${baseUrl}/courses</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
    `  <url>
    <loc>${baseUrl}/contactus</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`,
    `  <url>
    <loc>${baseUrl}/sitemap</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
    `  <url>
    <loc>${baseUrl}/all-course-links</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
  ];

  // Check if sitemap is too large (50,000 URL limit)
  const totalUrls = staticUrls.length + courseUrls.length + citySitemapUrls.length + quizUrls.length;
  
  if (totalUrls > 50000) {
    console.warn(`Sitemap contains ${totalUrls} URLs, which exceeds the 50,000 limit. Consider splitting into multiple sitemaps.`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.join('\n')}
${courseUrls.join('\n')}
${citySitemapUrls.join('\n')}
${quizUrls.join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}