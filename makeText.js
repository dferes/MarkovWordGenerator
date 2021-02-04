const fs = require('fs');
const axios = require('axios');
const doAsync = require('doasync');
const markov = require('./markov');

const type = process.argv[2];
const source = process.argv[3];

if(type == undefined || source == undefined) {
    console.log('missing an argument...');
    process.exit(1);
}


async function cat(path) {
    return doAsync(fs).readFile(path, 'utf8')
        .then(text => {return text});
}


async function webCat(URL) {
    try {
        resp = await axios.get(URL);
    } catch (err) {
        console.log(`Error fetching ${URL}\n  ${err}`);
        process.exit(1);
    }
    return resp.data;
}


if (!(['file', 'url'].includes(type))) {
    console.log(`command ${type} not found.`);

}else if (type === 'file'){
    try {
        cat(source).then( text => {
            mm = new markov.MarkovMachine(text);
            console.log(mm.makeText());
        });
    }catch (err) {
        console.log(`Error: \n  ${err}`);
    }

}else {
    webCat(source).then( res => {
        mm = new markov.MarkovMachine(res);
        console.log(mm.makeText());

    })
}
