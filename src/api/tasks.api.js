import axios from "axios";

const taskApi = axios.create({
  baseURL: "http://localhost:8000/tasks/api/v1/tasks/",
});

export const getAllTasks = () => {
  //return axios.get('http://localhost:8000/tasks/api/v1/tasks/')
  return taskApi.get("/");
};

export const getTask = (id) => taskApi.get(`/${id}/`)

export const createTask = (task) => taskApi.post("/", task); //si no hay nada antes del return, no es necesario escribirlo
//return axios.post('http://localhost:8000/tasks/api/v1/tasks/')

export const deleteTask = (id) => taskApi.delete(`/${id}`);

export const updateTask = (id, task) => taskApi.put(`/${id}/`, task);
