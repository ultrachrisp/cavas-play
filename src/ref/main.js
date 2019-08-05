// const json = '[{"hello": "hazit"}]';

export const tester = () => {return 77;};

const getElement = selector => document.querySelector(selector).innerHTML;
const getJson = elem => JSON.parse(elem);

// const start =getJson(getElement("script[type='application/json']"));
const start = str => str
      |> getElement
      |> getJson;

const tagID = start("script[type='application/json']");
console.log(tagID);

export function Main(){
    return {
        test: () => tester()
    };
};
