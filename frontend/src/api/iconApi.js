import axios from "axios";

const BASE_URL = "http://localhost:5000/api/icons";

export const getAllIcons = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const getIconById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};
