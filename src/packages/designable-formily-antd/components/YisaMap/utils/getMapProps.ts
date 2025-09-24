/* eslint-disable no-loss-of-precision */
import L from 'leaflet';
import { isArray, isObject } from '@/utils/is';
import { MapProps } from '../YisaMap';

export default function getMapProps(props: MapProps) {
  const {
    domId = `map-${Math.random().toString(36).substring(2, 15)}`,
    center = [120.205252, 35.965781] as number[],
    zoom = 14,
    zooms = [3, 18],
    mapTileTemplate = 'http://114.215.146.210:25003/v3/tile?z={z}&x={x}&y={y}',
    mapTileOptions,
    mapTileHost = 'http://114.215.146.210:25003',
    mapCRS,
    mapTileType,
  } = props;

  let thisCRS: any = L.CRS;

  // @ts-expect-error 类型L.Proj
  const DMCRS = new L.Proj.CRS(
    'EPSG:4326',
    '+proj=longlat +datum=WGS84 +no_defs',
    {
      resolutions: [
        1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125,
        0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125,
        0.001373291015625, 0.0006866455078125, 0.00034332275390625,
        0.000171661376953125, 0.0000858306884765625, 0.00004291534423828125,
        0.000021457672119140625, 0.000010728836059570312,
        0.000005364418029785156, 0.000002682209014892578,
        0.000001341104507446289, 6.705522537231445e-7, 3.3527612686157227e-7,
      ],
      origin: [-180, 90],
    },
  );

  if (mapTileType === 'dingmai') {
    thisCRS = DMCRS;
  } else {
    // @ts-expect-error 类型L.CRS 未定义
    thisCRS = mapCRS ? L.CRS[`EPSG${mapCRS}`] : L.CRS.EPSG3857;
  }

  const mapProps = {
    domId,
    mapOptions: {
      center: center && isArray(center) ? [...center].reverse() : [],
      zoom: zoom,
      crs: thisCRS,
      _leaflet_id: domId ?? 'formMap',
      attributionControl: false,
    },
    showScale: true,
  };

  const tileLayerProps = {
    tileUrlTemplate: mapTileTemplate,
    tileLayerOptions: {
      ...(isObject(mapTileOptions)
        ? mapTileOptions
        : {
            maxZoom: zooms[1],
            minZoom: zooms[0],
            mapTileHost: mapTileHost,
          }),
    },
  };

  return {
    mapProps,
    tileLayerProps,
  };
}
