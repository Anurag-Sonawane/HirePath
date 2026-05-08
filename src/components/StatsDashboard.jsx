import React from 'react';
import { getDaysUntilInterview, formatDate, getUpcomingInterviews } from '../utils/dateUtils';

export default function StatsDashboard({ jobs}){
      const interviewJobs = jobs.filter(
        job => job.status === "Interviewed"
      );
      const interviewcount = interviewJobs.length;

      const offerJobs = jobs.filter(
        job => job.status === "Offer"
      );
      const offerCount = offerJobs.length;

      const rejectedJobs = jobs.filter(
        job => job.status === "Rejected"
      );
      const rejectedCount = rejectedJobs.length;

      const successRate = totalApplications > 0 ? ((offerCount / totalApplications) * 100) : 0;

      const upcomingInterviews = getUpcomingInterviews(jobs);

      const daysRemaining = getDaysUntilInterview(interview.interviewDate);




  return (
    <div>
      <h2>Stats Dashboard</h2>
      const totalApplications = jobs.length;
      <p>Total jobs: {totalApplications}</p>

      <p>Total Interviews: {interviewcount}</p>

      <p>Total Offers: {offerCount}</p>

      <p>Total Rejections: {rejectedCount}</p>

      <p> success rate : {successRate.toFixed(2)}%</p>

      <p>Upcoming Interviews : {upcomingInterviews.length}</p>
      {
        upcomingInterviews.map(interview => (
          <div>
            <p>{interview.company}</p>
            <p>{interview.role}</p>
            <p>{formatDate(interview.date)}</p>
          </div>
        ))
      }
      <p>
        {
          getDaysUntilInterview(
            interview.interviewDate
          ) === 0
            ? "Today"
            : `${getDaysUntilInterview(
                interview.interviewDate
              )} days left`
        }
        {
          upcomingInterviews.length === 0 && (
           <p>No interviews</p>
          )
        }
      </p>




    </div>
  )
}
