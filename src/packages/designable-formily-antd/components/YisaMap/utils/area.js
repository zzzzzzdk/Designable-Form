import { area } from '@turf/turf';
export default (r) => {
  try {
    return area(r);
  } catch (r) {
    return (console.error('area', r), 0);
  }
};
