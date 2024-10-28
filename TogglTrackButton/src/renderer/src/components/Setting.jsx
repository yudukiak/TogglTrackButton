import { useContext, useState } from 'react'
import { Badge, Button, Label, TextInput } from 'flowbite-react'

import { ApiTokenContext } from './ApiToken'

async function fetch(authorization) {

  const method = 'GET'
  const url = 'https://api.track.toggl.com/api/v9/me'
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': authorization
  }
  // preload.jsへ
  const response = await window.api.fetch(method, url, headers)
  return response
}

export default function Setting() {
  const [apiToken, setApiToken] = useContext(ApiTokenContext)

  // 仮保存
  const [token, setToken] = useState(null)

  // ログインしているか、していないか
  const [isLogged, setIsLogged] = useState(false)
  // ログイン中か、そうでないか
  const [isLogging, setIsLogging] = useState(false)
  // ログインエラーが起きているか
  const [isLoginError, setIsLoginError] = useState(false)
  // ログイン結果のオブジェクト
  const [loginObject, setLoginObject] = useState({})

  const handleSubmit = event => {
    // イベントをキャンセル
    event.preventDefault()
    // ログイン中にする
    setIsLogging(true)
    // Authorizationを作成
    const uriEncodedString = encodeURIComponent(token)
    const base64EncodedString = btoa(`${uriEncodedString}:api_token`)
    const authorization = `Basic ${base64EncodedString}`
    // APIチェック
    fetch(authorization).then(res => {
      console.log('👘 - fetch - res:', res)
      // レスポンスを保存
      setLoginObject(res)
      // レスポンスで処理する
      const success = res.success
      // ログインしているか？
      setIsLogged(success)
      // ログイン中か
      setIsLogging(false)
      // ログインエラーか
      setIsLoginError(!success)
      // Tokenを保存
      if (success) {
        setApiToken(token)
        localStorage.setItem('apiToken', token)
      }
    })
  }
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div>
        API Tokenは
        <a
          href="https://track.toggl.com/profile#api-token-label"
          className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
          target="_blank"
        >
          Toggl track - My Profile
        </a>
        より確認できます。
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="API Token" />
        </div>
        <TextInput
          id="email1"
          type="password"
          placeholder="dG9nZ2wgdHJhY2sgYXBpIHRva2Vu"
          value={apiToken ? apiToken : ''}
          required
          helperText={isLogged || apiToken ? 'ログイン済み' : isLoginError ? 'ログインエラー' : '未ログイン'}
          onChange={event => setToken(event.target.value)}
          color={isLogged || apiToken ? 'success' : isLoginError ? 'failure' : 'gray'}
        />
      </div>
      {
        isLogging
          ? <Button isProcessing disabled>確認中</Button>
          : <Button type="submit">保存する</Button>
      }

    </form>
  )
}