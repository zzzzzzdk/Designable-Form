import { centerOfMass } from '@turf/turf';
export default (r, t) => {
  try {
    return centerOfMass(r, t);
  } catch (r) {
    console.log(r);
  }
};
