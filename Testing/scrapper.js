// import puppeteer from 'puppeteer';

// async function ScrapeQuotes() {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   await page.goto('https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4254104115', { waitUntil: 'domcontentloaded' });

//   const quotes = await page.evaluate(() => {
//     const quoteElements = document.querySelectorAll('.quote');
//     const data = [];

//     quoteElements.forEach(quote => {
//       const text = quote.querySelector('#ember50')?.innerText || '';
//       data.push({ text, author });
//     });

//     return data;
//   });

//   console.log('Scraped Quotes:', quotes);

//   await browser.close();
// }

// ScrapeQuotes().catch(console.error);



import puppeteer from 'puppeteer';

async function scrapeJobs() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.linkedin.com/jobs/collections/recommended/?currentJobId=4254104115', { waitUntil: 'domcontentloaded' });

  // Update the selector below to match the actual job title elements on the page
  const jobs = await page.evaluate(() => {
    // Example: select all job title links
    const jobNodes = document.querySelectorAll('a.job-card-list__title');
    const data = [];
    jobNodes.forEach(node => {
      data.push({
        title: node.innerText.trim(),
        url: node.href
      });
    });
    return data;
  });

  console.log('Scraped Jobs:', jobs);

  await browser.close();
}

scrapeJobs().catch(console.error);