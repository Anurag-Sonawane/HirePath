import { useState } from 'react'

export default function JobForm({ onAddJob }) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [interviewDate, setInterviewDate] = useState('')
  const [status, setStatus] = useState('Applied')

  const handleSubmit = (e) => {
    e.preventDefault()
    

    if (!company.trim() || !role.trim()) {
      alert('Please fill in both Company and Role')
      return
    }


    onAddJob({
      company,
      role,
      interviewDate,
      status
    })


    setCompany('')
    setRole('')
    setInterviewDate('')
    setStatus('Applied')
    
    alert('Job application added successfully!')
  }

  return (
    <div className="job-form-container">
      <h2>Add New Job Application</h2>
      <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label htmlFor="company">Company Name</label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Google"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Job Role</label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Frontend Developer"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="interviewDate">Interview Date</label>
          <input
            id="interviewDate"
            type="date"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select 
            id="status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Add Job</button>
      </form>
    </div>
  )
}
