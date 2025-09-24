import { length } from '@turf/turf';
export default (r, t) => {
  try {
    return length(r, t);
  } catch (r) {
    return (console.error('area', r), 0);
  }
};
