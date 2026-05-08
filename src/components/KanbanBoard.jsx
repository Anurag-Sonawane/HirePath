import { useState } from 'react'
import { getJobsByStatus } from '../utils/jobUtils'

const columns = [
  { title: 'Applied', status: 'Applied' },
  { title: 'Interviewed', status: 'Interviewed' },
  { title: 'Offer', status: 'Offer' },
  { title: 'Rejected', status: 'Rejected' }
]

function JobCardItem({ job, onUpdateStatus, isDragging, onDragStart }) {
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('jobId', job.id)
    onDragStart(job.id)
  }

  return (
    <div 
      className={`kanban-job-card ${isDragging ? 'dragging' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
    >
      <h4>{job.company}</h4>
      <p className="job-title">{job.role}</p>
      <span className="job-status">{job.status}</span>
    </div>
  )
}

export default function KanbanBoard({ jobs = [], onUpdateStatus }) {
  const [draggedJobId, setDraggedJobId] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState(null)

  const handleDragStart = (jobId) => {
    setDraggedJobId(jobId)
  }

  const handleDragOver = (e, columnStatus) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverColumn(columnStatus)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = (e, columnStatus) => {
    e.preventDefault()
    const jobId = parseInt(e.dataTransfer.getData('jobId'))
    
    if (jobId && jobId !== draggedJobId) {
      onUpdateStatus(jobId, columnStatus)
    }

    setDraggedJobId(null)
    setDragOverColumn(null)
  }

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
              <div 
                className={`kanban-column-body ${dragOverColumn === column.status ? 'drag-over' : ''}`}
                onDragOver={(e) => handleDragOver(e, column.status)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.status)}
              >
                {columnJobs.length === 0 ? (
                  <p className="empty-message">No jobs yet</p>
                ) : (
                  <div className="kanban-cards-container">
                    {columnJobs.map(job => (
                      <JobCardItem
                        key={job.id}
                        job={job}
                        onUpdateStatus={onUpdateStatus}
                        isDragging={draggedJobId === job.id}
                        onDragStart={handleDragStart}
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
