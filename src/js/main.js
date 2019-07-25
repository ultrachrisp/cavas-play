const json = '[{"hello": "hazit"}]';

export const tester = () => {return 77;};

const getElement = selector => json ||document.querySelector(selector).innerHTML;
const getJson = elem => JSON.parse(elem);

const start = str => getJson(getElement(str));

const tagID = start("script[type='application/json']");
console.log(json);

export function Main(){
    return {
        test: () => tester()
    };
};
