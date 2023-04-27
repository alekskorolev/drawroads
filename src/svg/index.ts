import { ILink, INode, IPayload } from "src/types/payload";
import prepare from "./prepare";
import RNode from "./node";
import RLink from "./link";
import RSvg from "./svg";

export default function svg(data: IPayload) {
  const { links, nodes } = prepare(data).graph;
  const { width, height } = data.image;

  const rsvg = new RSvg(width, height);

  links.map((link: ILink) => rsvg.addPart(new RLink(link, nodes)));

  nodes.map((node: INode) => rsvg.addPart(new RNode(node, links)));

  return rsvg.toSvg();
}