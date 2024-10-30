import { useContext, useEffect, useState } from 'react'

import { ApiTokenContext, apiTokenAuthorization, fetch } from './Api'
import AvatarCard from './AvatarCard'
import ProjectCard from './ProjectCard'
import TimerCard from './TimerCard'

export default function Main() {
  const [apiToken, setApiToken] = useContext(ApiTokenContext)
  const [me, setMe] = useState({ email: '設定よりログインしてください', fullname: '未ログイン', image_url: '' })

  const [projects, setProjects] = useState([])
  const [currentProject, setCurrentProject] = useState({})

  // apiTokenに変更があった場合にfetchProjectsを実行
  useEffect(() => {
    // クリーンアップ関数
    // https://ja.react.dev/learn/synchronizing-with-effects#fetching-data
    let ignore = false
    // プロジェクトを取得する関数
    const loadProjects = async () => {
      if (!apiToken || ignore) return
      // authorizationを作成
      const authorization = apiTokenAuthorization(apiToken)
      // ワークスペースIDを取得
      const { data: meData } = await fetch('GET', 'me', authorization)
      // アンマウントされていない場合のみ更新
      if (!ignore) setMe(meData)
      const workspace_id = meData.default_workspace_id
      // コンポーネントがアンマウントされていたら中断
      if (ignore) return
      // プロジェクトを取得
      const { data: projectsData } = await fetch('GET', `workspaces/${workspace_id}/projects`, authorization)
      // アンマウントされていない場合のみ更新
      if (!ignore) setProjects(projectsData)
      // 今動いてるプロジェクトを取得
      const { data: currentData } = await fetch('GET', 'me/time_entries/current', authorization)
      // 動いてるプロジェクトがない場合は処理しない
      if (currentData === null) return
      // アンマウントされていない場合のみ更新
      if (!ignore) setCurrentProject(currentData)
    }
    loadProjects()
    return () => ignore = true
  }, [apiToken])

  const handleCurrentProject = currentData => setCurrentProject(currentData)

  return (
    <main className="grid grid-cols-2 gap-4 p-4">
      <ProjectCard
        projects={projects}
        currentProject={currentProject}
        onCurrentProject={handleCurrentProject}
      />
      <AvatarCard me={me} />
      <TimerCard
        projects={projects}
        currentProject={currentProject}
        onCurrentProject={handleCurrentProject}
      />
    </main>
  )
}