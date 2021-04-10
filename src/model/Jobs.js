const config = require('../db/config')


module.exports = {
    async get() {
        const db = await config()
        const jobs = await db.all(`SELECT * FROM jobs`)

        db.close()

        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            createdAt: job.created_at
        }))
    },
    async save(newJob) {
        const db = await config()
        await db.run(`
            INSERT INTO jobs(
                name,
                daily_hours,
                total_hours,
                created_at
            ) values(
                "${newJob.name}",
                ${newJob["daily-hours"]},
                ${newJob["total-hours"]},
                ${newJob.createdAt}
            )
        `)
        await db.close()
    },
    async update(newJob, jobId) {
        const db = await config()
        await db.run(`
            UPDATE jobs SET
            name = "${newJob.name}",
            daily_hours = ${newJob["daily-hours"]},
            total_hours = ${newJob["total-hours"]}
            WHERE id = ${jobId}
        `)
        await db.close()
    },
    async delete(id) {
        const db = await config()
        await db.run(`
            DELETE FROM jobs WHERE id = ${id}
        `)
        await db.close()
    }
}