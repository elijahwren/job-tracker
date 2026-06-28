import api from "./axios.js";

export const applicationApi = {
	getAll: () => api.get("/applications"),
	create: (data) => api.post("/applications", data),
	update: (id, data) => api.put(`/applications/${id}`, data),
	remove: (id) => api.delete(`/applications/${id}`),
};
