// Date Utility Functions for Job Application Tracker (IST)

export function formatDate(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return ''
  }

  try {
    const [year, month, day] = dateString.split('-').map(Number)
    
    if (!year || !month || !day) {
      return ''
    }

    // month is 0-indexed in Date constructor
    const date = new Date(year, month - 1, day)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }

    return date.toLocaleDateString('en-IN', options)
  } catch (error) {
    return ''
  }
}

export function isToday(dateString) {
  if (!dateString) return false

  try {
    const [year, month, day] = dateString.split('-').map(Number)
    
    // Normalize both dates to midnight for accurate comparison
    const inputDate = new Date(year, month - 1, day)
    const today = new Date()
    const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    return (
      inputDate.getFullYear() === todayNormalized.getFullYear() &&
      inputDate.getMonth() === todayNormalized.getMonth() &&
      inputDate.getDate() === todayNormalized.getDate()
    )
  } catch (error) {
    return false
  }
}

export function isTomorrow(dateString) {
  if (!dateString) return false

  try {
    const [year, month, day] = dateString.split('-').map(Number)
    
    const inputDate = new Date(year, month - 1, day)

    // Calculate tomorrow with automatic month/year boundary handling
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowNormalized = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate())

    return (
      inputDate.getFullYear() === tomorrowNormalized.getFullYear() &&
      inputDate.getMonth() === tomorrowNormalized.getMonth() &&
      inputDate.getDate() === tomorrowNormalized.getDate()
    )
  } catch (error) {
    return false
  }
}

export function getDaysUntilInterview(dateString) {
  if (!dateString) return null

  try {
    const [year, month, day] = dateString.split('-').map(Number)
    
    const interviewDate = new Date(year, month - 1, day)

    // Normalize today to midnight for accurate day calculation
    const today = new Date()
    const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    const diffMs = interviewDate - todayNormalized
    const daysRemaining = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    return daysRemaining
  } catch (error) {
    return null
  }
}

export function getUpcomingInterviews(jobs) {
  if (!Array.isArray(jobs)) {
    return []
  }

  return jobs
    .filter(job => job.interviewDate && job.interviewDate.trim() !== '')
    // Only include interviews within next 7 days (exclude past dates)
    .filter(job => {
      const daysUntil = getDaysUntilInterview(job.interviewDate)
      return daysUntil !== null && daysUntil >= 0 && daysUntil <= 7
    })
    // Sort by urgency (closest interview first)
    .sort((jobA, jobB) => {
      const daysA = getDaysUntilInterview(jobA.interviewDate)
      const daysB = getDaysUntilInterview(jobB.interviewDate)
      return daysA - daysB
    })
}
