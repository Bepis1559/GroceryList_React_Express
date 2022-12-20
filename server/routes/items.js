import express from 'express';
import { increaseIdTrackerByOne, decreastIdTrackerByOne } from './ids.js';

export const router = express.Router()
let items = []
let idChecker = 1
// previous post , based on id
const handlePost = (id, name, res) => {
    items.push({
        id,
        name
    })
    res.sendStatus(200)
    // if you wanna use bash and make requests with ordered id
    // if (id == idChecker) {
    //     idChecker += 1
    //     items.push({
    //         id,
    //         name
    //     })
    //     res.sendStatus(200)
    // } else if (id != idChecker) {
    //     res.status(400).json("You must start with id of 1 and go on with 2,3 and so on.")
    // }

}

const handleGetWithId = (id, res) => {
    const searchedItem = items.filter(el => el.id == id)
    let searchedId = searchedItem.map(el => el.id)
    if (isNaN(id)) {
        res.status(400).send(`The id,"${id}" should be a number,idiot ! `)
    } else if (id == searchedId) {
        res.status(200).json(searchedItem)
    } else {
        res.sendStatus(404)
    }
}
const handleDelete = (id, res) => {
    // filtered = every id in the items array without the id in the delete request
    const filtered = items.filter(el => el.id !== id)
    if (idChecker <= 1) {
        res.status(400).send('There are no items to be deleted .')
        // check if the wanted id exists in the filtered array
    }
    // if you want to delete based on id 
    else if (items.findIndex(el => el.id === id) === - 1) {
        res.status(400).send('There are no items with such an id .')
        items.forEach(el => console.log(el.id))
    }
    else {
        items = [...filtered]
        idChecker--
        res.sendStatus(200)
    }
}
const handlePut = (id, name, res) => {
    // filtered = every id in the items array without the id in the delete request
    const filtered = items.filter(el => el.id !== id)
    // if the searched item does not exist , create it
    // if the searched item exists, modify it 
    if (items.findIndex(el => el.id === id) === - 1) {   // if the id does not exist
        handlePost(id, name, res)
    } else { // if the id exists
        items = [...filtered]
        items.push({
            id,
            name
        })
        // sort the items in the array by id in ascending order 
        items.sort((a, b) => a.id - b.id)
        res.sendStatus(200)

    }
}
// get all items
router.get('/', (req, res) => {
    res.status(200).json(items)
})
// get a particular item with a selected id 
router.get('/:id', (req, res) => {
    const id = req.params.id
    handleGetWithId(id, res)
})
// delete based on id 
// router.delete('/:id', (req, res) => {
//     const id = req.params.id
//     handleDelete(id, res)
// })
// delete via the react app
router.delete('/', (req, res) => {
    decreastIdTrackerByOne()
    items.pop()
    res.sendStatus(200)
})

// add an item via post
// via params
// router.post('/:id/:name', (req, res) => {
//     // const id = req.params.id
//     handlePost(req.body.id, req.body.name, res,)
// })
// via body
router.post('/', (req, res) => {
    increaseIdTrackerByOne()
    handlePost(req.body.id, req.body.name, res)
})
// handle a post request with only id entered
router.post('/:id', (req, res) => {
    res.status(400).send('You can not post with id only.')
})
// put
router.put('/:id', (req, res) => {
    res.status(400).send('You can not put with id only.')
})
router.put('/:id/:name', (req, res) => {
    // const id = req.params.id
    // const name = req.params.name
    handlePut(req.body.id, req.body.name, res)
})

