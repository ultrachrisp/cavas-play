function createCanvas({selector}){
    const element = document.querySelector(selector);
    element.innerHTML = '';
    
    const canvas = document.createElement('canvas');
    // canvas.setAttribute('width', 100);
    // canvas.setAttribute('height', 100);

    element.appendChild(canvas);

    window.addEventListener('resize', (evt) => {
        setCanvasSize(element);
    }, false);
    return canvas.getContext('2d');
}

function setCanvasSize(element){
    console.log(element.getBoundingClientRect());
}

export { createCanvas };
