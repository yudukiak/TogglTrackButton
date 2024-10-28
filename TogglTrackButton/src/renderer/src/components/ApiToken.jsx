import { createContext, useState } from 'react'

export const ApiTokenContext = createContext()

export const ApiTokenProvider  = ({ children }) => {
  // 設定があれば
  const localApiToken = localStorage.getItem('apiToken')
  const [apiToken, setApiToken] = useState(localApiToken ? localApiToken : null)

  return (
    <ApiTokenContext.Provider value={[apiToken, setApiToken]}>
      {children}
    </ApiTokenContext.Provider>
  )
}