// https://www.npmjs.com/ >> Json server
// npx json-server -p 5501 -w data/db.json
// import uuid from 'react-uuid'
import './styles/groceryAllIn.css'
import { useEffect, useState, useRef } from 'react'
import { AddButton } from './components/addButton';
import { ColorSetter } from './components/colorSetter';
import { ItemInput } from './components/itemInput';
import { RemoveButton } from './components/removeButton';
import { SearchInput } from './components/searchInput';
import { apiRequest } from './helpers/apiRequest';
export function App() {
    const olRef = useRef(null)
    const IDS_URL = 'http://localhost:5001/ids'
    const ITEMS_URL = 'http://localhost:5000/items'
    const [error, setError] = useState(null)
    const [id, setId] = useState(1)
    const [name, setName] = useState('')
    const [searchedItem, setSearchedItem] = useState('')
    const [list, setList] = useState([])
    const listItem = {
        id: id,
        name: name
    }
    const deleteObj = {
        method: 'DELETE'
    }
    const removeLastItemFromList = () => setList(prevList => prevList.slice(0, prevList.length - 1))
    const makeDeleteRequest = async () => await apiRequest(ITEMS_URL, deleteObj)
    const filteredList = list.filter(el => searchedItem === '' ? el : el.name.toLowerCase().includes(searchedItem))
    const postOptions = {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(listItem)
    }
    const fetchItems = async () => {
        try {
            const response = await fetch(ITEMS_URL)
            if (!response.ok) throw Error('Did not receive expected data')
            setList(await response.json())
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        fetchItems()
    }, [])
    const fetchId = async () => {
        try {
            const response = await fetch(IDS_URL)
            if (!response.ok) throw Error('Did not receive expected id')
            const result = await response.json()
            setId(result)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchId()
    })
    const handleAdd = async () => {
        if (name !== '') {
            // add the item to the list
            setList(prevList => prevList.concat(listItem))
            setName('')
            // update the restAPI
            const result = await apiRequest(ITEMS_URL, postOptions)
            if (result) {
                console.error(result)
                setError(result)
            }
        }
    }
    // deleting
    const handleDelete = () => {
        removeLastItemFromList()
        makeDeleteRequest()
    }
    // deleting via delete button 
    document.body.addEventListener('keypress', e => {
        if (e.key.charCodeAt() === 68) {
            handleDelete()
        }
    })

    return (
        <main>
            {/* if error is not null , then display the error and nothing else */}
            <div className='container'>
                {(error !== null) ? <p className='errorParagraph'>{error}</p> :
                    <>
                        <SearchInput setSearchedItem={setSearchedItem} searchedItem={searchedItem} />
                        <div>
                            <ItemInput handleDelete={handleDelete} listItem={listItem} name={name} setName={setName} handleAdd={handleAdd} />
                            <AddButton handleAdd={handleAdd} />
                        </div>
                        <ol ref={olRef}>{filteredList.map(el => <li key={Math.random()}>{el.name}</li>)}</ol>
                        <RemoveButton handleDelete={handleDelete} /><ColorSetter olRef={olRef} />
                    </>
                }
            </div>
        </main>
    )
}