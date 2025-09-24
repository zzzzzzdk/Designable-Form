import { Control } from 'leaflet'

export const defaultZoomOptions: Control.ZoomOptions = {
  position: 'topright'                // 默认位置左上角
}

export const defaultScaleOptions: Control.ScaleOptions = {
  position: 'bottomright',            // 默认位置右下角
  imperial: false                     // 默认不显示英制刻度
}
