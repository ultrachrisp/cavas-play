export const tester = () => {return 77;};

// const getElement = selector => document.querySelector(selector).textContent;
// const getJson = elem => JSON.parse(elem);

// const start = str => getJson(getElement(str));

// const json = start("script[type='application/json']");
// console.log(json);

export function Main(){
    return {
        test: () => tester()
    };
};
