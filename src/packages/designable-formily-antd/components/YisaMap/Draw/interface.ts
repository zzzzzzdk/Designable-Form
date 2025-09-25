import { Map, PathOptions, LatLng } from 'leaflet'
import * as geojson from 'geojson'

export type Type = 'default' | 'circle' | 'rectangle' | 'polyline' | 'polygon' | 'clear'
export type DrawVectorData = {
  type?: Type,
  radius?: number,
  center?: LatLng | null,
  northEast?: LatLng | null;
  southWest?: LatLng | null;
  latLngs?: LatLng[];
  geoJson?: geojson.Feature
}

export interface DrawProps {
  __map__?: Map;
  type: Type;
  confirmType?: '1' | '2';
  startEventName?: "click" | "dblclick" | "mousedown" | "mouseup" | "mouseover" | "mouseout" | "mousemove" | "contextmenu" | "preclick";
  processEventName?: "click" | "dblclick" | "mousedown" | "mouseup" | "mouseover" | "mouseout" | "mousemove" | "contextmenu" | "preclick";
  endEventName?: "click" | "dblclick" | "mousedown" | "mouseup" | "mouseover" | "mouseout" | "mousemove" | "contextmenu" | "preclick";
  vectorStyle?: PathOptions
  saveVectorType?: '1' | '2' | '3';
  saveTime?: number;
  onChange?: (type: Type, vector?: DrawVectorData) => void;
}
