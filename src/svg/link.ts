import { ILink, INode, TPoint } from "src/types/payload";
import { LOAD_COLORS } from "./constants";
import render from "./templates";
import { IPart } from "./svg";

export default class RLink implements IPart {
  private id: number;
  private parts = [];
  private color: string;
  constructor(link: ILink, nodes: Array<INode>) {
    const fromNode = nodes.filter(node => node.id === link.fromNodeId);
    const toNode = nodes.filter(node => node.id === link.toNodeId);
    this.id = link.id;
    const { coordinates } = link.geometry;
    for(let i = 0; i < coordinates.length-1; i++) {
      const start = this.getPoint(coordinates[i]);
      const end = this.getPoint(coordinates[i+1]);
      const color = LOAD_COLORS[link.load];
      this.color = color;
      let part = { start, end, color, from: undefined, to: undefined };
      if (i === 0) {
        part.from = fromNode[0];
      } 
      if (i === coordinates.length - 2) {
        part.to = toNode[0];
      }
      this.parts.push(part);
    }
  }

  public getFigure(
    { from, to, start, end, color }: { from?: INode, to: INode, start: TPoint, end: TPoint, color: string},
     i?: number
  ) {
    const a = end.x - start.x;
    const b = end.y - start.y;
    const l = Math.sqrt(a*a + b*b);
    let angle = Math.atan(Math.abs(a/b));
    if (a > 0) {
      if (b > 0) {
        angle = Math.PI - angle
      } else {
        angle = Math.PI + angle
      }
    } else {
      if (b < 0) {
        angle = Math.PI - angle
      }
    }
    let shiftStart = 5;
    let shiftEnd = 5;
    try {
      if (from) {
        const { radius, center } = from.geometry;
        shiftStart = Math.ceil(radius / 3) - Math.sqrt(
          Math.pow(center[0] - start.x,2) + Math.pow(center[1] - start.y, 2)
        ) + 10;
      }
      if (to) {
        const { radius, center } = to.geometry;
        shiftEnd = Math.ceil(radius / 3) - Math.sqrt(
          Math.pow(center[0] - end.x,2) + Math.pow(center[1] - end.y, 2)
        ) + 15;
      }
    } catch (e) {
      console.error(from)
    }
    const p1 = this.rotateCoord(start, { x: -20, y: shiftStart }, angle);
    const p2 = this.rotateCoord(start, { x: 0, y: shiftStart + 10 }, angle);
    const p3 = this.rotateCoord(start, { x: 20, y: shiftStart }, angle);
    const p3c = this.rotateCoord(start, { x: 20, y: shiftStart + l/2 }, angle);
    const p4 = this.rotateCoord(start, { x: 20, y: l - shiftEnd }, angle);
    const p5 = this.rotateCoord(start, { x: 0, y: l + 10 - shiftEnd }, angle);
    const p6 = this.rotateCoord(start, { x: -20, y: l - shiftEnd }, angle);
    const p6c = this.rotateCoord(start, { x: -20, y: shiftStart + l/2 }, angle);
    console.log(start, end, a, b, angle, from?.id, to?.id)
    return render('link', {
      id: this.id,
      i,
      start: p1,
      points: [p2,p3,p3c,p4,p5,p6,p6c],
      color,
    });
  }

  public rotateCoord(center, point, angle) {
    const x = Math.trunc((point.x * Math.cos(angle)) - (point.y * Math.sin(angle)) + center.x);
    const y = Math.trunc((point.x * Math.sin(angle)) + (point.y * Math.cos(angle)) + center.y);
    return {
      x,
      y,
    }
  }

  private getPoint([x, y]) {
    return { x, y }
  }

  public toSvg() {
    return this.parts.map((part, i) => this.getFigure(part, i)).join('')
  }
}