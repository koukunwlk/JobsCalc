module.exports = {
    remainingD(job) {
        const remainingDays = (Number(job["total-hours"]) / Number(job["daily-hours"])).toFixed()
        const createdDate = new Date(job.createdAt)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)
        const timeDiffMs = dueDateInMs - Date.now()
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffMs / dayInMs)

        return dayDiff
    },
    calcBudget(valueHour, job) {
        return valueHour * job["total-hours"]
    }
}
