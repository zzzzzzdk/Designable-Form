/* eslint-disable no-loss-of-precision */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Checkbox } from 'antd';
import 'leaflet/dist/leaflet.css';
import L, { tileLayer } from 'leaflet';
import './YisaMap.css';
import getMapProps from './utils/getMapProps';
import classNames from 'classnames';
// 导入图片
import img1 from './img/1.png';
import img1h from './img/1h.png';
import MassMarker from './MassMarker';
import BaseMap from './BaseMap';
import DrawComponent from './Draw';
import TileLayer from './TileLayer';
import Popup from './Popup';
import { isFunction, isUndefined, isArray } from '@/utils';
import { urlToBase64 } from '@/utils/imageUtils';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { Type } from './Draw/interface';

// 模拟的点位数据
const mockLocationData = {
  data: [
    {
      id: '1',
      lat: '35.965781',
      lng: '120.205252',
      text: '位置1',
      scale: false,
    },
    {
      id: '2',
      lat: '35.975781',
      lng: '120.215252',
      text: '位置2',
      scale: false,
    },
    {
      id: '3',
      lat: '35.985781',
      lng: '120.225252',
      text: '位置3',
      scale: false,
    },
    {
      id: '4',
      lat: '35.995781',
      lng: '120.235252',
      text: '位置4',
      scale: false,
    },
  ],
};

// 简单的contains函数实现，判断点是否在绘制区域内
const contains = (vectorData: any, lat: string, lng: string): boolean => {
  try {
    const point = L.latLng(parseFloat(lat), parseFloat(lng));

    if (vectorData.type === 'rectangle') {
      const bounds = L.latLngBounds(vectorData.northEast, vectorData.southWest);
      return bounds.contains(point);
    } else if (vectorData.type === 'circle') {
      const distance = L.latLng(vectorData.center).distanceTo(point);
      return distance <= vectorData.radius;
    } else if (
      vectorData.type === 'polygon' ||
      vectorData.type === 'polyline'
    ) {
      // 简单的多边形包含判断
      // 实际项目中可能需要更复杂的算法
      const polygon = L.polygon(vectorData.latLngs);
      return polygon.getBounds().contains(point);
    }
    return false;
  } catch (error) {
    console.error('contains error:', error);
    return false;
  }
};

export interface MapProps {
  domId: string;
  center?: number[] | string[] | L.LatLngExpression;
  zoom?: number;
  zooms?: number[];
  mapTileTemplate?: string;
  mapTileOptions?: Record<string, unknown>;
  mapTileHost?: string;
  mapCRS?: string;
  mapTileType?: string;
}

export interface YisaMapProps extends MapProps {
  showScale?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
  height?: string;
  width?: string;
  onSelectPoints?: (points: any[]) => void;
  className?: string;
  // 点位数据接口配置
  locationDataApi?: string;
  requestHeaders?: string;
  requestTimeout?: number;
  requestRetryCount?: number;
  requestRetryDelay?: number;
  locationDataTransformer?: string;
  // 控制组件状态
  disabled?: boolean;
  readOnly?: boolean;
}

