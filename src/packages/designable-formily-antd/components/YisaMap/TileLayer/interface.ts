import { Map, TileLayerOptions } from 'leaflet'

export interface TileLayerProps {
  __map__?: Map;
  tileUrlTemplate: string;
  tileLayerOptions?: TileLayerOptions,
  matrixR?: number,
  matrixG?: number,
  matrixB?: number
}
