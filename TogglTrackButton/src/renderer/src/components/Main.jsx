import { useContext, useEffect, useState } from 'react'

import { ApiTokenContext, ApiTokenAuthorization } from './ApiToken'

async function fetch(method, path, authorization) {
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

export default function Main() {
  const [apiToken, setApiToken] = useContext(ApiTokenContext)
  const [projects, setProjects] = useState([])

  // apiTokenに変更があった場合にfetchProjectsを実行
  useEffect(() => {
    // クリーンアップ関数
    // https://ja.react.dev/learn/synchronizing-with-effects#fetching-data
    let ignore = false
    // プロジェクトを取得する関数
    const loadProjects = async () => {
      if (!apiToken || ignore) return
      // authorizationを作成
      const authorization = ApiTokenAuthorization(apiToken)
      // ワークスペースIDを取得
      const { data: meData } = await fetch('GET', 'me', authorization)
      console.log('👘 - fetchProjects - meData:', meData)
      const workspace_id = meData.default_workspace_id
      // コンポーネントがアンマウントされていたら中断
      if (ignore) return
      // プロジェクトを取得
      const { data: projectsData } = await fetch('GET', `workspaces/${workspace_id}/projects`, authorization)
      console.log('👘 - fetchProjects - projectsData:', projectsData)
      // アンマウントされていない場合のみ更新
      if (!ignore) setProjects(projectsData)
    }
    loadProjects()
    return () => ignore = true
  }, [apiToken])

  return (
    <main className="w-full px-4 mx-auto max-w-7xl">
      API Token
      <div>{apiToken}</div>
      <hr />
      {
        projects && projects.map((project, index) => {
          return (
              <p key={index}>project.name：{project.name}</p>
          )
        })
      }
    </main>
  )
}