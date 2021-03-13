export interface GeneralSettings {
  tag: string;
  svg: string;
  svgQuery: string;
  svgWidth: number;
  colours: Array<string>;
}

export interface CanvasObject {
  element: Element;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  grid: Array<Array<number>>;
  x: number;
  y: number;
}
