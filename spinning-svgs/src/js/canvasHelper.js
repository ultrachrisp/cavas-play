export function createCanvas({selector}){
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

export function loadSvg(settings, context){
  const { svg, svgQuery, colours } = settings,
        result = svg.replace(svgQuery, colours[1]),
        uri = encodeURIComponent(result),
        img = new Image();
  
  img.onload = () => {
    context.drawImage(img, 0, 0);
  };
  img.src = `data:image/svg+xml,${uri}`;
}

// function setCanvasSize(element){
//   console.log(element.getBoundingClientRect());
// }

