const Config = require('./config')


const initDb = {
    async init() {
    const db = await Config()

    await db.exec(`
    CREATE TABLE IF NOT EXISTS profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        days_per_week INT, 
        hour_per_day INT,
        vacation_per_year INT,
        value_per_hour INT
    )
`);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )
`)

    await db.run(`
    INSERT INTO profile (
        name,
        avatar,
        monthly_budget,
        days_per_week,
        hour_per_day,
        vacation_per_year,
        value_per_hour
    ) VALUES (
        "Moacir Amaro",
        "https://avatars.githubusercontent.com/u/42473601?s=400&v=4",
        4000,
        4,
        5,
        4,
        80
    )
`);

    await db.run(`
    INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
        "Pizzaria Guloso",
        2,
        10,
        1617514376018
    )
`);
    await db.run(`
    INSERT INTO jobs (
        name,
        daily_hours,
        total_hours,
        created_at
    ) VALUES (
        "OneTwo Project",
        3,
        20,
        1617514376018
    )
`)

    await db.close()
    }
}

initDb.init()