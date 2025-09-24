import rbush from 'rbush'
import L from "leaflet"

const CanvasMarkersLayer = (L.Layer || L.Class).extend({

    // add event listeners to initialized setction
    initialize: function (options) {
        L.setOptions(this, options)
        this._onClickListeners = []
        this._onHoverListeners = []
    },

    addTo: function (map) {
        map.addLayer(this)
        return this
    },

    // listen layer add to map
    onAdd: function (map) {
        this._map = map
        if (!this._canvas) {
            this._initCanvas()
        }
        if (this.options.pane) {
            this.getPane().appendChild(this._canvas)
        } else {
            map._panes.overlayPane.appendChild(this._canvas)
        }

        map.on('move', this._reset, this)
        map.on('resize', this._reset, this)
        map.on('click', this._executeListeners, this)
        map.on('mousemove', this._executeListeners, this)
        map.on('zoomanim', this._animateZoom, this)
    },

    _initCanvas: function () {
        // 如果_canvas已经存在，先清理
        if (this._canvas) {
            this._context = null
        }
        
        this._canvas = L.DomUtil.create('canvas', 'leaflet-canvas-icon-layer leaflet-layer')
        const { x, y } = this._map.getSize()
        this._canvas.width = x
        this._canvas.height = y
        this._canvas.style.zIndex = this.options.zIndex || 100
        this._context = this._canvas.getContext('2d')
        const animated = this._map.options.zoomAnimation && L.Browser.any3d
        L.DomUtil.addClass(this._canvas, 'leaflet-zoom-' + (animated ? 'animated' : 'hide'))
    },

    // listen layer remove from map
    onRemove: function (map) {
        if (this.options.pane) {
            this.getPane().removeChild(this._canvas)
        } else {
            map._panes.overlayPane.removeChild(this._canvas)
        }

        map.off('move', this._reset, this)
        map.off('resize', this._reset, this)
        map.off('click', this._executeListeners, this)
        map.off('mousemove', this._executeListeners, this)
        map.off('zoomanim', this._animateZoom, this)
        
        // 清理_context引用
        this._context = null
        this._canvas = null
    },

    setOptions: function (options) {
        L.setOptions(this, options)
        return this.redraw()
    },

    redraw: function () {
        this._redraw(true)
    },

    // multiple layers at a time for rbush performance
    addMarkers: function (markers) {
        let self = this
        let tmpMarkers = []
        let tmpLatLngs = []
        // 兼容普通对象和L.marker
        const checkedIds = new Set(this.options.checkedIds || []);
        const getId = item => (item.data && item.data.id) || item.id;
        const isLMarker = marker => marker && marker.getLatLng && marker.options && marker.options.icon;
        const unCheckedMarkers = markers.filter(item => !checkedIds.has(getId(item)))
        const checkedMarkers = markers.filter(item => checkedIds.has(getId(item)))
        const allMarkers = unCheckedMarkers.concat(checkedMarkers)
        // console.time('addMarkers')
        allMarkers.forEach(marker => {
            let latLng, iconOptions, markerObj;
            if (isLMarker(marker)) {
                latLng = marker.getLatLng();
                iconOptions = this._getIconOptions(marker);
                markerObj = marker;
            } else {
                latLng = L.latLng(marker.lat, marker.lng);
                iconOptions = {
                    iconSize: marker.iconSize || [18, 18],
                    iconAnchor: marker.iconAnchor || [9, 9]
                };
                // 构造一个伪 marker 对象，兼容后续绘制
                markerObj = {
                    ...marker,
                    getLatLng: () => latLng,
                    options: {
                        icon: {
                            options: {
                                iconUrl: marker.icon,
                                iconSize: iconOptions.iconSize,
                                iconAnchor: iconOptions.iconAnchor
                            }
                        }
                    }
                };
            }
            let isShow = self._map.getBounds().contains(latLng)
            let result = self._addMarker(markerObj, latLng, isShow)
            if (isShow) {
                tmpMarkers.push(result[0])
            }
            tmpLatLngs.push(result[1])
        })
        // console.timeEnd('addMarkers')
        // 200000点位耗时 250ms左右，放大之后不卡
        self._markers.load(tmpMarkers)
        self._latlngMarkers.load(tmpLatLngs)
    },

    // add single layer at a time. Less efficient for rbush
    addMarker: function (marker) {
        if (!(marker.options.pane === 'markerPane' && marker.options.icon)) {
            console.error(`canvasMarkers: Layer is not a marker`)
            return
        }
        let self = this
        let latLng = marker.getLatLng()
        let isShow = self._map.getBounds().contains(latLng)
        let result = self._addMarker(marker, latLng, isShow)
        // only add to point lookup if we area on map
        if (isShow) {
            self._markers.insert(result[0])
        }
        self._latlngMarkers.insert(result[1])
    },

    _addMarker: function (marker, latLng, isShow) {
        let self = this
        // need for popup & tooltip tp work
        marker._map = self._map
        // _markers contains points of markers currently show on map
        if (!self._markers) {
            self._markers = new rbush()
        }
        // _latlngMarkers contians lat/lng coordinates of all markers in layer
        if (!self._latlngMarkers) {
            self._latlngMarkers = new rbush()
            self._latlngMarkers.dirty = 0
            self._latlngMarkers.total = 0
        }
        // 若无唯一id，分配一个
        L.Util.stamp(marker)
        const pointPos = self._map.latLngToContainerPoint(latLng)
        const { iconSize, iconAnchor } = this._getIconOptions(marker)
        const left = iconAnchor ? iconAnchor[0] : 0
        const right = iconSize[0] - (iconAnchor ? iconAnchor[0] : 0)
        const top = iconAnchor ? iconAnchor[1] : 0
        const bottom = iconSize[1] - (iconAnchor ? iconAnchor[1] : 0)
        const ret = [({
            minX: (pointPos.x - left),
            minY: (pointPos.y - top),
            maxX: (pointPos.x + right),
            maxY: (pointPos.y + bottom),
            data: marker
        }), ({
            minX: latLng.lng,
            minY: latLng.lat,
            maxX: latLng.lng,
            maxY: latLng.lat,
            data: marker
        })]
        self._latlngMarkers.dirty++
        self._latlngMarkers.total++
        // only draw if we are in map view
        if (isShow) {
            self._drawMarker(marker, pointPos)
        }
        return ret
    },

    _drawMarker: function (marker, pointPos) {
        var self = this
        if (!self._imageLookup) {
            self._imageLookup = {}  
        }
        
        if (!pointPos) {
            pointPos = self._map.latLngToContainerPoint(marker.getLatLng())
        }
        
        const { iconUrl, render } = marker.options.icon.options
        if (render) {
            try {
                render(marker, pointPos, self._context)
            } catch (e) {
                console.warn('Failed to render marker:', e)
            }
        } else if (iconUrl) {
            // 如果有canvas_img就直接使用
            if ('canvas_img' in marker && marker.canvas_img) {
                self._drawImage(marker, pointPos)
            } else {
                // 判断该图标是否有缓存
                if (self._imageLookup[iconUrl]) {
                    marker.canvas_img = self._imageLookup[iconUrl][0]
                    // 判断图片是否load完成
                    if (!self._imageLookup[iconUrl][1]) {
                        // 未完成将信息存进去，load后绘制
                        self._imageLookup[iconUrl][2].push([marker, pointPos])
                    } else {
                        self._drawImage(marker, pointPos)
                    }
                } else {
                    try {
                        let img = new Image()
                        // 添加错误处理
                        img.onerror = function() {
                            console.warn('Failed to load marker image:', iconUrl)
                            self._imageLookup[iconUrl] = [null, true, []] // 标记为已加载但失败
                        }
                        img.src = iconUrl
                        marker.canvas_img = img
                        self._imageLookup[iconUrl] = [img, false, [[marker, pointPos]]]
                        img.onload = function () {
                            // 检查图片是否真的加载成功
                            if (this.complete && this.naturalWidth > 0) {
                                self._imageLookup[iconUrl][1] = true
                                self._imageLookup[iconUrl][2].forEach(function (e) {
                                    self._drawImage(e[0], e[1])
                                })
                            } else {
                                console.warn('Marker image load completed but is invalid:', iconUrl)
                                self._imageLookup[iconUrl][1] = true
                            }
                        }
                    } catch (e) {
                        console.warn('Error creating marker image:', e)
                        if (!self._imageLookup[iconUrl]) {
                            self._imageLookup[iconUrl] = [null, true, []]
                        }
                    }
                }
            }
        }

    },

    _drawImage: function (marker, pointsPos) {
        // 检查marker和canvas_img是否存在以及图片是否加载成功
        if (!marker || !marker.canvas_img || marker.canvas_img.complete === false || marker.canvas_img.naturalWidth === 0) {
            return;
        }
        
        const { iconSize, iconAnchor } = this._getIconOptions(marker)
        try {
            this._context.drawImage(
                marker.canvas_img,
                pointsPos.x - (iconAnchor ? iconAnchor[0] : 0),
                pointsPos.y - (iconAnchor ? iconAnchor[1] : 0),
                iconSize[0],
                iconSize[1]
            )
        } catch (e) {
            console.warn('Failed to draw marker image:', e)
        }
    },

    addLayers: function (layers) {
        this.addMarkers(layers)
    },

    addLayer: function (layer) {
        if (!layer.options.pane === 'markerPane') {
            console.error(`canvasMarkers: Layer is not a marker`)
            return
        }
        this.addMarker(layer)
    },

    clearLayers: function () {
        this._latlngMarkers = null
        this._markers = null
        this._imageLookup = null
        if (this._context) {
            this._redraw(true)
        }
    },

    removeMarker: function (marker, redraw) {
        let self = this
        // if we are removed point
        if ('minX' in marker && marker.minX) {
            marker = marker.data
        }
        let latLng = marker.getLatLng()
        let isShow = self._map.getBounds().contains(latLng)
        let markerData = {
            minX: latLng.lng,
            minY: latLng.lat,
            maxX: latLng.lng,
            maxY: latLng.lat,
            data: marker
        }
        self._latlngMarkers.remove(markerData, function (a, b) {
            return a.data._leaflet_id === b.data._leaflet_id
        })
        self._latlngMarkers.total--
        self._latlngMarkers.dirty++
        if (isShow && redraw) {
            self._redraw(true)
        }
    },

    removeLayer: function (layer) {
        this.removeMarker(layer, true)
    },

    _reset: function () {
        if (this._context) {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
        }
        const topLeft = this._map.containerPointToLayerPoint([0, 0])
        L.DomUtil.setPosition(this._canvas, topLeft)
        const { x, y } = this._map.getSize()
        this._canvas.width = x
        this._canvas.height = y
        this._redraw()
    },

    _executeListeners: function (event) {
        if (!this._markers) return
        let self = this
        const x = event.containerPoint.x
        const y = event.containerPoint.y
        if (self._tooltip) {
            try {
                self._tooltip.remove()
                delete self._tooltip
            } catch (e) {
                delete self._tooltip
            }
        }
        const ret = this._markers.search({ minX: x, minY: y, maxX: x, maxY: y })
        if (ret && ret.length) {
            self._map._container.style.cursor = 'pointer'
            if (event.type === 'click') {
                const hasPopup = typeof ret[0].data.getPopup === 'function' && ret[0].data.getPopup()
                if (hasPopup) {
                    ret[0].data.openPopup()
                }
                self._onClickListeners.forEach(listener => {
                    listener(event, ret)
                })
            } else if (event.type === 'mousemove') {
                // 兼容普通对象点位
                const markerData = ret[0].data;
                const hasTooltip = typeof markerData.getTooltip === 'function' && markerData.getTooltip();
                if (hasTooltip) {
                    self._tooltip = hasTooltip;
                    const latLng = markerData.getLatLng();
                    hasTooltip.setLatLng(latLng).addTo(self._map);
                } else if (markerData.text) {
                    // 普通对象点位，自动创建tooltip
                    if (self._tooltip) {
                        self._tooltip.remove();
                    }
                    self._tooltip = L.tooltip({
                        permanent: false,
                        direction: 'top',
                        offset: [0, -10],
                        className: 'canvas-marker-tooltip'
                    })
                    .setContent(markerData.text)
                    .setLatLng(markerData.getLatLng())
                    .addTo(self._map);
                }
                self._onHoverListeners.forEach(listener => {
                    listener(event, ret)
                });
            }
        } else {
            self._map._container.style.cursor = ''
        }
    },

    _animateZoom: function (event) {
        let scale = this._map.getZoomScale(event.zoom)
        let offset = this._map._latLngBoundsToNewLayerBounds(this._map.getBounds(), event.zoom, event.center).min
        L.DomUtil.setTransform(this._canvas, offset, scale)
    },

    _redraw: function (clear) {
        let self = this
        if (clear && this._context) {
            this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
        }
        if (!this._map || !this._latlngMarkers) {
            return
        }
        let tmp = []
        // if we are 10% individual inserts\removals, reconstruct lookup for efficiency
        if (self._latlngMarkers.dirty / self._latlngMarkers.total >= .1) {
            self._latlngMarkers.all().forEach(e => {
                tmp.push(e)
            })
            self._latlngMarkers.clear()
            self._latlngMarkers.load(tmp)
            self._latlngMarkers.dirty = 0
            tmp = []
        }
        const mapBounds = self._map.getBounds()
        const mapBoxCoords = {
            minX: mapBounds.getWest(),
            minY: mapBounds.getSouth(),
            maxX: mapBounds.getEast(),
            maxY: mapBounds.getNorth()
        }
        const upMarkerData = []
        const checkedIds = new Set(this.options.checkedIds || []);

        self._latlngMarkers.search(mapBoxCoords).forEach(e => {
            const pointPos = self._map.latLngToContainerPoint(e.data.getLatLng())
            const { iconSize, iconAnchor } = this._getIconOptions(e.data)
            const left = iconAnchor ? iconAnchor[0] : 0
            const right = iconSize[0] - (iconAnchor ? iconAnchor[0] : 0)
            const top = iconAnchor ? iconAnchor[1] : 0
            const bottom = iconSize[1] - (iconAnchor ? iconAnchor[1] : 0)
            const newCoords = {
                minX: (pointPos.x - left),
                minY: (pointPos.y - top),
                maxX: (pointPos.x + right),
                maxY: (pointPos.y + bottom),
                data: e.data
            }
            tmp.push(newCoords)
            const id = e.data?.data?.id
            if (checkedIds.has(id)) {
                upMarkerData.push({ data: e.data, pos: pointPos })
            } else {
                // redraw point
                self._drawMarker(e.data, pointPos)
            }
        })
        // console.log(tmp)
        // console.log(this.options.checkedIds)
        // 将包含在checkIds中的选中的点位，最后draw，保证点位在上不被覆盖
        upMarkerData.forEach(item => {
            // redraw point
            self._drawMarker(item.data, item.pos)
        })
        // clear rbush & bulk load for performance
        this._markers.clear()
        this._markers.load(tmp)
    },

    addOnClickListener: function (listener) {
        this._onClickListeners.push(listener)
    },

    addOnHoverListener: function (listener) {
        this._onHoverListeners.push(listener)
    },

    removeOnClickListener: function (listener) {
        this._onClickListeners = this._onClickListeners.filter(clickListener => listener !== clickListener)
    },

    removeOnHoverListener: function (listener) {
        this._onHoverListeners = this._onHoverListeners.filter(hoverListener => listener !== hoverListener)
    },

    _getIconOptions: function (marker) {
        const zoom = this._map.getZoom()
        const { iconSize: defaultIconSize, iconAnchor: defaultIconAnchor } = marker.options.icon.options
        let iconSize = defaultIconSize
        let iconAnchor = defaultIconAnchor
        if (typeof iconSize === 'function') {
            iconSize = iconSize(zoom)
        }
        if (typeof iconAnchor === 'function') {
            iconAnchor = iconAnchor(this._map.getZoom(zoom))
        }
        return {
            iconSize: L.Util.isArray(iconSize) ? iconSize : [0, 0],
            iconAnchor: L.Util.isArray(iconAnchor) ? iconAnchor : [0, 0]
        }
    }
})

function canvasMarkersLayer(options) {
    return new CanvasMarkersLayer(options)
}

if (window?.L) {
    L.canvasMarkersLayer = canvasMarkersLayer
}

export default canvasMarkersLayer
