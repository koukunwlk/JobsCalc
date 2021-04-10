const Config = require('../db/config')


module.exports = {
    async get() {
        const db = await Config()
        const data = await db.get(`
        SELECT * FROM profile
    `)

        await db.close()
        console.log(data)
        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hour_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-per-hour": data.value_per_hour
        }

    },
    async update(newData) {
        const db = await Config()
        await db.run(`
            UPDATE profile SET
                name = "${newData.name}",
                avatar = "${newData.avatar}",
                monthly_budget = ${newData["monthly-budget"]},
                days_per_week = ${newData["days-per-week"]},
                hour_per_day = ${newData["hours-per-day"]},
                vacation_per_year = ${newData["vacation-per-year"]},
                value_per_hour = ${newData["value-per-hour"]}
        `)

        await db.close
    }
}