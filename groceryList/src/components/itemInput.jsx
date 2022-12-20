import { useEffect, useState } from "react"
import { CheckSpace } from "../helpers/CheckSpace"

export const ItemInput = ({ listItem, handleAdd, name, setName, handleDelete }) => {

    // const handleInputChange = event => setListItem(event.target.value)
    const handleInputChange = event => {
        setName(event.target.value)
        listItem.name = name
    }
    // handling indefiniteArticle
    const [indefiniteArticle, setIndefiniteArticle] = useState('an')
    useEffect(() => {
        const vowelCheck = /^[aieou]/gi
        let result = vowelCheck.test(name)
        return result || name === '' ? setIndefiniteArticle('an') : setIndefiniteArticle('a')
    }, [name])
    const handleOnKeyDown = e => {
        // do not allow spaces
        CheckSpace(e)
        if (e.key.charCodeAt() === 69) { // Add an item also on enter click
            handleAdd()
        } else if (e.key.charCodeAt() === 68) {
            handleDelete()
        }
    }
    return (
        <form className="inlineForm" onSubmit={e => e.preventDefault()} action="">
            <label htmlFor="itemInput">Add {indefiniteArticle} : </label>
            <input onKeyDown={handleOnKeyDown} placeholder="apple" name="itemInput" id="itemInput" autoFocus value={name} type="text" onChange={handleInputChange} />
        </form>
    )
}