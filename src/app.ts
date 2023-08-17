import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 8100
const mongoUrl = process.env.MONGO_URL ?? ''

mongoose.connect(mongoUrl, {
  dbName: 'keepcoin-dev'
})
  .then(() => console.log('connected to MongoDB.'))
  .catch(err => console.error(err))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.use('/test', (req, res) => res.send('This is a test'))
