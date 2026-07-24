import api from "../api/axios";

export const translateFields = async (fields, targetLang = "hi") => {
  const response = await api.post("/translate", {
    fields,
    targetLang,
  });
  return response.data;
};
