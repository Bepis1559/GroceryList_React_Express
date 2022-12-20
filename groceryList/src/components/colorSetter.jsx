import { useState } from "react"
export const ColorSetter = ({ olRef }) => {
    const [color, setColor] = useState('white')
    function changeColour(event) {
        const eventTargetValue = event.target.value
        setColor(eventTargetValue)
        const isColourValid = CSS.supports('color', eventTargetValue)
        return isColourValid ? olRef.current.style.color = eventTargetValue : olRef.current.style.color = 'white'
    }
    return (
        <>
            <label htmlFor="colorInput">Set color to : </label>
            <input name='colorInput' id='colorInput' placeholder={color} onChange={changeColour} type="text" />
        </>
    )
}