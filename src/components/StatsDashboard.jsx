import { getDaysUntilInterview, formatDate, getUpcomingInterviews } from '../utils/dateUtils'
import './StatsDashboard.css'

export default function StatsDashboard({ jobs }) {
  // Count jobs by status
  const totalApplications = jobs.length
  const appliedCount = jobs.filter(job => job.status === 'Applied').length
  const interviewCount = jobs.filter(job => job.status === 'Interviewed').length
  const offerCount = jobs.filter(job => job.status === 'Offer').length
  const rejectedCount = jobs.filter(job => job.status === 'Rejected').length

  // Calculate success rate
  const successRate = totalApplications > 0 ? (offerCount / totalApplications) * 100 : 0

  // Calculate maximum value for funnel scaling (percentage calculation)
  const maxFunnelValue = Math.max(totalApplications, 1) // Avoid division by zero

  // Separate jobs by type
  const appliedJobs = jobs.filter(job => job.status === 'Applied')
  const interviewJobs = jobs.filter(job => 
    (job.status === 'Interviewed' && job.interviewDate)
  )

  return (
    <div className="stats-dashboard">
      {/* Stats Section */}
      <h2>Stats Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total Applications</p>
          <p className="stat-value">{totalApplications}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Interviews</p>
          <p className="stat-value">{interviewCount}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Offers</p>
          <p className="stat-value">{offerCount}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Rejections</p>
          <p className="stat-value">{rejectedCount}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Success Rate</p>
          <p className="stat-value">{successRate.toFixed(2)}%</p>
        </div>
      </div>

      {/* Funnel Chart Section */}
      <h3>Application Funnel</h3>

      <div className="funnel-chart">
        <div className="funnel-bar-group">
          <div className="funnel-bar-item">
            <div 
              className="funnel-bar" 
              style={{ width: `${(totalApplications / maxFunnelValue) * 100}%` }}
            >
              <span>{totalApplications}</span>
            </div>
            <p>Applied</p>
          </div>

          <div className="funnel-bar-item">
            <div 
              className="funnel-bar" 
              style={{ width: `${(interviewCount / maxFunnelValue) * 100}%` }}
            >
              <span>{interviewCount}</span>
            </div>
            <p>Interviewed</p>
          </div>

          <div className="funnel-bar-item">
            <div 
              className="funnel-bar" 
              style={{ width: `${(offerCount / maxFunnelValue) * 100}%` }}
            >
              <span>{offerCount}</span>
            </div>
            <p>Offers</p>
          </div>

          <div className="funnel-bar-item">
            <div 
              className="funnel-bar" 
              style={{ width: `${(rejectedCount / maxFunnelValue) * 100}%` }}
            >
              <span>{rejectedCount}</span>
            </div>
            <p>Rejected</p>
          </div>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <h3>Applied Jobs</h3>

      {appliedJobs.length === 0 ? (
        <p className="empty-state">No applied jobs yet</p>
      ) : (
        <div className="jobs-list">
          {appliedJobs.map(job => (
            <div key={job.id} className="job-item">
              <div className="job-info">
                <h4>{job.company}</h4>
                <p>{job.role}</p>
              </div>
              <div className="job-status">
                <span className="status-badge applied">Applied</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Interviews Section */}
      <h3>Upcoming Interviews (Next 7 Days)</h3>

      {interviewJobs.length === 0 ? (
        <p className="empty-state">No upcoming interviews scheduled</p>
      ) : (
        <div className="interview-list">
          {interviewJobs.map(interview => {
            const daysUntil = getDaysUntilInterview(interview.interviewDate)
            const daysText = daysUntil === 0 ? 'Today' : `${daysUntil} days`

            return (
              <div key={interview.id} className="interview-item">
                <div className="interview-info">
                  <h4>{interview.company}</h4>
                  <p>{interview.role}</p>
                  <p className="date">{formatDate(interview.interviewDate)}</p>
                </div>
                <div className="days-badge">{daysText}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}