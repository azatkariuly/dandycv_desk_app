import React, { useState } from 'react'
import axios from 'axios';
import '../css/LoginPopup.css'

import logoImg from '../images/login_logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function LoginPopup(props) {
    const { ipcRenderer } = window.require('electron')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [visible, setVisible] = useState(false)

    const [loading, setLoading] = useState(false)

    async function checkLogin(email, password, rememberme) {
        setLoading(true)

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post(
                'https://www.dandycv.com/base/api/users/login/',
                { 'username': email, 'password': password },
                config
            )

            if (rememberme) {
                localStorage.setItem('userInfo', JSON.stringify(data))
            }
            props.setUser(JSON.parse(JSON.stringify(data)))
            props.setTrigger(false)


        } catch (err) {
            // handleLogout()
            console.log(err)
        }

        setLoading(false)
    }

    const handleLogin = (event) => {
        event.preventDefault();
        checkLogin(email, password, props.rememberMe)
    }

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('userInfo')
        setEmail('')
        setPassword('')
        props.setUser(null)
    }

    const handleCancel = (event) => {
        event.preventDefault();
        if (props.user) {
            props.setTrigger(false)  
        } else {
            ipcRenderer.send('closeApp')
        }
    }

    return (props.trigger) ? (
        <div className='popup-login-overlay'>
            <div className='popup-login-content'>
                <div className="popup-login-title">
                    <img src={logoImg} alt="" height="30px" width="30px" />
                    <span>dandycv</span>
                </div>

                <div className="hr" style={{marginLeft: '23px', marginRight: '23px'}}></div>

                <div className='popup-login-form'>
                    <div className='popup-login-form-content'>
                        {props.user ? (
                            <div className='popup-logout-form-content'>
                                Hello, {props.user.email} <br></br>
                                Thank you for using dandycv
                            </div>
                        ) : (
                            <>
                                <label for="email">Username or Email</label>
                                <input className="popup-login-form-input" type="text" id='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                                <label for="password">Password</label>
                                <div>
                                    <input className="popup-login-form-input" type={visible ? "text" : "password"} id='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} style={{color: '#A6A6A6', marginLeft: (visible ? '-32px' : '-33px'), cursor: 'pointer'}} onClick={() => setVisible(visibility => !visibility)}/>
                                </div>

                                <div style={{marginTop: '10px', marginLeft: '18px', display: 'flex'}}>
                                    <input type="checkbox" id="rememberme" name='rememberme' checked={props.rememberMe} onChange={() => props.setRememberMe((prev) => !prev)}/>
                                    <label style={{color: '#A6A6A6', marginTop: '6.5px', marginLeft: '8px', fontSize: '14px'}} >
                                        Keep me signed in
                                    </label>
                                </div>
                            </>
                        )}
                        

                        

                        <div className="popup-login-form-btns">
                            {props.user ? (
                                <button type='button' className="popup-login-login-btn" onClick={handleLogout}>Logout</button>
                            ) : (
                                <button type="button" className="popup-login-login-btn" onClick={handleLogin}>Login</button>
                            )}
                            
                            <button type="button" className="popup-login-close-btn" onClick={handleCancel}>Close</button>
                        </div>

                        {loading && (
                            <div className='loader-wrapper'>
                                <span className="loader"></span>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    ) : "";
}

export default LoginPopup