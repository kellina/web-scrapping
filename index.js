const puppeteer = require("puppeteer");
const fs = require("fs");

//TODO  pesquisar sobre o fs

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
//   await page.setViewport({width:960,height:768});
  await page.goto("https://instagram.com/instagram");

  const list = await page.evaluate(() => {
    // all this function will be performed in the browser
    // let's get all the images that are in the post
    const nodeList = document.querySelectorAll("article img");
    // transformar o nodeList em array
    const imgArray = [...nodeList];
    // transform nodeList (html) into js object
    const imgList = imgArray.map(({ src }) => ({
      src,
    }));
    // put out of function
    return imgList;
  });

  // write data to local file (json)
  fs.writeFile("instagram.json", JSON.stringify(list, null, 2), (err) => {
    if (err) throw new Error("Something went wrong");

    console.log("Well done!");
  });

  await browser.close();
})();
