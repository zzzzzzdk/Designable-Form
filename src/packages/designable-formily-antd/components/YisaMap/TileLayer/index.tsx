/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react'
import L, { TileLayer as LeafletTileLayer } from 'leaflet'
import {isObject} from '@/utils'
import { TileLayerProps } from './interface'

function TileLayer(props: TileLayerProps) {
  const {
    __map__: map,
    tileUrlTemplate = '',
    tileLayerOptions = {},
    matrixR,
    matrixG,
    matrixB
  } = props
  const hasMatrix = typeof matrixR === 'number' && typeof matrixG === 'number' && typeof matrixB === 'number'
  const classNames = [hasMatrix && 'ysc-leaflet-tile-matrix', tileLayerOptions?.className].filter(Boolean).join(' ')
  const [tileLayer, setTileLayer] = useState<LeafletTileLayer | null>(null)

  useEffect(() => {

    return () => {
      tileLayer && tileLayer.remove()
    }
  }, [tileLayer])

  const handleJudge = () => {
    if (!tileUrlTemplate) {
      console.warn('<TileLayer /> tileUrlTemplate is empty')
      return false
    } else if (!isObject(tileLayerOptions)) {
      console.warn('<TileLayer /> tileLayerOptions must be a object')
      return false
    }
    return true
  }

  useEffect(() => {
    if (handleJudge()) {
      initTileLayer()
    }
  }, [tileUrlTemplate])

  const initTileLayer = () => {
    const _tileLayer = L.tileLayer(tileUrlTemplate, {
      ...tileLayerOptions,
      className: classNames
    }).addTo(map!)
    setTileLayer(_tileLayer)
  }

  if (hasMatrix) {
    return <svg className="ysc-leaflet-tile-svg" aria-hidden="true">
      <defs>
        <filter id="yscTileFilter">
          <feColorMatrix
            type="matrix"
            values={`-.3 -.59 -.11 0 ${matrixR} -.3 -.59 -.11 0 ${matrixG} -.3 -.59 -.11 0 ${matrixB} 0 0 0 1 0`}
          />
        </filter>
      </defs>
    </svg>
  }

  return null
}

export default TileLayer

export type {
  TileLayerProps
}
