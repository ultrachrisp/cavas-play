import { CanvasObject, GeneralSettings } from "./types";

const imgWidth: number = 75;

export function createCanvas(tag: string): CanvasObject {
  const canvas = document.createElement('canvas');
  const element = document.querySelector(tag)!; // little ugly, but assuring TS we will find the element

  element.innerHTML = '';
  element.appendChild(canvas);
  setCanvasSize({ element, canvas });

  return {
    canvas,
    element: element,
    context: canvas.getContext('2d')!, // little ugly, but assuring TS we will find the element
    width: canvas.width,
    height: canvas.height,
    grid: initGrid({ canvas, svgWidth: imgWidth }),
    x: 0,
    y: 0,
  }
}

function initGrid({ canvas, svgWidth }: { canvas: HTMLCanvasElement, svgWidth: number }) {
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

interface LoadSVG {
  settings: GeneralSettings;
  obj: CanvasObject;
  x: number;
  y: number;
}

export function loadSvg({ settings, obj, x, y }: LoadSVG) {
  const { svg, svgQuery, colours } = settings,
    result = svg.replace(svgQuery, colours[1]),
    uri = encodeURIComponent(result),
    img = new Image();

  img.onload = () => {
    const xPos: number = x * imgWidth;
    const yPos: number = y * imgWidth;
    obj.context.drawImage(img, xPos, yPos);
  };
  img.src = `data:image/svg+xml,${uri}`;
}
