import React, { useRef, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'


import TableDrop from '../components/TableDrop'


import colorPickerImg from '../images/icon1.svg'
import colorPickerImgPressed from '../images/icon11.svg'
import imageBgPickerImg from '../images/icon2.svg'
import imageBgPickerImgPressed from '../images/icon22.svg'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function HomeScreen(props) {
  const { ipcRenderer } = window.require('electron')
  const fs = window.require('fs');
  var path = window.require('path');

  const [isRunning, setIsRunning] = useState(false)
  const liveRunning = useRef(false)
  const [colorPickerPressed, setColorPickerPressed] = useState(true)

  function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
  
    // Convert the hex value to integers
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return [r, g, b];
  }

  const handleSavePathChange = () => {
    ipcRenderer.invoke('open-folder-dialog').then((folderPath) => {
      if (folderPath) {
        localStorage.setItem('selectedPath', folderPath)
        props.setSavePath(folderPath)
      }
    })
  }

  function processImage(image, rgbParam, imgBg, customBg) {
    return new Promise((resolve, reject) => {
        const fileName = path.parse(image.path).base.split('.')

        const formData = new FormData();
        formData.append('username', props.user.username);
        formData.append('image', image);

        if (rgbParam) {
          formData.append('rgbVal', rgbParam);
        }
        if (imgBg) {
          formData.append('bgImage', imgBg);
        }        
        if (customBg) {
          formData.append('customImage', customBg);
        }

        axios.post(
          'https://www.dandycv.com/remove_background/api/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then(response => {
            const modifiedImage = response.data.modifiedImage;
            const modifiedImageData = Buffer.from(modifiedImage, 'base64')

            var fileType = props.saveImgTypeIsJPG ? 'jpg' : 'png'

            fs.writeFileSync(path.join(props.savePath, fileName[0] + '_dandycv.' + fileType), modifiedImageData)

            resolve()
        })
        .catch(error => {
            reject(error)
            props.setErrorMessage('Server connection lost. Try again later')
            props.setErrorPopup(true)
        })
    })
}

const handleStop = () => {
  setIsRunning(false)
  liveRunning.current = false
}

const handleStart = () => {

  if (!fs.existsSync(props.savePath)) {
    props.setErrorMessage('Setup path is not found on this device')
    props.setErrorPopup(true)
    return
  }
  
  setIsRunning(true)
  liveRunning.current = true;

  var rgb = null;
  var imgBg = null;
  var customBg = null;

  if (window.location.href.includes('img-bg')) {
    if ('custom' in props.savedImg) {
      imgBg = props.savedImg.custom
    } else {
      if (props.savedImg.id !== null) {
        customBg = props.savedImg.id
      } else {
        customBg = 0
      }
    }
  } else if (props.savedColor) {
    rgb = hexToRgb(props.savedColor)
  }

  (async function() {
    try {
      for (var i=0; i<props.files.length; i++) {
        if (!fs.existsSync(props.files[i].path)) {
          props.setErrorMessage('Image file is not found on this device')
          props.setErrorPopup(true)
          handleStop()
          return
        }
        
        if (!liveRunning.current) {
          break;
        } else if (!props.files[i].done) {
          props.files[i].process = <FontAwesomeIcon icon={faSpinner} spin/>
          props.setFiles([...props.files])

          await processImage(props.files[i], rgb, imgBg, customBg)

          props.files[i].done = true
          props.setFiles([...props.files])
        }
      }
      handleStop();
    } catch (error) {
      // console.log(error)
      props.files[i].process = ''
      props.setErrorMessage('Network connection error. Try again later')
      props.setErrorPopup(true)
      handleStop();
    }
  })()
}

const handleDeleteSelected = () => {
  props.setFiles(props.files.filter((file, idx) => !props.selectedRows.includes(idx)))
  props.setSelectedRows([]); // Clear selected rows after deletion
  props.setSelectAll(false)
};

  return (
    <div className='main'>
      <div
        className="dropzone"
      >
        <TableDrop
          files={props.files} setFiles={props.setFiles}
          selectedRows={props.selectedRows} setSelectedRows={props.setSelectedRows}
          selectAll={props.selectAll} setSelectAll={props.setSelectAll}
          setErrorMessage={props.setErrorMessage} setErrorPopup={props.setErrorPopup}
        />
      </div>
      <div className="picker">
        <div className='picker-buttons'>
          <div className='img-picker'>
            <Link to={'/'} onClick={() => setColorPickerPressed(true)}>
              {colorPickerPressed ? (
                <img src={colorPickerImgPressed} alt=''/>
              ) : (
                <img src={colorPickerImg} alt=''></img>
              )}
            </Link>

            <Link to={'/img-bg'} onClick={() => setColorPickerPressed(false)}>
              {colorPickerPressed ? (
                <img src={imageBgPickerImg} alt=''/>
              ) : (
                <img src={imageBgPickerImgPressed} alt=''></img>
              )}
            </Link>
          </div>

          <div className='btn-picker'>
            <button type='button' className={props.selectedRows.length === 0 ? 'btn-disabled' : 'btn-active'} onClick={handleDeleteSelected}>{props.selectedRows.length === props.files.length ? 'Delete All' : 'Delete'}</button>
            {isRunning ? (
              <button type='button' className='btn-stop' onClick={handleStop}>Stop</button>
            ) : (
              <button type='button' className={props.files.length === 0 ? 'btn-disabled' : 'btn-active'} onClick={handleStart}>Start</button>
            )}
          </div>
        </div>

        <div className='hr2'>
        </div>
        

        <div>
          <Outlet />
        </div>

        <div className="pathPicker">
          <p>Output Folder</p>

          <div className="pathDir" onClick={handleSavePathChange}>
            {props.savePath}
          </div>
        </div>

      </div>
    </div>
  )
}

export default HomeScreen