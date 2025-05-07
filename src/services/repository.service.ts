import { InstalledApp } from "@/app/api/apps/app.entity";
import { Repository } from "@/interfaces";
import axios from "axios";

const RepositoryService = {
  getRepository() {
    return axios.get<Repository[]>("/api/repository");
  },
  updateRepository() {
    return axios.post("/api/repository/update");
  },
  addRepository(data: Repository) {
    return axios.post("/api/repository", data);
  },
  remoteRepository(name: string) {
    return axios.delete(`/api/repository/${name}`);
  },
  getCharts(name: string) {
    return axios.get(`/api/repository/${name}`);
  },
  listVersions(name: string, app: string) {
    return axios.get<InstalledApp[]>(`/api/repository/${name}/${app}`);
  },
};

export default RepositoryService;
