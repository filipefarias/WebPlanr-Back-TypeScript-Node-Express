import { app } from './server/server'

app.listen(process.env.PORT || 3333, () => 'server running on port 3333')