import React from 'react'
import '../css/ErrorPopup.css'

function ErrorPopup(props) {

    return (props.trigger) ? (
        <div className='popup-error-overlay'>
            <div className='popup-error-content'>
                <div className="popup-error-title">Alarm</div>
                <div className='hr' style={{marginLeft: '22px', marginRight: '22px'}} />

                <div className='popup-error-message'>
                    {props.errorMessage}
                </div>

                <button type='button' className="popup-error-btn" onClick={() => props.setTrigger(false)}>OK</button>
            </div>
        </div>
    ) : "";
}

export default ErrorPopup