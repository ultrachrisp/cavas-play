const imgWidth: number = 75;

interface CanvasObject {
  element: Element | null;
  context: CanvasRenderingContext2D | null;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  grid: Array<Array<number>>;
  x: number;
  y: number;
}

export function createCanvas(tag: string): CanvasObject {
  const canvas = document.createElement('canvas');
  const element = document.querySelector(tag);
  if (element) {
    element.innerHTML = '';
    element.appendChild(canvas);
    setCanvasSize({ element, canvas });

    return {
      canvas,
      element: element,
      context: canvas.getContext('2d'),
      width: canvas.width,
      height: canvas.height,
      grid: initGrid({ canvas, svgWidth: imgWidth }),
      x: 0,
      y: 0,
    }
  } else {
    // need to relook canvases that are not on the DOM
    return {
      canvas,
      element: null,
      context: canvas.getContext('2d'),
      width: canvas.width,
      height: canvas.height,
      grid: initGrid({ canvas, svgWidth: 1 }),
      x: 0,
      y: 0,
    }
  }
}

function initGrid({ canvas, svgWidth }) {
  const rows = Math.floor(canvas.height / svgWidth);
  const coloumns = Math.floor(canvas.width / svgWidth);

  return (new Array(coloumns).fill(0).map(() => new Array(rows).fill(0)));
}

function getCanvasDimensions(element: Element) {
  const boundingRect = element.getBoundingClientRect();
  const canvasWidth = boundingRect.width;
  const possibleHeight = window.innerHeight - (boundingRect.top * 2);
  const canvasHeight = (canvasWidth > possibleHeight) ? possibleHeight : canvasWidth;
  return { canvasWidth, canvasHeight };
}

export function setCanvasSize({ element, canvas }: { element: Element, canvas: HTMLCanvasElement }) {
  const { canvasWidth, canvasHeight } = getCanvasDimensions(element);

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  return canvas;
}

export function loadSvg(settings, obj, i, j) {
  const { svg, svgQuery, colours } = settings,
    result = svg.replace(svgQuery, colours[1]),
    uri = encodeURIComponent(result),
    img = new Image();

  img.onload = () => {
    const xPos: number = i * imgWidth;
    const yPos: number = j * imgWidth;
    obj.context.drawImage(img, xPos, yPos);
  };
  img.src = `data:image/svg+xml,${uri}`;
}
