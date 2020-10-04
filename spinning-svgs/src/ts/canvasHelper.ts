let timeOutFunctionId: number;
const timeOutDuration: number = 250;

interface CanvasObject {
  element: Element | null;
  context: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  grid: Array<Array<number>>;
}

export function createCanvas(tag: string): CanvasObject {
  const canvas = document.createElement('canvas');
  const element = document.querySelector(tag);
  if (element) {
    element.innerHTML = '';
    element.appendChild(canvas);
    setCanvasSize({ element, canvas });

    window.addEventListener('resize', () => {
      clearTimeout(timeOutFunctionId);
      timeOutFunctionId = window.setTimeout(() => setCanvasSize({ element, canvas }), timeOutDuration);
    }, false);
    return {
      element: element,
      context: canvas.getContext('2d'),
      width: canvas.width,
      height: canvas.height,
      grid: initGrid({ canvas, svgWidth: 75 }),
    }
  } else {
    // this could fail hard, need to relook canvases that are not on the DOM
    return {
      element: null,
      context: canvas.getContext('2d'),
      width: canvas.width,
      height: canvas.height,
      grid: initGrid({ canvas, svgWidth: 1 }),
    }
  }
}

function initGrid({ canvas, svgWidth }) {
  const rows = Math.floor(canvas.height / svgWidth);
  const coloumns = Math.floor(canvas.width / svgWidth);

  return (new Array(rows).fill(0).map(() => new Array(coloumns).fill(0)));
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
