import {AxiosResponse} from 'axios'
import service from '@/service/config'

const JobService = {
  async getJobItemList(page: number, limit: number): Promise<AxiosResponse<IJobItemList>> {
    return await service.get('/jobs/item', {
      params: {page, limit}
    })
  },
  async getJobItemById(jobId: string): Promise<AxiosResponse<IJobItem>> {
    return await service.get(`/jobs/item/${jobId}`)
  },
  async getJobById(jobId: string): Promise<AxiosResponse<IJob>> {
    return await service.get(`/jobs/${jobId}`)
  },
  async addJob(jobForm: TJobForm): Promise<AxiosResponse<IJob>> {
    return await service.post('/jobs', jobForm)
  },
  async editJob(jobId: string, jobForm: TJobForm): Promise<AxiosResponse<IJob>> {
    return await service.put(`/jobs/${jobId}`, jobForm)
  }
}

export default JobService