const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/connection')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const doctorRoutes = require('./routes/doctorRoutes')
const { errorHandler, notFound } = require('./middlewares/errorMiddleware')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

dotenv.config();
connectDB();

app.use(morgan("dev"))
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('API running')
})

app.use('/', userRoutes)
app.use('/admin', adminRoutes)
app.use('/doctor', doctorRoutes)

app.use(notFound);
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));