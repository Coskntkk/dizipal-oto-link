// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const request = require('request');

export default function handler(req, res) {
  const { num } = req.query;
  let options = {
    'method': 'GET',
    'url': `http://dizipal${num}.com`,
    'headers': {}
  };
  request(options, function (error, response) {
    try {
      let body = response.body;
      let finding = "https://dizipal";
      let dizipalUrl = body.indexOf(finding);
      let bakim = body.indexOf('<title>bakım</title>');
      if (dizipalUrl > -1) {
        // Link var

        if (bakim > -1) {
          // Bakımda
          res.send({ success: false, link: null, status: 2 });

        } else  {
          let link = body.substring(dizipalUrl + finding.length, dizipalUrl + finding.length + 3);
          // Site açık
          res.send({ success: true, link: link, status: 1 });

        }
      } else {
        res.send({ success: false, link: null, status: 0 });

      }
    } catch (e) {
      res.send({ success: false, link: null, status: 0 });

    }
  });
}