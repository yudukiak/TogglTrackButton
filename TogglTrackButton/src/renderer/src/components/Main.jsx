import { useContext } from 'react'

import { ApiTokenContext } from './ApiToken'

export default function Main() {
  const [apiToken, setApiToken] = useContext(ApiTokenContext)
  return (
    <main className="w-full px-4 mx-auto max-w-7xl">
      API Token
      <div>{apiToken}</div>
    </main>
  )
}