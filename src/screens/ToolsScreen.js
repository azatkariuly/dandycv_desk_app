import React from 'react'

function ToolsScreen() {

  const { shell } = window.require('electron');

  const openExternalLink = (url) => {
    shell.openExternal(url);
  };
  
  return (
    <div className='tools'>
      <div className='tools-container'>
        <div className="tools-title">AI TOOLS</div>
        <div className="tools-content">Coming Soon Content page</div>
        <div className="tools-info">
          We are preparing the page to provide better service We will <br></br>
          prepare and visit you as soon as possible
        </div>

        <button className="tools-btn" onClick={() => openExternalLink('http://www.dandycv.com')}>dandycv.com</button>
      </div>
      {/* 


      */}
    </div>
  )
}

export default ToolsScreen