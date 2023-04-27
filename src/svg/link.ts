import { ILink, INode } from "src/types/payload";
import { LOAD_COLORS } from "./constants";
import render from "./templates";

export default class RLink {
  private parts = [];
  constructor(link: ILink, nodes: Array<INode>) {
    const fromNode = nodes.filter(node => node.id === link.fromNodeId);
    const toNode = nodes.filter(node => node.id === link.toNodeId);
    const { coordinates } = link.geometry;
    for(let i = 0; i < coordinates.length-1; i++) {
      const start = this.getPoint(coordinates[i]);
      const end = this.getPoint(coordinates[i+1]);
      const color = LOAD_COLORS[link.load];
      this.parts.push({ start, end, color });
    }
  }

  private getPoint([x, y]) {
    return { x, y }
  }

  public toSvg() {
    return this.parts.map(part => render('line', part)).join('')
  }
}