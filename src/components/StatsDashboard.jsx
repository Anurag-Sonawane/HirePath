import React from 'react'

import {getDaysUntilInterview, formatDate, getUpcomingInterviews} from '../utils/dateUtils'
import './StatsDashboard.css'

export default function StatsDashboard({ jobs }) {

  const totalApplications = jobs.length

  const interviewJobs = jobs.filter(
    job => job.status === "Interviewed"
  )

  const interviewCount = interviewJobs.length

  const offerJobs = jobs.filter(
    job => job.status === "Offer"
  )

  const offerCount = offerJobs.length

  const rejectedJobs = jobs.filter(
    job => job.status === "Rejected"
  )

  const rejectedCount = rejectedJobs.length

  const successRate =
    totalApplications > 0
      ? ((offerCount / totalApplications) * 100)
      : 0

  const upcomingInterviews =
    getUpcomingInterviews(jobs)

  return (
    <div>

      <h2>Stats Dashboard</h2>
      <p>Total jobs: {totalApplications}</p>
      <p>Total Interviews: {interviewCount}</p>
      <p>Total Offers: {offerCount}</p>
      <p>Total Rejections: {rejectedCount}</p>

      <p>
        Success Rate:
        {successRate.toFixed(2)}%
      </p>

      <h3>
        Upcoming Interviews:
        {upcomingInterviews.length}
      </h3>

      {
        upcomingInterviews.length === 0 && (
          <p>No interviews</p>
        )
      }

      {
        upcomingInterviews.map(interview => (

          <div key={interview.id}>
            <p>{interview.company}</p>
            <p>{interview.role}</p>
            <p>
              {
                formatDate(interview.interviewDate)
              }
            </p>

            <p>
              {
                getDaysUntilInterview(interview.interviewDate) === 0
                  ? "Today"
                  : `${getDaysUntilInterview(
                      interview.interviewDate
                    )} days left`
              }
            </p>

          </div>

        ))
      }

      <div className="stats-grid">
        <div className="stat-card"></div>
        <div className="stat-card"></div>
      </div>

      <div className="funnel-chart">
        <h3>Application Funnel</h3>
        <div className="funnel-row">
          <p>Applied</p>
          <div className="bar-container">
            <div className="bar" style={{width: `${totalApplications*10}px`}}>
              <p>{totalApplications}</p>
            </div>
            <div className="bar" style={{width: `${interviewCount*10}px`}}>
              <p>{interviewCount}</p>
            </div>
            <div className="bar" style={{width: `${offerCount*10}px`}}>
              <p>{offerCount}</p>
            </div>
            <div className="bar" style={{width: `${rejectedCount*10}px`}}>
              <p>{rejectedCount}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}