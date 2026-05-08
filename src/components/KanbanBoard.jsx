import JobCard from './JobCard'

const columns = ['Applied', 'Interviewed', 'Offer', 'Rejected']

export default function KanbanBoard({ jobs = [], onStatusUpdate, onDelete }) {
  return (
    <section className="kanban-board">
      <div className="kanban-board-header">
        <h2>Application Kanban Board</h2>
        <p>Track your application stages with a simple board layout.</p>
      </div>
      <div className="kanban-columns">
        {columns.map((column) => {
          const columnJobs = jobs.filter(job => job.status === column);
          return (
            <div key={column} className="kanban-column">
              <h3>{column}</h3>
              <div className="kanban-column-body">
                {columnJobs.length > 0 ? (
                  columnJobs.map(job => (
                    <JobCard 
                      key={job.id} 
                      job={job}
                      onStatusUpdate={onStatusUpdate}
                      onDelete={onDelete}
                    />
                  ))
                ) : (
                  <p className="empty-message">No jobs yet</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
