import { Knex } from './server/database/knex'
import { app } from './server/server'

const startServer = () => {
    app.listen(process.env.PORT || 3333, () => 'server running on port 3333')
}

if (process.env.IS_LOCALHOST !== 'true') {
    Knex.migrate.latest()
        .then(() => {
            Knex.seed.run()
                .then(() => { startServer() })
                .catch(console.log)        
        })
        .catch(console.log)
} else {
    startServer()
}