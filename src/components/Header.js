import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import '../css/Header.css'

import logoImg from '../images/logo.svg';
import profileImg from '../images/profile.svg'
import navMinImg from '../images/nav-minimize.svg'
import navMaxImg from '../images/nav-maximize.svg'
import navCloseImg from '../images/nav-close.svg'

function Header(props) {

    const { ipcRenderer, shell } = window.require('electron')
    const { pathname } = useLocation();

    const openExternalLink = (url) => {
        shell.openExternal(url);
    };

    return (
        <div>
            <header>
                <div className='header'>
                    <div className='header logo'>
                        <img src={logoImg} alt='logo'></img>
                    </div>

                    <nav className='navigation'>
                        <NavLink
                            to={['/', '/img-bg'].includes(pathname) ? null : '/'}
                            className={['/', '/img-bg'].includes(pathname) ? 'active' : ''}
                        >AI Remove background</NavLink>
                        <NavLink to="/tools" className={({isActive}) => {
                            return isActive ? 'active' : ''
                        }}>AI tools (others)</NavLink>
                    </nav>

                    <div className='profile'>
                        {props.user && (<div className='nav-profile-credit' style={{cursor: 'pointer'}} onClick={() => openExternalLink('http://www.dandycv.com/pricing')}> &copy; {props.user.subscriptionDetail.credits}</div>)}
                        <img src={profileImg} alt='profileImg' style={{cursor: 'pointer'}} onClick={() => props.setLoginTrigger(true)} />

                        <div className='nav-minmax' id='minimizeBtn' onClick={() => ipcRenderer.send('minimizeApp')}>
                            <img src={navMinImg} alt='minimize' />
                        </div>

                        <div className='nav-minmax' id='maximizeBtn' onClick={() => ipcRenderer.send('maximizeApp')}>
                            <img src={navMaxImg} alt='maximize' />
                        </div>

                        <div className='nav-minmax' id='closeBtn' onClick={() => ipcRenderer.send('closeApp')}>
                            <img src={navCloseImg} alt='close' />
                        </div>
                    </div>

                </div>
            </header>
        </div>
    )
}

export default Header