export function formatValue(value: any) {
  const val =
    value !== null && !isUndefined(value) && isArray(value) ? value : [];
  return val;
}
const YisaMap: React.FC<YisaMapProps> = (props) => {
  const {
    showScale = false,
    value = [],
    onChange,
    height = '400px',
    width = '400px',
    className,
    domId = `map-${Math.random().toString(36).substring(2, 15)}`,
    // 点位数据接口配置
    locationDataApi = 'http://localhost:3002/api/pdm/v1/common/location',
    requestHeaders,
    requestTimeout = 30000,
    requestRetryCount = 0,
    requestRetryDelay = 1000,
    locationDataTransformer,
    // 控制组件状态
    disabled = false,
    readOnly = false,
    ...otherMapProps
  } = props;
  // console.log('props:', props);
  const [markerData, setMarkerData] = useState<any[]>([]);
  const markerDataRef = useRef<any[]>(markerData);
  markerDataRef.current = markerData;
  const [checkedLocationIds, setCheckedLocationIds] = useMergedState<string[]>(
    [],
    {
      value: 'locationIds' in props ? formatValue(props.value) : undefined,
    },
  );
  const checkedLocationIdsSet = new Set(checkedLocationIds);
  const [clickData, setClickData] = useState<any>([]);
  const [drawType, setDrawType] = useState<Type>('default');
  const [popupVisible, setPopupVisible] = useState(false);
  // 加载和错误状态
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [icons, setIcons] = useState<string[]>([]);
  // 默认请求头
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(requestHeaders ? JSON.parse(requestHeaders) : {}),
  };

  // 默认数据转换函数
  const defaultLocationDataTransformer = (data: any): any[] => {
    if (!data || typeof data !== 'object') return [];
    // 如果返回的数据是 { data: [...] } 格式，则返回 data 字段
    if (Array.isArray(data.data)) return data.data;
    // 如果返回的数据本身就是数组，则直接返回
    if (Array.isArray(data)) return data;
    return [];
  };

  // 解析并使用提供的转换函数或默认函数
  const resolvedLocationDataTransformer = (() => {
    if (locationDataTransformer) {
      try {
        // 使用 Function 构造器来创建转换函数
        // 注意：在实际生产环境中，应该使用更安全的方式来处理用户输入的代码
        return new Function('data', locationDataTransformer);
      } catch (err) {
        console.error('解析点位数据转换函数失败:', err);
        return defaultLocationDataTransformer;
      }
    }
    return defaultLocationDataTransformer;
  })();

  // 带重试机制的请求函数
  const fetchWithRetry = async (
    url: string,
    options: RequestInit = {},
    retryCount = requestRetryCount,
    currentAttempt = 0,
  ): Promise<any> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), requestTimeout);

      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      if (currentAttempt < retryCount) {
        const delay = requestRetryDelay;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retryCount, currentAttempt + 1);
      }
      throw err;
    }
  };

  // 获取点位数据
  const fetchLocationData = async () => {
    // 如果没有配置接口地址，则使用模拟数据
    if (!locationDataApi) {
      const processedData = handleLocationData(mockLocationData.data);
      setMarkerData(processedData);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWithRetry(locationDataApi);
      const transformedData = resolvedLocationDataTransformer(data);
      const processedData = handleLocationData(transformedData);
      setMarkerData(processedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取点位数据失败');
      console.error('获取点位数据失败:', err);
      // 出错时使用模拟数据
      const processedData = handleLocationData(mockLocationData.data);
      setMarkerData(processedData);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理点位数据
  const handleLocationData = (data: any[], parent?: any): any[] => {
    let _locationData: any[] = [];
    data.forEach((elem) => {
      const { scale, children } = elem;
      if (scale && Array.isArray(children)) {
        _locationData = [
          ..._locationData,
          ...handleLocationData(children, elem),
        ];
      }
      if (!scale) {
        _locationData.push({
          ...elem,
          parent,
        });
      }
    });
    return _locationData;
  };

  // 处理绘制变化
  const handleDrawChange = (type: string, callbackData?: any) => {
    // 在disabled或readOnly状态下不执行任何操作
    if (disabled || readOnly) {
      return;
    }

    console.log('handleDrawChange', type, callbackData);

    if (type !== 'clear' && callbackData) {
      // 过滤在绘制区域内的点
      const filteredPoints = markerDataRef.current.filter((point) =>
        contains(callbackData, point.lat, point.lng),
      );
      setCheckedLocationIds(filteredPoints.map((item) => item.id));
    } else {
      // 清除选择
      setCheckedLocationIds([]);
    }
    // setDrawType('default')
  };

  // 处理鼠标按下事件
  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleChangeLocationItem = (id: string, isChecked: boolean) => {
    // 在disabled或readOnly状态下不执行任何操作
    if (disabled || readOnly) {
      return;
    }

    let _value = checkedLocationIds;
    if (isChecked) {
      _value = checkedLocationIds.filter((elem) => elem !== id);
    } else {
      _value = [..._value, id];
    }
    if (!('locationIds' in props)) {
      setCheckedLocationIds(_value);
    }

    if (onChange && isFunction(onChange)) {
      onChange(_value);
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  const handleRenderMarkersPopup = () => {
    const { lat = '', lng = '' } = clickData.length > 1 ? clickData[0] : {};
    return (
      <Popup
        visible={popupVisible}
        lat={lat}
        lng={lng}
        width={300}
        xOffset={0}
        yOffset={10}
        onClose={handleClosePopup}
      >
        <div className="location-list">
          {clickData.map((elem: any) => {
            const { id, text } = elem || {};
            const isChecked = checkedLocationIdsSet.has(id);
            return (
              <div
                key={id}
                className="location-item"
                onMouseDown={() =>
                  !disabled &&
                  !readOnly &&
                  handleChangeLocationItem(id, isChecked)
                }
              >
                <Checkbox checked={isChecked} disabled={disabled || readOnly}>
                  {text}
                </Checkbox>
              </div>
            );
          })}
        </div>
      </Popup>
    );
  };

  useEffect(() => {
    setPopupVisible(false);
    if (!disabled && !readOnly && clickData.length === 1) {
      const { id } = clickData[0] || {};
      let _value = checkedLocationIds;
      if (checkedLocationIdsSet.has(id)) {
        _value = checkedLocationIds.filter((elem) => elem !== id);
      } else {
        _value = [..._value, id];
      }
      if (!('locationIds' in props)) {
        setCheckedLocationIds(_value);
      }
      if (onChange && isFunction(onChange)) {
        onChange(_value);
      }
    } else if (clickData.length > 1) {
      setPopupVisible(true);
    }
  }, [clickData, disabled, readOnly]);

  // 初始化和数据获取
  useEffect(() => {
    // const convertImagesToBase64 = async () => {
    //   try {
    //     const base64Img1 = await urlToBase64(img1);
    //     const base64Img1h = await urlToBase64(img1h);
    //     console.log('图片base64格式:', base64Img1, base64Img1h);
    //     setIcons([base64Img1, base64Img1h]);
    //   } catch (error) {
    //     console.error('转换图片为base64失败:', error);
    //   }
    // };

    // convertImagesToBase64();

    // 获取点位数据
    fetchLocationData();
  }, []);

  const { mapProps, tileLayerProps } = useMemo(() => {
    // 生成固定的domId，避免每次渲染都生成新的ID
    const fixedDomId = `map-${props.domId || Math.random().toString(36).substring(2, 15)}`;

    const { mapProps, tileLayerProps } = getMapProps({
      ...props,
      domId: fixedDomId,
    });

    return {
      mapProps,
      tileLayerProps,
    };
  }, [props]);

  const massData = useMemo(() => {
    return markerData.map((item) => ({
      ...item,
      lat: parseFloat(String(item.lat)),
      lng: parseFloat(String(item.lng)),
      text: item.text,
      icon: checkedLocationIds.includes(item.id) ? img1h : img1,
    }));
  }, [markerData, checkedLocationIds]);

  const massMarkerProps = useMemo(() => {
    // console.log('checkedLocationIds', checkedLocationIds);
    return {
      data: massData,
      zIndex: 102,
      checkedIds: checkedLocationIds,
      onChangeClickData: (event: any, data: any) => {
        if (!disabled) {
          setClickData(data);
        }
      },
    };
  }, [massData, checkedLocationIds, disabled]);

  return (
    <div
      style={{ width, height }}
      className={classNames('map-container-wrapper', className)}
    >
      <BaseMap {...mapProps}>
        <TileLayer {...tileLayerProps} />
        <MassMarker {...massMarkerProps} />
        {!disabled && !readOnly ? (
          <DrawComponent type={drawType} onChange={handleDrawChange} />
        ) : ''}
        {handleRenderMarkersPopup()}
      </BaseMap>
      {isLoading ? <div className="map-loading">加载中...</div> : null}
      {error && <div className="map-error">错误: {error}</div>}
      {/* <div
        id={domId}
        ref={mapContainerRef}
        className="map-container"
        onMouseDown={handleMouseDown}
      /> */}
    </div>
  );
};

export default YisaMap;
