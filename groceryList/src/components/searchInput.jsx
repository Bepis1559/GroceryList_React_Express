// https://dev.to/salehmubashar/search-bar-in-react-js-545l
import { useEffect, useState } from 'react'
import { CheckSpace } from '../helpers/CheckSpace'
export const SearchInput = ({ searchedItem, setSearchedItem }) => {
    const [indefiniteArticle, setIndefiniteArticle] = useState('an')
    const handleSearchInput = event => setSearchedItem(event.target.value.toLowerCase())
    useEffect(() => {
        // https://regexr.com/
        const vowelCheck = /^[aieou]/gi
        let result = vowelCheck.test(searchedItem)
        return result || searchedItem === '' ? setIndefiniteArticle('an') : setIndefiniteArticle('a')
    }, [searchedItem])
    return (
        <>
            <label htmlFor="search">Search for {indefiniteArticle} : </label>
            <input onKeyDown={CheckSpace} placeholder="apple" onChange={handleSearchInput} value={searchedItem} id="search" name="search" type="text" />
        </>
    )
}
