export function getJobsByStatus(jobs, status) {
  return jobs.filter(job => job.status === status)
}
