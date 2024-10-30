import { createContext, useState } from 'react'

export const ApiTokenContext = createContext()

export const ApiTokenProvider  = ({ children }) => {
  // 設定があれば
  const localApiToken = localStorage.getItem('apiToken')
  const [apiToken, setApiToken] = useState(localApiToken ? localApiToken : '')

  return (
    <ApiTokenContext.Provider value={[apiToken, setApiToken]}>
      {children}
    </ApiTokenContext.Provider>
  )
}

// Authorizationを作成
export const ApiTokenAuthorization = (token) => {
  const uriEncodedString = encodeURIComponent(token)
  const base64EncodedString = btoa(`${uriEncodedString}:api_token`)
  const authorization = `Basic ${base64EncodedString}`
  return authorization
}

export const fetch = async (method, path, authorization) => {
  const url = `https://api.track.toggl.com/api/v9/${path}`
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': authorization
  }
  const options = { method, headers }
  // preload.jsへ
  const response = await window.api.fetch(url, options)
  return response
}