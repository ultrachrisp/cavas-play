function test(){
    return 23;
}

function test2(){
    return 34;
}

export default function Particle() {
    return {
        test: () => test(),
        test2: () => test2()
    };
};
