import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import LoginPopup from './components/LoginPopup'

import HomeScreen from './screens/HomeScreen'
import ToolsScreen from './screens/ToolsScreen'
import ColorPicker from './components/ColorPicker';
import ImageBgPicker from './components/ImageBgPicker';
import { useEffect, useState } from 'react';
import SettingsPopup from './components/SettingsPopup';
import ErrorPopup from './components/ErrorPopup'

function App() {
  const { ipcRenderer } = window.require('electron')

  const [user, setUser] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
  const [loginPopup, setLoginPopup] = useState(user ? false : true)
  const [settingsPopup, setSettingsPopup] = useState(false)
  const [errorPopup, setErrorPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Main varibales
  const [files, setFiles] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllRows, setSelectAllRows] = useState(false);

  const [savedImg, setSavedImg] = useState({
    'default': localStorage.getItem('selectedImage') ? localStorage.getItem('selectedImage').split(',')[0] : null,
    'id': localStorage.getItem('selectedImage') ? localStorage.getItem('selectedImage').split(',')[1] : null
  })

  const [savedColor, setSavedColor] = useState(localStorage.getItem('selectedColor'))
  const [savePath, setSavePath] = useState(localStorage.getItem('selectedPath') ? localStorage.getItem('selectedPath') : ipcRenderer.sendSync('retrieveAutomaticPath'))
  const [saveImgTypeIsJPG, setSaveImgTypeIsJPG] = useState(localStorage.getItem('selectedImgTypeIsJPG') === 'true' ? true : false)
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    console.log('user', user)
  }, [user])


  return (
    <div className='container'>
    <Router>
        <Header setLoginTrigger={setLoginPopup} user={user} />

        <Routes>
          <Route path='/' element={
            <HomeScreen
              savedColor={savedColor} savedImg={savedImg}
              files={files} setFiles={setFiles}
              selectedRows={selectedRows} setSelectedRows={setSelectedRows}
              selectAll={selectAllRows} setSelectAll={setSelectAllRows}
              savePath={savePath} setSavePath={setSavePath}
              saveImgTypeIsJPG={saveImgTypeIsJPG}
              user={user} rememberMe={rememberMe}
              setErrorMessage={setErrorMessage} setErrorPopup={setErrorPopup} />}
          >
            <Route path='' element={
              <ColorPicker savedColor={savedColor} setSavedColor={setSavedColor} />} />
            <Route path='/img-bg' element={
              <ImageBgPicker savedImg={savedImg} setSavedImg={setSavedImg} />} />
          </Route>
          <Route path='/tools' element={<ToolsScreen />} />
        </Routes>

        <Footer setSettingsTrigger={setSettingsPopup}/>

        <LoginPopup trigger={loginPopup} setTrigger={setLoginPopup}
          user={user} setUser={setUser}
          rememberMe={rememberMe} setRememberMe={setRememberMe} />
        <SettingsPopup trigger={settingsPopup} setTrigger={setSettingsPopup}
          saveImgTypeIsJPG={saveImgTypeIsJPG} setSaveImgTypeIsJPG={setSaveImgTypeIsJPG}
        />
        <ErrorPopup trigger={errorPopup} setTrigger={setErrorPopup} errorMessage={errorMessage} />
      </Router>
    </div>
  );
}

export default App;
