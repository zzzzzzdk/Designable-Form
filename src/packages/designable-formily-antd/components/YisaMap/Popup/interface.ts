import { ReactNode } from 'react'
import { Map, Point } from 'leaflet'
import { Lat, Lng } from '../BaseMap/interface'

export interface PopupProps {
  __map__?: Map;
  className?: string;
  visible?: boolean;
  closeOnClick?: boolean;
  onClose?: () => void;
  lat?: Lat;
  lng?: Lng;
  xOffset?: number;
  yOffset?: number;
  width?: number;
  keepInView?: boolean;
  autoPanPadding?: Point;
  autoPanPaddingTopLeft?: Point;
  autoPanPaddingBottomRight?: Point;
  children?: ReactNode
}
