import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://backend.hkmheavyequipments.qa/api",
  // baseURL: "http://localhost:5000/api",
  // baseURL: "http://52.0.217.240/api",
  //

  headers: { Accept: "application/vnd.github.v3+json" },
});

export default apiClient;
