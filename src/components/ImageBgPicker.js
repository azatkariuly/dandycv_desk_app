import React, { useRef } from 'react'

import '../css/ImageBgPicker.css'

import addBtn from '../images/img-picker/add-button.svg'
import imageIndicatorImg from '../images/img-picker/img-indicator.svg'

import img0 from '../images/img-picker/img0.svg'
import img1 from '../images/img-picker/img1.svg'
import img2 from '../images/img-picker/img2.svg'
import img3 from '../images/img-picker/img3.svg'
import img4 from '../images/img-picker/img4.svg'
import img5 from '../images/img-picker/img5.svg'
import img6 from '../images/img-picker/img6.svg'
import img7 from '../images/img-picker/img7.svg'
import img8 from '../images/img-picker/img8.svg'
import img9 from '../images/img-picker/img9.svg'
import img10 from '../images/img-picker/img10.svg'
import img11 from '../images/img-picker/img11.svg'
import img12 from '../images/img-picker/img12.svg'
import img13 from '../images/img-picker/img13.svg'
import img14 from '../images/img-picker/img14.svg'
import img15 from '../images/img-picker/img15.svg'
import img16 from '../images/img-picker/img16.svg'
import img17 from '../images/img-picker/img17.svg'

function ImageBgPicker(props) {
  const images = [
    { id: 0, value: img0 },
    { id: 1, value: img1 },
    { id: 2, value: img2 },
    { id: 3, value: img3 },
    { id: 4, value: img4 },
    { id: 5, value: img5 },
    { id: 6, value: img6 },
    { id: 7, value: img7 },
    { id: 8, value: img8 },
    { id: 9, value: img9 },
    { id: 10, value: img10 },
    { id: 11, value: img11 },
    { id: 12, value: img12 },
    { id: 13, value: img13 },
    { id: 14, value: img14 },
    { id: 15, value: img15 },
    { id: 16, value: img16 },
    { id: 17, value: img17 },
  ]

  const inputRef = useRef()

  const handleCustomImageClick = (event) => {
    props.setSavedImg({'custom': event.target.files[0]})
  }

  const handleImageClick = (e) => {
    localStorage.setItem('selectedImage', [e.value, e.id])
    props.setSavedImg({'default': e.value, 'id': e.id})
  };

  return (
    <div className='picker-main'>
        <p>Picture</p>
        <ul>
          <input
            type='file'
            accept='image/*'
            onChange={handleCustomImageClick}
            hidden
            ref={inputRef}
          />
          <li
            className='bg-chooser'
            onClick={() => inputRef.current.click()}
          >
            <img src={addBtn} alt=''></img>
          </li>

          {images.map(image => (
            <li
              key={image.id}
              onClick={() => handleImageClick(image)}
            >
              <img src={image.value} alt='bg' />
            </li>
          ))}

          <li className='img-item-display'>
            <img id="img-item-display" src={('custom' in props.savedImg ? URL.createObjectURL(props.savedImg.custom) : (props.savedImg.default ? props.savedImg.default : img0) )} alt="Not found" />

            <div className="item-indicator">
              <img src={imageIndicatorImg} alt="" />
            </div>
          </li>
        </ul>
    </div>
  )
}

export default ImageBgPicker