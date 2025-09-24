/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState, useEffect, useRef } from 'react';
import L, { Circle, Rectangle, Polyline, Polygon } from 'leaflet';
import { DrawProps, DrawVectorData } from './interface';
import Icon from '@/packages/designable-formily-antd/components/Icon';
import './index.css'

type DrawVectorType = Circle | Rectangle | Polyline | Polygon;
interface DrawData extends Omit<DrawVectorData, 'geoJson'> {
  circle?: Circle | null;
  rectangle?: Rectangle | null;
  polyline?: Polyline | null;
  polygon?: Polygon | null;
}

function Draw(props: DrawProps) {
  const {
    __map__: map,
    type = 'default', // default、circle、rectangle、polyline、polygon、clear
    confirmType = '1', // 1：下一点由processEventName事件确定；2：下一个点由startEventName事件确定
    startEventName = 'mousedown', // 开始事件
    processEventName = 'mousemove', // 中间事件
    endEventName = 'mouseup', // 结束事件
    vectorStyle = {
      // 图形属性，leaflet支持的
      color: '#16ad39',
      fillColor: '#99ddb4',
      fillOpacity: 0.7,
    },
    saveVectorType = '1', // 1：只保留上一次绘制的图形；2: 保留所有绘制的图形；3、不保留绘制的图形
    saveTime = 1000, // saveVectorTyp为3，不保留绘制的图形时有效，图形删除延迟
    onChange = () => {}, // 绘制完图形回调事件
  } = props;

  // 绘图工具配置
  const drawTools = [
    {
      icon: 'zhuashou',
      type: 'default'
    },
    {
      icon: 'quanxuan',
      type: 'circle'
    },
    {
      icon: 'kuangxuan',
      type: 'rectangle'
    },
    {
      icon: 'zidingyi',
      type: 'polygon'
    },
    {
      icon: 'shanchu',
      type: 'clear'
    }
  ];

  const drawing = useRef(false); // 是否绘制中
  const [drawData, setDrawData] = useState<DrawData | null>(null); // 绘制图形数据
  const drawDataRef = useRef(drawData);
  drawDataRef.current = drawData;
  const [vector, setVector] = useState<DrawVectorType | null>(null); // 绘制图形实例
  const [vectorArray, setVectorArray] = useState<DrawVectorType[]>([]); // 绘制图形数组
  const intervalTimeRef = useRef();
  const [currentDrawType, setCurrentDrawType] = useState<string>(type);

  // 声明并绑定事件
  useEffect(() => {
    function onEventStart(e: any) {
      onDrawStart(e);
    }
    function onEventProcess(e: any) {
      onDrawProcess(e);
    }
    function onEventEnd() {
      onDrawEnd();
    }
    map?.on(startEventName, onEventStart);
    map?.on(processEventName, onEventProcess);
    map?.on(endEventName, onEventEnd);

    return () => {
      handleClearDrawData();
      map?.off(startEventName, onEventStart);
      map?.off(processEventName, onEventProcess);
      map?.off(endEventName, onEventEnd);
    };
  }, [map]);

  // 监听绘制类型
  useEffect(() => {
    handleDrawType();
  }, [type]);

  const handleDrawType = (selectedType?: string) => {
    // 如果传入了类型参数，则更新当前类型状态
    const targetType = selectedType || type;
    if (selectedType) {
      setCurrentDrawType(targetType);
    }
    
    setDrawData(null);
    drawing.current = false;
    handleClearDrawData(true);
    if (targetType === 'default') {
      map?.dragging.enable();
      map?.doubleClickZoom.enable();
    } else if (targetType === 'circle') {
      handleDrawCircle();
    } else if (targetType === 'rectangle') {
      handleDrawRectangle();
    } else if (targetType === 'polyline') {
      handleDrawPolyline();
    } else if (targetType === 'polygon') {
      handleDrawPolygon();
    } else if (targetType === 'clear') {
      handleClear();
    }
  };

  // 清除处理，清除绘制图形数据，移除绘制图形实例，清空绘制图形数组
  const handleClear = () => {
    handleClearDrawData(true);
    drawing.current = false;
    if (vector) {
      vector.remove();
    }
    vectorArray.forEach((elem) => elem.remove());
    setVector(null);
    setVectorArray([]);
    onChange(type);
    map?.dragging.enable();
    map?.doubleClickZoom.enable();
  };

  const handleClearDrawData = (reset = false) => {
    const { circle, rectangle, polyline, polygon } = drawData || {};

    if (circle) {
      circle.remove();
    }
    if (rectangle) {
      rectangle.remove();
    }
    if (polyline) {
      polyline.remove();
    }
    if (polygon) {
      polygon.remove();
    }
    if (reset) {
      setDrawData(null);
    }
  };

  // 绘制圆形
  const handleDrawCircle = () => {
    setDrawData({
      type: 'circle',
      center: null,
      radius: 0,
      circle: null,
    });
    handleDrawCommon();
  };

  // 绘制矩形
  const handleDrawRectangle = () => {
    setDrawData({
      type: 'rectangle',
      latLngs: [],
      rectangle: null,
    });
    handleDrawCommon();
  };

  // 绘制折线
  const handleDrawPolyline = () => {
    setDrawData({
      type: 'polyline',
      latLngs: [],
      polyline: null,
    });
    handleDrawCommon();
  };

  // 绘制多边形
  const handleDrawPolygon = () => {
    setDrawData({
      type: 'polygon',
      latLngs: [],
      polyline: null,
      polygon: null,
    });
    handleDrawCommon();
  };

  const handleDrawCommon = () => {
    saveVectorType !== '2' && vector && vector.remove();
    setVector(null);
    if (startEventName === 'mousedown' && endEventName === 'mouseup')
      map?.dragging.disable();
    map?.doubleClickZoom.disable();
  };

  const onDrawStart = (e: any) => {
    if (!drawDataRef.current) return;
    drawing.current = true;
    const data = drawDataRef.current;
    const { type, center, latLngs, polyline } = data || {};
    if (type === 'circle') {
      !center &&
        setDrawData({
          ...data,
          center: e.latlng,
        });
    } else if (type === 'rectangle') {
      !latLngs?.length &&
        setDrawData({
          ...data,
          latLngs: [e.latlng],
        });
    } else if (type === 'polyline' || type === 'polygon') {
      if (!latLngs?.length) {
        setDrawData({
          ...data,
          latLngs: [...(latLngs || []), [e.latlng.lat, e.latlng.lng] as any],
        });
      } else {
        const latLng = [e.latlng.lat, e.latlng.lng];
        const _latLngs =
          latLngs[latLngs.length - 1].toString() === latLng.toString()
            ? [...latLngs]
            : [...latLngs, [e.latlng.lat, e.latlng.lng]];
        const _polyline = polyline
          ? polyline.setLatLngs(_latLngs as any)
          : L.polyline(_latLngs as any, vectorStyle).addTo(map!);
        setDrawData({
          ...data,
          latLngs: _latLngs as any,
          polyline: _polyline,
        });
      }
    }
  };

  const onDrawProcess = (e: any) => {
    if (intervalTimeRef.current && Date.now() - intervalTimeRef.current < 16)
      return;
    if (!drawing.current) return;
    const data = drawDataRef.current;
    const { type, center, circle, latLngs, rectangle, polyline } = data || {};
    if (type === 'circle') {
      const _radius = (center && L.latLng(e.latlng).distanceTo(center)) || 0;
      const _circle = circle
        ? circle
            .setLatLng(center as any)
            .setRadius(_radius)
            .addTo(map!)
        : L.circle(center as L.LatLng, {
            radius: _radius,
            ...vectorStyle,
          });
      setDrawData({
        ...data,
        type: type!,
        circle: _circle,
        radius: _radius,
      });
    } else if (type === 'rectangle') {
      const _latLngs = [latLngs![0], e.latlng];
      const bounds = L.latLngBounds(latLngs![0], e.latlng);
      const _rectangle = rectangle
        ? rectangle.setBounds(bounds).addTo(map!)
        : L.rectangle(_latLngs, vectorStyle);
      setDrawData({
        ...data,
        type: type!,
        latLngs: _latLngs,
        rectangle: _rectangle,
      });
    } else if (type === 'polyline' || type === 'polygon') {
      const _latLngs = [...(latLngs || []), [e.latlng.lat, e.latlng.lng]];
      const _polyline = polyline
        ? polyline.setLatLngs(_latLngs as any).addTo(map!)
        : L.polyline(_latLngs as any, vectorStyle);
      setDrawData({
        ...data,
        type: type!,
        latLngs: confirmType === '1' ? (_latLngs as any) : (latLngs as any),
        polyline: _polyline,
      });
    }
  };

  const onDrawEnd = () => {
    if (!drawing.current) return;
    const data = drawDataRef.current;
    const { type, center, radius, circle, latLngs, rectangle, polyline } =
      data || {};
    let callbackData: DrawVectorData = {};
    if (type === 'circle') {
      // 避免切换 default 类型时 handleClearDrawData 函数将其清除
      if (circle) {
        circle.remove();
      }
      // 添加类型保护，确保radius是有效的数值
      const validRadius = radius !== undefined ? radius : 0;
      setVector(
        L.circle(center as L.LatLng, {
          radius: validRadius,
          ...vectorStyle,
        }).addTo(map!),
      );
      callbackData = {
        type,
        center,
        radius,
        geoJson: circle ? circle.toGeoJSON() : undefined,
      };
    } else if (type === 'rectangle') {
      const bounds = rectangle!.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();
      if (rectangle) {
        rectangle.remove();
      }
      setVector(L.rectangle(latLngs as any, vectorStyle).addTo(map!));
      callbackData = {
        type,
        northEast,
        southWest,
        geoJson: rectangle ? rectangle.toGeoJSON() : undefined,
      };
    } else if (type === 'polyline') {
      if (polyline) {
        polyline.remove();
      }
      setVector(L.polyline(latLngs as any, vectorStyle).addTo(map!));
      callbackData = {
        type,
        latLngs,
        geoJson: polyline ? polyline.toGeoJSON() : undefined,
      };
    } else if (type === 'polygon') {
      if (polyline) {
        polyline.remove();
      }
      const _polygon = L.polygon(latLngs as any, vectorStyle);
      setDrawData({
        ...data,
        type: type!,
        latLngs,
        polygon: _polygon,
      });
      setVector(L.polygon(latLngs as any, vectorStyle).addTo(map!));
      callbackData = {
        type,
        latLngs,
        geoJson: _polygon ? _polygon.toGeoJSON() : undefined,
      };
    }
    map?.dragging.enable();
    map?.doubleClickZoom.enable();
    drawing.current = false;
    onChange(type!, callbackData);
  };

  useEffect(() => {
    if (vector) {
      if (saveVectorType === '2') {
        setVectorArray([...vectorArray, vector]);
      } else if (saveVectorType === '3') {
        setTimeout(() => {
          vector.remove();
        }, saveTime);
        setVector(null);
      }
      setDrawData(null);
    }
  }, [vector]);

  return (
    <div className="outer-draw-tools">
      {drawTools.map((elem) => (
        <span
          key={elem.type}
          className={currentDrawType === elem.type ? 'active' : ''}
          onClick={() => handleDrawType(elem.type)}
        >
          <Icon type={elem.icon} />
        </span>
      ))}
    </div>
  );
}

export default Draw;

export type { DrawProps, DrawVectorData, DrawData, DrawVectorType };
