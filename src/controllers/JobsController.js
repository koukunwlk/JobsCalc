const Profile = require('../model/Profile')
const Jobs = require('../model/Jobs')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    

    create(req, res) {
        res.render("job")
    },

    async save(req, res) {
        const data = req.body
        const createdAt = Date.now()
        await Jobs.save({
            ...data,
            createdAt
        })

        return res.redirect('/')
    },
    async show(req, res) {
        const jobs = await Jobs.get()
        const profile = await Profile.get()
        const jobId = req.params.id

        const job = jobs.find(job => Number(jobId) === Number(job.id))

        if (!job) return res.send("Job not found")

        job.budget = JobUtils.calcBudget(profile["value-per-hour"], job)
        return res.render('job-edit', { job })
    },
    async update(req, res) {
        const jobId = req.params.id
        const jobs = await Jobs.get()
        const profile = Profile.get()
        const job = jobs.find(job => Number(jobId) === Number(job.id))

        if (!job) return res.send("Job not found")
        job.budget = JobUtils.calcBudget(profile["value-per-hour"], job)
        const updatedJob = {
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }
        
        await Jobs.update(updatedJob, jobId)

        return res.redirect('/job/' + jobId)
    },
    async delete(req, res) {
        await Jobs.delete(req.params.id)
        res.redirect('/')
    }

}