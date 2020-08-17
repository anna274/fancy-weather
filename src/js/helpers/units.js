function convertCtoF(c) {
  return (c * (9 / 5)) + 32;
}

function convertFtoC(f) {
  return (f - 32) * (5 / 9);
}

function formatCoords(d) {
  const degree = (d > 0) ? Math.floor(d) : Math.ceil(d);
  const minutes = Math.round(Math.abs((d % 1) * 100));
  return `${degree}˚${minutes}'`;
}

export {
  convertCtoF, convertFtoC, formatCoords,
};
