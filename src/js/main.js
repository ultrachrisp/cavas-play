const getElement = selector => document.querySelector(selector).textContent;
const getJson = elem => JSON.parse(elem);

const start = str => getJson(getElement(str));


const json = start("script[type='application/json']");
console.log(json);
