import { VscChromeClose, VscChromeMinimize, VscSettingsGear } from 'react-icons/vsc'
import { DarkThemeToggle, Modal } from 'flowbite-react'
import { useState } from 'react'

import Setting from './Setting'

export default function Header() {
  return (
    <header className="h-8 flex justify-between bg-white dark:bg-gray-950 drop-shadow	relative z-50 select-none">
      <div className="flex justify-center items-center text-xs ml-2" data-app-name>appName</div>
      <div className="flex">
        <SettingMenu />
        <DarkThemeToggle className='w-12 h-full p-0 flex justify-center items-center rounded-none focus:ring-0 focus:outline-none' />
        <WindowMinimize />
        <WindowClose />
      </div>
    </header>
  )
}

/**
 * 設定を開く
 */
function SettingMenu() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <button
        className="
          w-12 h-full flex justify-center items-center
        text-gray-500 hover:bg-gray-100 
        dark:text-gray-400 dark:hover:bg-gray-700"
        onClick={() => setOpenModal(true)}
      >
        <VscSettingsGear />
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>設定</Modal.Header>
        <Modal.Body>
          <Setting />
        </Modal.Body>
      </Modal>
    </>
  )
}

function WindowMinimize() {
  const ipcWindowMinimize = () => window.electron.ipcRenderer.send('windowMinimize')
  return (
    <button
      id="window-minimize"
      className="
        w-12 h-full flex justify-center items-center
      text-gray-500 hover:bg-gray-100 
      dark:text-gray-400 dark:hover:bg-gray-700"
      onClick={ipcWindowMinimize}
    >
      <VscChromeMinimize />
    </button>
  )
}

function WindowClose() {
  const ipcWindowClose = () => window.electron.ipcRenderer.send('windowClose')
  return (
    <button
      id="window-close"
      className="
        w-12 h-full flex justify-center items-center
      text-gray-500 hover:bg-red-700 hover:text-gray-100
      dark:text-gray-100 dark:hover:bg-red-700"
      onClick={ipcWindowClose}
    >
      <VscChromeClose />
    </button>
  )
}