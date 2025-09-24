import { ReactElement } from 'react'
import {
  MapOptions,
  Control,
  LayersControlEvent,
  LayerEvent,
  LeafletEvent,
  ResizeEvent,
  PopupEvent,
  TooltipEvent,
  LeafletMouseEvent,
  LeafletKeyboardEvent,
  ZoomAnimEvent
} from 'leaflet'

export type Lat = number | string
export type Lng = number | string
export type Event = LayersControlEvent | LayerEvent | LeafletEvent | ResizeEvent | PopupEvent | TooltipEvent | LeafletMouseEvent | LeafletKeyboardEvent | ZoomAnimEvent

export interface MapProps {
  domId?: string;
  mapOptions?: MapOptions;
  showZoom?: boolean;
  zoomOptions?: Control.ZoomOptions;
  showScale?: boolean;
  scaleOptions?: Control.ScaleOptions;
  backgroundImg?: string;
  [key: `on${string}`]: (e: Event) => void;
  children?: ReactElement[];
}
