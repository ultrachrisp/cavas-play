let timeOutFunctionId: number;
const timeOutDuration: number = 250;

export function createCanvas(tag: string) {
  const element = document.querySelector(tag);
  if (element) {
    const canvas = document.createElement('canvas');
    element.innerHTML = '';
    element.appendChild(canvas);
    setCanvasSize({ element, canvas });

    window.addEventListener('resize', () => {
      clearTimeout(timeOutFunctionId);
      timeOutFunctionId = window.setTimeout(() => setCanvasSize({ element, canvas }), timeOutDuration);
    }, false);
    return canvas.getContext('2d');
  }
}

function getCanvasDimensions(element: Element) {
  const boundingRect = element.getBoundingClientRect();
  const canvasWidth = boundingRect.width;
  const possibleHeight = window.innerHeight - (boundingRect.top * 2);
  const canvasHeight = (canvasWidth > possibleHeight) ? possibleHeight : canvasWidth;
  return { canvasWidth, canvasHeight };
}

function setCanvasSize({ element, canvas }: { element: Element, canvas: HTMLCanvasElement }) {
  const { canvasWidth, canvasHeight } = getCanvasDimensions(element);

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  return canvas;
}

export function loadSvg(settings, context) {
  const { svg, svgQuery, colours } = settings,
    result = svg.replace(svgQuery, colours[1]),
    uri = encodeURIComponent(result),
    img = new Image();

  img.onload = () => {
    context.drawImage(img, 0, 0);
  };
  img.src = `data:image/svg+xml,${uri}`;
}
