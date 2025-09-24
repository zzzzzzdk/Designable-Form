/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useMemo, useState } from 'react';
import { defaultZoomOptions, defaultScaleOptions } from './map.config';
import L, { Map } from 'leaflet';
import { isFunction } from '@/utils';
import { MapProps, Lat, Lng, Event } from './interface';
import './index.css'

function BaseMap(props: MapProps) {
  const {
    domId = 'map', // dom节点id
    mapOptions = {}, // 地图属性，leaflet支持的
    showZoom = false, // 是否展示缩放控件
    zoomOptions = defaultZoomOptions, // 缩放控件属性，leaflet支持的
    showScale = false, // 是否展示比例尺
    scaleOptions = defaultScaleOptions, // 比例尺属性，leaflet支持的
    backgroundImg, // 背景图片
    ...otherProps
  } = props;

  // 地图实例对象
  const [map, setMap] = useState<Map | null>(null);

  // 初始化创建地图
  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {
    // 添加检查，防止重复初始化
    if (map) return;
    
    const _map = L.map(domId, {
      attributionControl: false,
      zoomControl: false,
      ...mapOptions,
    });
    showZoom && L.control.zoom(zoomOptions).addTo(_map);
    showScale && L.control.scale(scaleOptions).addTo(_map);
    setMap(_map);
  };

  useEffect(() => {
    return () => {
      map && map.remove();
    };
  }, [map]);

  useEffect(() => {
    if (map) {
      handleOtherProps('1');

      return () => {
        handleOtherProps('2');
      };
    }
  }, [map, otherProps]);

  // 绑定事件
  const handleOtherProps = (type: string) => {
    const reg = /^on/;
    const propsNames = Object.keys(otherProps);
    for (let i = 0; i < propsNames.length; i++) {
      const key = propsNames[i];
      if (!reg.test(key)) continue;
      const propsName = key.replace(reg, '').toLowerCase();
      if (isFunction(otherProps[key as any])) {
        handleEventListener(type, propsName, otherProps[key as any]);
      } else {
        console.warn(`<BaseMap /> ${key} must be a function`);
      }
    }
  };

  const handleEventListener = (
    type: string,
    methodText: string,
    methodCallback: (e: Event) => void,
  ) => {
    if (!map) return;
    if (type === '1') {
      map.on(methodText, methodCallback);
    } else {
      map.off(methodText, methodCallback);
    }
  };

  const renderChildren = () => {
    return React.Children.map(props.children, (child) => {
      if (child) {
        const cType = child.type;
        if (typeof cType === 'string') {
          return child;
        }
        return React.cloneElement(child, {
          __map__: map,
        });
      }
      return child;
    });
  };

  const style = useMemo(() => {
    if (backgroundImg) {
      return {
        background: `url(${backgroundImg})`,
      };
    }
    return {};
  }, [backgroundImg]);

  return (
    <div className="ysc-map-container">
      <div id={domId} className="ysc-map" style={style} />
      <div className="ysc-map-component">{map && renderChildren()}</div>
    </div>
  );
}

export default BaseMap;

export type { MapProps, Lat, Lng, Event };
