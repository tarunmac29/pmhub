import axios from "axios";

const token = localStorage.getItem("token");

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const BASE_URL = "http://localhost:8080/api/projects";

export const getAllProjects = () => axios.get(BASE_URL);
export const createProject = (data) => axios.post(BASE_URL, data);
export const deleteProject = (id) => axios.delete(`${BASE_URL}/${id}`);
export const getProjectById = (id) => axios.get(`${BASE_URL}/${id}`);
export const searchProjects = (name) => axios.get(`${BASE_URL}/searchProjects?projectName=${name}`);
