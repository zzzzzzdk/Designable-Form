import L from 'leaflet';
export default (t, l, a) => {
  if (!parseFloat(a) || !parseFloat(l)) return !1;
  const { type: n } = t;
  if ('circle' === n) {
    const { center: n, radius: e } = t;
    return e >= L.latLng(l, a).distanceTo(L.latLng(n));
  }
  if ('rectangle' === n) {
    const { northEast: n, southWest: e } = t,
      r = e.lat,
      g = e.lng,
      i = n.lat,
      f = n.lng;
    return a >= g && a <= f && l >= r && l <= i;
  }
  if ('polygon' === n) {
    const { latLngs: n } = t;
    let e,
      r,
      g = n.length,
      i = !0,
      f = 0,
      s = 2e-10,
      o = L.latLng(l, a);
    e = L.latLng(n[0]);
    for (let t = 1; t <= g; ++t) {
      if (o.equals(e)) return i;
      if (
        ((r = L.latLng(n[t % g])),
        o.lat < Math.min(e.lat, r.lat) || o.lat > Math.max(e.lat, r.lat))
      )
        e = r;
      else {
        if (o.lat > Math.min(e.lat, r.lat) && o.lat < Math.max(e.lat, r.lat)) {
          if (o.lng <= Math.max(e.lng, r.lng)) {
            if (e.lat == r.lat && o.lng >= Math.min(e.lng, r.lng)) return i;
            if (e.lng == r.lng) {
              if (e.lng == o.lng) return i;
              ++f;
            } else {
              let t =
                ((o.lat - e.lat) * (r.lng - e.lng)) / (r.lat - e.lat) + e.lng;
              if (Math.abs(o.lng - t) < s) return i;
              o.lng < t && ++f;
            }
          }
        } else if (o.lat == r.lat && o.lng <= r.lng) {
          let l = n[(t + 1) % g];
          o.lat >= Math.min(e.lat, l.lat) && o.lat <= Math.max(e.lat, l.lat)
            ? ++f
            : (f += 2);
        }
        e = r;
      }
    }
    return f % 2 != 0;
  }
  return !1;
};
