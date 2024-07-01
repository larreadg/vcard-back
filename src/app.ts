import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import routes from './routes'
import path from 'path'
const port = process.env.PORT
const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))

app.use('/api/public', express.static(path.join(__dirname, '../public')))

app.use('/api', routes)

app.listen(port, () => console.log(`App runing on port ${port}`))
