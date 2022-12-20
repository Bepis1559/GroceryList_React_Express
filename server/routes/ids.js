import express from 'express';
export const idRouter = express.Router()
let idTracker = 1
export const increaseIdTrackerByOne = () => idTracker++
export const decreastIdTrackerByOne = () => idTracker > 1 ? idTracker-- : null

idRouter.get('/', (req, res) => {
    res.status(200).json(idTracker)
})