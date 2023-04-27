export interface IImmageOptions {
  width: number;
  height: number;
  format: String;
}

export interface ILoadData {
  link_id: number;
  load: number;
}

export interface ILocation {
  lng: number;
  lat: number;
}

export interface IGeometry {
  type: String;
  id: number;
}

export type TCoords = [number, number];

export interface INodeGeometry extends IGeometry {
  center: TCoords,
  radius: number,
  controllerId: number|null;
}
export interface ILinkGeometry extends IGeometry {
  coordinates: Array<TCoords>;
}
export interface INode {
  location: ILocation;
  geometry: INodeGeometry;
  id: number;
  controllerId: number|null;
}

export interface ILink {
  fromNodeId: number;
  toNodeId: number;
  length: number;
  startPoint: ILocation;
  endPoint: ILocation;
  geometry: ILinkGeometry;
  id: number;
  load?: number;
}

export interface IGraphData {
  nodes: Array<INode>;
  links: Array<ILink>;
}

export interface IPayload {
  graph: IGraphData;
  loads: Array<ILoadData>;
  image: IImmageOptions
}