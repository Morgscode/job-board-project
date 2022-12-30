import { http } from './http';

const ROUTE = '/job-application-statuses';

const jobService = {
  async index(page = 1, sortOrder = 'asc') {
    const res = await http.get(`${ROUTE}?page=${page}&order=${sortOrder}`);
    if (res.status !== 200) throw new Error(res.status);
    return res.data.data.statuses || [];
  },
  async find(id) {
    const res = await http.get(`${ROUTE}/${id}`, id);
    if (res.status !== 200) throw new Error(res.status);
    return res.data.data.status || false;
  },
  async update(job, id) {
    const res = await http.put(`${ROUTE}/${id}`, job);
    if (res.status !== 200) throw new Error(res.status);
    return res.data.data.status || false;
  },
  async delete(id) {
    const res = await http.delete(`${ROUTE}/${id}`);
    if (res.status !== 200) throw new Error(res.status);
    return true;
  },
};

export default jobService;
