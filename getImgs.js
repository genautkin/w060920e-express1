const fetch = require('node-fetch');

exports.getArrayImg = function (num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        let x= 300 +i;
        arr.push({src:"https://picsum.photos/"+x+"/300"})
    }
    return arr;
};

exports.getArrayImg2 =async function (num) {
    let promises = [];
    let arr = [];
    for (let i = 0; i < num; i++) {
        promises.push(fetch('https://picsum.photos/300/300')
        .then(res => arr.push({src:res.url})))
    }
    await Promise.all(promises)
     return arr;
};