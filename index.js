const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const proxyurl = "https://api.allorigins.win/raw?url=";


async function getLink() {
    const data = await fs.readFileSync('./config.json', 'utf8', function (err, data) {
        if (err) throw err;
        return parseInt(data);
    });
    return parseInt(data.link);
};

async function updateLink(newLink) {
    console.log('Updating link...');
    await fs.writeFileSync('./config.json', `{
    "link": "${newLink}"
}`, function (err) {    
        if (err) {
            return console.log(err);
        }
    });
    link = newLink;
};


app.get('/', async (req, res) => {
    // Get link
    let link = await getLink() || 205;
    console.log('link: ' + link);

    let options = {
        method: 'GET',
        url: `${proxyurl}https://dizipal${link}.com`,
    };

    // Send request to API
    request(options, function (error, response, body) {
        console.log(options.url);
        if (error) {
            console.log(error);
            updateLink(link + 1);
            link = getLink();
        } else if (response.statusCode == 200 && body.indexOf('dizipal') > -1) {
            const ind = body.indexOf('dizipal');
            const newLink = body.substring(ind + 7, ind + 10);
            console.log(body);
            console.log('newLink: ' + newLink);
            // updateLink(newLink);
            res.redirect('https://dizipal' + newLink + '.com');
        } else {
            updateLink(link + 1);
            link = getLink();
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Example app listening on port 3000!');
});