const Profile = require('../model/Profile')
const Jobs = require('../model/Jobs')
const JobUtils = require('../utils/JobUtils')


module.exports = {

    async index(req, res) {
        const profile = await Profile.get()
        const jobs = await Jobs.get()
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }
        let totalJobHours = 0
        let updatedJobs = jobs.map(job => {
            const remaining = JobUtils.remainingD(job)
            const status = remaining <= 0 ? "done" : "progress"
            const budget = JobUtils.calcBudget(profile["value-per-hour"], job)

            totalJobHours = status == 'progress' ? totalJobHours += Number(job['daily-hours']) : totalJobHours

            statusCount[status] += 1

            return {
                ...job,
                remaining,
                status,
                budget
            }
        })
        let availableHours = profile['hours-per-day'] - totalJobHours

        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, availableHours: availableHours })
    }
}