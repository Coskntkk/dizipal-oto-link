// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const request = require("request-promise");
const cheerio = require("cheerio");

export default async function handler(req, res) {
  const { num } = req.query;
  try {
    let html = await request.get(`https://dizipal${num}.com/`);
    const $ = cheerio.load(html);
    let urlTag = $("[property='og:url']");
    let url = urlTag.attr().content;
    let number = url.split("https://dizipal")[1].split(".")[0];
    res.send({ success: true, link: number, status: 1 });
  } catch (err) {
    res.send({ success: false, link: null, status: 0 });
  }
}