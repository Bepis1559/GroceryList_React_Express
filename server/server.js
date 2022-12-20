import express from 'express';
import { router } from './routes/items.js';
import cors from 'cors'
import { idRouter } from './routes/ids.js';
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "http://localhost:5173" }))
app.use('/items', router)
app.listen(5000, () => console.log("Items server started on port 5000"))
app.use('/ids', idRouter)
app.listen(5001, () => console.log('Id server started on port 5001'))