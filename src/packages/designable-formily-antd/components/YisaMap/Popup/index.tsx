/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { PopupProps } from './interface'
import './index.css'

function Popup(props: PopupProps) {
  const {
    __map__: map,                         // 地图实例对象
    className = '',                       // 类名
    visible = false,                      // 弹窗是否可见
    closeOnClick = true,
    onClose,                              // 弹窗隐藏回调
    lat,                                  // 纬度
    lng,                                  // 经度
    xOffset = 0,                          // 横向偏移量
    yOffset = 0,                          // 竖向偏移量
    width = 100,                          // 宽度
    keepInView = true,                    // 防止 popup 打开后，在屏幕范围之外
    autoPanPadding = L.point(5, 5),       // 自动平移与地图左上角、右下角的边距
    autoPanPaddingTopLeft,                // 自动平移与地图左上角的边距
    autoPanPaddingBottomRight,            // 自动平移与地图右下角的边距
    children
  } = props

  const popupRef = useRef<HTMLDivElement>()
  // 弹窗样式
  const [popupStyle, setPopupStyle] = useState({
    top: 0,
    left: 0
  })

  const onMapZoom = useCallback(() => {
    handleChangeStyle()
  }, [lat, lng])

  const onMapClick = useCallback(() => {
    closeOnClick && onClose && onClose()
  }, [onClose, closeOnClick])

  // 绑定事件
  useEffect(() => {
    if (visible) {
      handleChangeStyle(true)
      map?.on('zoomanim', onMapZoom)
      map?.on('move', onMapZoom)
      map?.on('click', onMapClick)

      return () => {
        map?.off('zoomanim', onMapZoom)
        map?.off('move', onMapZoom)
        map?.off('click', onMapClick)
      }
    }
  }, [visible, onMapZoom, onMapClick])

  // 修改样式定位等
  const handleChangeStyle = (adjustPan = false) => {
    if (!(parseFloat(`${lat}`) && parseFloat(`${lng}`))) {
      console.warn('<Popup /> lat/lng must be able to parseFloat')
      return
    }
    const point = map?.latLngToContainerPoint(L.latLng([parseFloat(`${lat}`), parseFloat(`${lng}`)])) || L.point(0, 0)
    if (adjustPan && keepInView && popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight
      const popupWidth = popupRef.current.offsetWidth
      const popupPos = point.subtract(L.point(xOffset || 0, yOffset || 0)).subtract(L.point(popupWidth / 2, popupHeight + 8))
      const padding = L.point(autoPanPadding)
      const paddingTL = L.point(autoPanPaddingTopLeft || padding)
      const paddingBR = L.point(autoPanPaddingBottomRight || padding)
      const size = map?.getSize() || L.point(0, 0)
      let dx = 0
      let dy = 0
      if (popupPos.x + popupWidth + paddingBR.x > size.x) { // right
        dx = popupPos.x + popupWidth - size.x + paddingBR.x
      }
      if (popupPos.x - dx - paddingTL.x < 0) { // left
        dx = popupPos.x - paddingTL.x
      }
      if (popupPos.y + popupHeight + paddingBR.y > size.y) {
        dy = popupPos.y + popupHeight - size.y + paddingBR.y
      }
      if (popupPos.y - dy - paddingTL.y < 0) {
        dy = popupPos.y - paddingTL.y
      }
      if (dx || dy) {
        map?.panBy([dx, dy], { animate: true })
      }
    }
    setPopupStyle({
      top: point.y - (yOffset || 0),
      left: point.x - (xOffset || 0)
    })
  }

  return (
    <>
      {
        visible && <div ref={popupRef as any} className={className ? `ysc-map-popup ${className}` : 'ysc-map-popup'} style={{ width: `${width}px`, ...popupStyle }}>
          <div className='ysc-map-popup-inner'>
            {children}
          </div>
          <div className='ysc-map-popup-arrow' />
        </div>
      }
    </>
  )
}

export default Popup

export type {
  PopupProps
}
