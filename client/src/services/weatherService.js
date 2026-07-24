import api from "../api/axios";

export const getWeather = async ({ city, lat, lon } = {}) => {
  const params = {};
  if (lat != null && lon != null) {
    params.lat = lat;
    params.lon = lon;
  } else if (city) {
    params.city = city;
  }

  const response = await api.get("/weather", { params });
  return response.data;
};
