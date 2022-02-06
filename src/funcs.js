
const DMSToDD = (dms, direction) => {
  let sign = (direction === "W" || direction === "S") ? -1 : 1;
  return sign * dms.reduce((acc, val, i) => acc + val / Math.pow(60, i), 0);
}

const DDToText = (longitude, latitude) => {
  let displayLon = Math.round(Math.abs(longitude * 1000)) / 1000;
  let displayLat = Math.round(Math.abs(latitude * 1000)) / 1000;
  return `${displayLat}°${latitude < 0 ? "S" : "N"}, ${displayLon}°${longitude < 0 ? "W" : "E"}`
}

export { DMSToDD, DDToText };
