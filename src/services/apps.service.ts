import axios from 'axios';

const AppService = {
  getApps() {
    return axios.get('/api/apps');
  },

  getInstalledApp(name: string, namespace: string) {
    return axios.get(`/api/apps/${namespace}/${name}`);
  },

  deleteApp(name: string, namespace: string) {
    return axios.delete(`/api/apps/${namespace}/${name}`);
  },
};

export default AppService;
