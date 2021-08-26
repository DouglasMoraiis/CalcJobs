const Database = require('../db/config')

module.exports = {
    async get(){
        const db = await Database()
        
        const data = await db.all(`SELECT * FROM jobs`)

        await db.close()
        
        return data.map(job => ({
                id : job.id,
                name: job.name,
                value: job.value,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                created_at: job.created_at,
        }))
    },

    async update(updatedJob, jobId){
        const db = await Database()
        db.run(`UPDATE job SET 
            name = "${updatedJob.name}",
            daily_hours = ${updatedJob["daily-hours"]},
            total_hours = ${updatedJob["total-hours"]}
            WHERE id = ${jobId}
        `)
        await db.close()

    },

    async delete(jobId){
        const db = await Database()
        
        await db.run(`DELETE FROM jobs WHERE id = ${jobId}`)
        
        await db.close()
    }, 

    async create(newJob){
        const db = await Database()
        await db.run(`INSERT INTO jobs (
            name, 
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )`)

        db.close()
    }
}
