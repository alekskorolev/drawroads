import { ILink, INode } from "src/types/payload";
import { LOAD_COLORS } from "./constants";
import render from "./templates";
import { IPart } from "./svg";

export default class RNode implements IPart {
  private color: string;
  private x: number;
  private y: number;
  private radius: number;

  constructor(node: INode, links: Array<ILink>) {
    const { id, geometry } = node;
    const { center, radius } = geometry;
    const [x, y] = center;
    const loads = links.filter(link => {
      return link.fromNodeId === id || link.toNodeId === id;
    }).map(link => link.load || 0);
    const avLoad = Math.ceil(loads.reduce((acc, load) => acc+load, 0)/loads.length)
    this.color = LOAD_COLORS[avLoad];
    this.x = x;
    this.y = y;
    this.radius = Math.ceil(radius/3.5);
  }

  public toSvg() {
    return render('circle', {
      x: this.x,
      y: this.y,
      radius: this.radius,
      color: this.color
    })
  }
}