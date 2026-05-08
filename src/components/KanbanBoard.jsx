import { getJobsByStatus } from '../utils/jobUtils'

const columns = [
  { title: 'Applied', status: 'Applied' },
  { title: 'Interviewed', status: 'Interviewed' },
  { title: 'Offer', status: 'Offer' },
  { title: 'Rejected', status: 'Rejected' }
]

function JobCardItem({ job, onUpdateStatus }) {
  return (
    <div className="kanban-job-card">
      <h4>{job.company}</h4>
      <p className="job-title">{job.role}</p>
      <span className="job-status">{job.status}</span>
    </div>
  )
}

export default function KanbanBoard({ jobs = [], onUpdateStatus }) {
  return (
    <section className="kanban-board">
      <div className="kanban-board-header">
        <h2>Application Kanban Board</h2>
        <p>Track your application stages with a simple board layout.</p>
      </div>
      <div className="kanban-columns">
        {columns.map((column) => {
          const columnJobs = getJobsByStatus(jobs, column.status)

          return (
            <div key={column.title} className="kanban-column">
              <h3>{column.title}</h3>
              <div className="kanban-column-body">
                {columnJobs.length === 0 ? (
                  <p className="empty-message">No jobs yet</p>
                ) : (
                  <div className="kanban-cards-container">
                    {columnJobs.map(job => (
                      <JobCardItem
                        key={job.id}
                        job={job}
                        onUpdateStatus={onUpdateStatus}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
