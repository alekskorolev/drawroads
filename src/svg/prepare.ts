import { ILink, ILoadData, INode, IPayload, TCoords } from "src/types/payload.d";

function normal(min, max, val) {
  return Math.ceil(980 * (val - min) / (max - min)) + 10;
}

export default function prepare(data: IPayload): IPayload {
  let minX: number = 1e100;
  let minY: number = 1e100;
  let maxX: number = 0;
  let maxY: number = 0;
  data.graph.nodes.forEach((node: INode) => {
    const [x, y] = node.geometry.center;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  });
  data.graph.links.forEach((link: ILink) => {
    link.geometry.coordinates.forEach((coord) => {
      const [x, y] = coord;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x < minX) minX = x;
      if (y < minY) minY = y;

      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    })
  });
  const nodes = data.graph.nodes.map((node: INode) => {
    const center: TCoords = [
      normal(minX, maxX, node.geometry.center[0]),
      normal(minY, maxY, node.geometry.center[1]),
    ]
    return {
      ...node,
      geometry: {
        ...node.geometry,
        center
      },
    }
  });
  const links = data.graph.links.map((link: ILink) => {
    const loadItem: ILoadData = data.loads.find(({ link_id }) => link.id === link_id); 
    const load = loadItem ? loadItem.load : 0;
    return {
      ...link,
      load,
      geometry: {
        ...link.geometry,
        coordinates: link.geometry.coordinates.map(coord => {
          return [
            normal(minX, maxX, coord[0]),
            normal(minY, maxY, coord[1]),
          ] as TCoords;
        })
      }
    }
  });
  return {
    ...data,
    graph: {
      links,
      nodes,
    },
  }
}