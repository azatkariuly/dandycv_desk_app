import React, { useState } from 'react'


import '../css/ColorPicker.css'

import colorPickerImg from '../images/img-picker/color0.svg'
import transparentImg from '../images/img-picker/transparent.svg'
import transparentDisplayImg from '../images/img-picker/transparent-display.svg'
import colorIndicatorImg from '../images/img-picker/color-indicator.svg'
import ColorPickerPopup from './ColorPickerPopup'

function ColorPicker(props) {

  const [colorPickerPopup, setColorPickerPopup] = useState(false)
  const [hexColorInput, setHexColorInput] = useState(props.savedColor)

  const colors = [
    { style: {backgroundColor: '#FFFFFF', border: '1px solid rgba(153, 153, 153, 0.30)'} },
    { style: {backgroundColor: '#FF5A5A'} },
    { style: {backgroundColor: '#FF825A'} },
    { style: {backgroundColor: '#FFB35A'} },
    { style: {backgroundColor: '#FFDB5A'} },
    { style: {backgroundColor: '#B4D965'} },
    { style: {backgroundColor: '#00AF31'} },
    { style: {backgroundColor: '#82DCE1'} },
    { style: {backgroundColor: '#00A3FF'} },
    { style: {backgroundColor: '#073EA8'} },
    { style: {backgroundColor: '#AC82E1'} },
    { style: {backgroundColor: '#D482E1'} },
    { style: {backgroundColor: '#AD00FF'} },
    { style: {backgroundColor: '#FF94DB'} },
    { style: {backgroundColor: '#C6AB83'} },
    { style: {backgroundColor: '#B6B6B6'} },
    { style: {backgroundColor: '#000000'} },
  ]

  const handleColorClick = (value) => {
    if (value === 'transparent') {
      props.setSavedColor(null)
      localStorage.removeItem('selectedColor')
    } else {
      props.setSavedColor(value)
      setHexColorInput(value)
      localStorage.setItem('selectedColor', value)
    }
  };

  const handleHexInputChange = (event) => {
    var hexRegex = /^[0-9A-Fa-f]*$/; // Regular expression for hex color

    if (!hexRegex.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9A-Fa-f]/g, '');
    }

    event.target.value = '#' + event.target.value

    setHexColorInput(event.target.value)

    if (event.target.value.length === 7) {
      props.setSavedColor(event.target.value)
      localStorage.setItem('selectedColor', event.target.value)
    }
  }

  return (
    <div className='picker-main'>
        <p>Color</p>

        <ul>
          <li key={'transparent'} onClick={() => handleColorClick('transparent')}>
            <img src={transparentImg} alt='transparent' />
          </li>
          <li key={'colorPicker'} onClick={() => setColorPickerPopup(true)}>
            <img src={colorPickerImg} alt='transparent' />
          </li>

          {colors.map(color => (
            <li
              key={color.style.backgroundColor}
              style={color.style}
              onClick={() => handleColorClick(color.style.backgroundColor)}
            />
          ))}

          {props.savedColor ? (
            <>
              <li className='color-item-display' style={{background: props.savedColor}}>
                  <div className='item-indicator'>
                    <img src={colorIndicatorImg} alt=''></img>
                  </div>
                </li>

                <li className='color-item-value'>
                  <input type="text" maxLength="7" value={hexColorInput} onChange={handleHexInputChange} style={{textTransform: 'uppercase'}}/>
                </li>
            </>
          ) : (
            <li className="color-item-display-transparent" id="color-item-display-transparent">
              <img src={transparentDisplayImg} alt='transparentDisplay' />

              <div className="item-indicator">
                <img src={colorIndicatorImg} alt="colorIndicator" />
              </div>
            </li>
          )}
          
        </ul>

        <ColorPickerPopup
          trigger={colorPickerPopup} setTrigger={setColorPickerPopup}
          savedColor={props.savedColor} setSavedColor={props.setSavedColor} 
          hexColorInput={hexColorInput} setHexColorInput={setHexColorInput}
        />
    </div>
  )
}

export default ColorPicker