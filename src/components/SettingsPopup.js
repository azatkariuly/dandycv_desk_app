import React, { useState } from 'react'

import '../css/SettingsPopup.css'

function SettingsPopup(props) {

    const [saveJPG, setSaveJPG] = useState(props.saveImgTypeIsJPG)

    const handleSave = () => {
        localStorage.setItem('selectedImgTypeIsJPG', saveJPG)
        props.setSaveImgTypeIsJPG(saveJPG)
        props.setTrigger(false)
    }

    const handleCancel = () => {
        setSaveJPG(props.saveImgTypeIsJPG)
        props.setTrigger(false)
    }

    return (props.trigger) ? (
        <div className='popup-settings-overlay'>
            <div className='popup-settings-content'>
                <div className="popup-settings-title">Settings</div>
                <div className='hr' style={{marginLeft: '22px', marginRight: '22px'}} />

                <div className="popup-settings-content-inner">
                    
                    <label className="popup-settings-content-label" >
                        <input
                            type="checkbox"
                            checked={saveJPG}
                            onChange={() => setSaveJPG(true)}
                        />
                        JPG
                    </label>

                    <label className="popup-settings-content-label" >
                        <input
                            type="checkbox"
                            checked={!saveJPG}
                            onChange={() => setSaveJPG(false)}
                        />
                        PNG
                    </label>
                </div>

                <div className="settings-buttons">
                    <button type='button' className="settings-btn-save" onClick={handleSave}>
                        Save
                    </button>
                    <button type='button' className="settings-btn-cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    ) : ""
}

export default SettingsPopup