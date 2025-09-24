import * as L from 'leaflet'

/**
 * CanvasMarkersLayer 选项接口
 */
export interface CanvasMarkersLayerOptions extends L.LayerOptions {
  /**
   * 画布的 z-index 值，默认为 100
   */
  zIndex?: number
  
  /**
   * 选中的标记点 ID 数组
   */
  checkedIds?: string[]
  
  /**
   * 自定义面板名称
   */
  pane?: string
}

/**
 * 标记点数据结构
 */
export interface MarkerData {
  id: string
  lat: string
  lng: string
  text?: string
  [key: string]: any
}

/**
 * CanvasMarkersLayer 接口定义
 */
export interface ICanvasMarkersLayer extends L.Layer {
  /**
   * 初始化图层
   */
  initialize(options: CanvasMarkersLayerOptions): void
  
  /**
   * 将图层添加到地图
   */
  addTo(map: L.Map): this
  
  /**
   * 图层添加到地图时触发
   */
  onAdd(map: L.Map): void
  
  /**
   * 初始化画布
   */
  _initCanvas(): void
  
  /**
   * 图层从地图移除时触发
   */
  onRemove(map: L.Map): void
  
  /**
   * 设置图层选项
   */
  setOptions(options: CanvasMarkersLayerOptions): this
  
  /**
   * 重绘画布
   */
  redraw(): void
  
  /**
   * 批量添加标记点
   */
  addMarkers(markers: L.Marker[]): void
  
  /**
   * 添加单个标记点
   */
  addMarker(marker: L.Marker): void
  
  /**
   * 内部方法：添加标记点
   */
  _addMarker(marker: L.Marker, latLng: L.LatLng, isShow: boolean): [any, any]
  
  /**
   * 绘制标记点
   */
  _drawMarker(marker: L.Marker, pointPos: L.Point): void
  
  /**
   * 绘制图像标记点
   */
  _drawImage(marker: L.Marker, pointsPos: L.Point): void
  
  /**
   * 添加多个图层
   */
  addLayers(layers: L.Marker[]): void
  
  /**
   * 添加单个图层
   */
  addLayer(layer: L.Marker): void
  
  /**
   * 清除所有图层
   */
  clearLayers(): void
  
  /**
   * 移除标记点
   */
  removeMarker(marker: L.Marker | any, redraw?: boolean): void
  
  /**
   * 移除图层
   */
  removeLayer(layer: L.Marker): void
  
  /**
   * 重置图层
   */
  _reset(): void
  
  /**
   * 执行事件监听器
   */
  _executeListeners(event: any): void
  
  /**
   * 处理缩放动画
   */
  _animateZoom(event: any): void
  
  /**
   * 内部重绘方法
   */
  _redraw(clear: boolean): void
  
  /**
   * 添加点击事件监听器
   */
  addOnClickListener(listener: (event: any, markers: any[]) => void): void
  
  /**
   * 添加悬停事件监听器
   */
  addOnHoverListener(listener: (event: any, markers: any[]) => void): void
  
  /**
   * 移除点击事件监听器
   */
  removeOnClickListener(listener: (event: any, markers: any[]) => void): void
  
  /**
   * 移除悬停事件监听器
   */
  removeOnHoverListener(listener: (event: any, markers: any[]) => void): void
  
  /**
   * 获取图标选项
   */
  _getIconOptions(marker: L.Marker): { iconSize: number[]; iconAnchor: number[] }
}

/**
 * CanvasMarkersLayer 类定义
 */
export class CanvasMarkersLayer implements ICanvasMarkersLayer {
  constructor(options?: CanvasMarkersLayerOptions)
  
  // 从接口继承的方法
  initialize(options: CanvasMarkersLayerOptions): void
  addTo(map: L.Map): this
  onAdd(map: L.Map): void
  _initCanvas(): void
  onRemove(map: L.Map): void
  setOptions(options: CanvasMarkersLayerOptions): this
  redraw(): void
  addMarkers(markers: L.Marker[]): void
  addMarker(marker: L.Marker): void
  _addMarker(marker: L.Marker, latLng: L.LatLng, isShow: boolean): [any, any]
  _drawMarker(marker: L.Marker, pointPos: L.Point): void
  _drawImage(marker: L.Marker, pointsPos: L.Point): void
  addLayers(layers: L.Marker[]): void
  addLayer(layer: L.Marker): void
  clearLayers(): void
  removeMarker(marker: L.Marker | any, redraw?: boolean): void
  removeLayer(layer: L.Marker): void
  _reset(): void
  _executeListeners(event: any): void
  _animateZoom(event: any): void
  _redraw(clear: boolean): void
  addOnClickListener(listener: (event: any, markers: any[]) => void): void
  addOnHoverListener(listener: (event: any, markers: any[]) => void): void
  removeOnClickListener(listener: (event: any, markers: any[]) => void): void
  removeOnHoverListener(listener: (event: any, markers: any[]) => void): void
  _getIconOptions(marker: L.Marker): { iconSize: number[]; iconAnchor: number[] }
}

/**
 * 创建 CanvasMarkersLayer 实例的工厂函数
 */
export function canvasMarkersLayer(options?: CanvasMarkersLayerOptions): CanvasMarkersLayer

export default canvasMarkersLayer

// 扩展 Leaflet 命名空间，添加 canvasMarkersLayer 方法和自定义Marker属性
declare module 'leaflet' {
  namespace L {
    function canvasMarkersLayer(options?: CanvasMarkersLayerOptions): CanvasMarkersLayer
  }
  
  // 扩展Marker类型以支持自定义属性
  interface Marker<P = any> {
    /**
     * 自定义数据属性
     */
    data?: any
    
    /**
     * 经纬度属性
     */
    latlng?: [string, string]
  }
}