import React from 'react'

import '../css/Footer.css'

import settingsImg from '../images/settings.svg'



function Footer(props) {

  const { shell } = window.require('electron');

  const openExternalLink = (url) => {
    shell.openExternal(url);
  };

  return (
    <div className='footer'>
      <div className="footer-left-side">
          <div className="footer-settings-wrapper" onClick={() => props.setSettingsTrigger(true)}>
              <img src={settingsImg} alt="" />
              <div style={{marginLeft: '6px'}}>Settings</div>
          </div>
      </div>

      <div className="footer-center">
          <div className="footer-center-link" onClick={() => openExternalLink('http://www.dandycv.com')}>dandycv</div>
          <div className="vr"></div>
          <div className="footer-center-link" onClick={() => openExternalLink('http://www.dandycv.com/notices')}>notice</div>
          <div className="vr"></div>
          <div className="footer-center-link" onClick={() => openExternalLink('http://www.dandycv.com/FAQs')}>FAQ</div>
          {/* <div className="vr"></div>
          <div className="footer-center-link" onClick={() => openExternalLink('http://www.dandycv.com/blog')}>blog</div> */}
      </div>

      <div className="footer-right-side">
          Copyright &copy;2023 dandycv
      </div>
    </div>
  )
}

export default Footer