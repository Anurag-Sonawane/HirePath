import { useState } from 'react'
import './App.css'
import JobForm from './components/JobForm'
import JobCard from './components/JobCard'
import KanbanBoard from './components/KanbanBoard'
import StatsDashboard from './components/StatsDashboard'

export default function App() {
  const [jobs, setJobs] = useState([])
  const [activeTab, setActiveTab] = useState('kanban')

  const addJob = (jobData) => {
    const newJob = {
      id: Date.now(),
      company: jobData.company,
      role: jobData.role,
      status: jobData.status || 'Applied',
      interviewDate: jobData.interviewDate || '',
      appliedDate: new Date().toLocaleDateString()
    }
    setJobs([...jobs, newJob])
  }

  const updateJobStatus = (jobId, newStatus) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ))
  }

  const deleteJob = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId))
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1> Job Application Tracker</h1>
            <p className="subtitle">Keep track of all your job applications in one place</p>
          </div>
          <div className="header-stats">
            <div className="stat-badge">
              <span className="stat-value">{jobs.length}</span>
              <span className="stat-label">Total Applied</span>
            </div>
            {jobs.length > 0 && (
              <div className="stat-badge">
                <span className="stat-value">
                  {jobs.filter(j => j.status === 'Interviewed' || j.status === 'Offer').length}
                </span>
                <span className="stat-label">Interviews+</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <nav className="nav-tabs">
        <button 
          className={`tab-btn ${activeTab === 'kanban' ? 'active' : ''}`}
          onClick={() => setActiveTab('kanban')}
        >
          Application Board
        </button>
        <button 
          className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
         Statistics
        </button>
        <button 
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Job
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'add' ? (
          <JobForm onAddJob={addJob} />
        ) : (
          <div className="view-container">
            {activeTab === 'kanban' && (
              <KanbanBoard 
                jobs={jobs} 
                onStatusUpdate={updateJobStatus} 
                onDelete={deleteJob} 
              />
            )}
            {activeTab === 'stats' && <StatsDashboard jobs={jobs} />}
          </div>
        )}
      </main>
    </div>
  )
}
