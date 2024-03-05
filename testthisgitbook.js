const cheerio = require('cheerio');

const url = 'https://docs.gitbook.com/~/revisions/LY3FInGWRPLqJ2twwI3U/publishing/share/pdf-export'


async function aaArt(url) {
    const resp = await fetch(url);
    const html = await resp.text();
    
    let $ = cheerio.load(html);
    const article = $('main').html();
    console.log(article);
    console.log('yay');
    
    if (article) {
        resolve(article);
        return article;
    }
    if (!article) {
        rejects('no go bro');
        return 'no go bro';
    }
}

async function extractArticle(url) {
    const html = await fetch(url, (resp) => {
        return resp.text();
    }).then((html) => {
        console.log('got the html');
        // console.log(html.splice(-1500, -1));
        let cheerio = cheerio.load(html);

        const article =  cheerio('article').html();
        
        return article;
    }).then((data) => {
        console.log('some data')
        return data;
    }).catch((err) => { console.log('Error parsing: ', err) })

    console.log('article start: ', await html.splice(0, 1500));
}

const maintext = aaArt(url);
console.log(maintext);
// await extractArticle(url);