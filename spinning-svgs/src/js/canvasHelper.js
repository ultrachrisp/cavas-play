function createCanvas({selector}){
  const canvas = document.createElement('canvas');
  const element = document.querySelector(selector);
  element.innerHTML = '';
  element.appendChild(canvas);
  canvas.width = 100;
  canvas.height = 100;

  // window.addEventListener('resize', (evt) => {
  //     setCanvasSize(element);
  // }, false);
  return canvas.getContext('2d');
}

function setCanvasSize(element){
  console.log(element.getBoundingClientRect());
}

export { createCanvas };
