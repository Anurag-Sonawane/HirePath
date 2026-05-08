import React from 'react';
import { getUpcomingInterviews } from '../utils/dateUtils';

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

      


  return (
    <div>
      <h2>Stats Dashboard</h2>
      const totalApplications = jobs.length;
      <p>Total jobs: {totalApplications}</p>

      <p>Total Interviews: {interviewcount}</p>

      <p>Total Offers: {offerCount}</p>

      <p>Total Rejections: {rejectedCount}</p>

      <p> success rate : {successRate.toFixed(2)}%</p>



    </div>
  )
}
