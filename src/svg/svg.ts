import render from "./templates";

export interface IPart {
  toSvg(): string;
}

export default class RSvg {
  private height: number;
  private width: number;
  private parts: Array<IPart>;
  constructor(height, width, parts: Array<IPart> = []) {
    this.height = height
    this.width = width
    this.parts = parts
  }

  private drawBorder() {
    return [
      render('line', { start: { x: 0, y: 0 }, end: { x: 0, y: 1000 }}),
      render('line', { start: { x: 0, y: 1000 }, end: { x: 1000, y: 1000 }}),
      render('line', { start: { x: 1000, y: 1000 }, end: { x: 1000, y: 0 }}),
      render('line', { start: { x: 1000, y: 0 }, end: { x: 0, y: 0 }}),
    ].join('')
  }

  public addPart(part: IPart) {
    this.parts.push(part)
  }

  public toSvg() {
    return render(
      'svg',
      {
        width: this.width,
        height: this.height,
        viewport: {
          min: { x: 0, y: 0 },
          max: { x: 1000, y: 1000 },
        },
        content: this.parts.map(part => part.toSvg()).join('') + this.drawBorder(),
      }
    );

  }
}