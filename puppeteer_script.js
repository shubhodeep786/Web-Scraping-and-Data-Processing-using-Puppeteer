const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Go to the specified URL
  await page.goto('https://abrahamjuliot.github.io/creepjs/');

  // Wait for the page to load
  await page.waitForSelector('.trust-score');

  // Pull information for related fields
  const trustScore = await page.$eval('.trust-score', (element) => element.textContent.trim());
  const lies = await page.$eval('.lies', (element) => element.textContent.trim());
  const bot = await page.$eval('.bot', (element) => element.textContent.trim());
  const fingerprint = await page.$eval('.fp-id', (element) => element.textContent.trim());

  // Save JSON of fields
  const data = {
    trustScore,
    lies,
    bot,
    fingerprint,
  };

  const jsonFilePath = 'output.json';
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
  console.log(`Data saved to ${jsonFilePath}`);

  // Create PDF of the page
  const pdfFilePath = 'output.pdf';
  await page.pdf({ path: pdfFilePath, format: 'A4' });
  console.log(`PDF saved to ${pdfFilePath}`);

  // Close the browser
  await browser.close();
})();
