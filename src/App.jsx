import { useState } from 'react'
import './App.css'
import JobForm from './components/JobForm'
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
            <div className="header-logo">
              <img src="/fevicon.png" alt="HirePath Logo" className="logo-img" />
              <h1>HirePath</h1>
            </div>
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
            {activeTab === 'kanban' && <KanbanBoard jobs={jobs} onUpdateStatus={updateJobStatus} />}
            {activeTab === 'stats' && <StatsDashboard jobs={jobs} />}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">HirePath</h3>
            <p>Your personal job application tracking assistant. Stay organized, track your progress, and land your dream job with ease.</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => setActiveTab('kanban')} className="footer-link-btn">Application Board</button></li>
              <li><button onClick={() => setActiveTab('stats')} className="footer-link-btn">Statistics</button></li>
              <li><button onClick={() => setActiveTab('add')} className="footer-link-btn">Add New Job</button></li>
            </ul>
          </div>
          
          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://github.com/Anurag-Sonawane/HirePath" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} HirePath. Built for job seekers.</p>
        </div>
      </footer>
    </div>
  )
}
