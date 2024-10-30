import { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'flowbite-react'
import { VscDebugStart, VscDebugStop } from 'react-icons/vsc'
import { ApiTokenContext, apiTokenAuthorization, fetch } from './Api'


function Time({ currentProject }) {
  const [elapsedTime, setElapsedTime] = useState('00:00:00')
  useEffect(() => {
    if (currentProject.start === undefined) return
    const startDate = new Date(currentProject.start)
    const updateElapsedTime = _ => {
      const now = new Date()
      const elapsedMs = now - startDate
      const hours = String(Math.floor(elapsedMs / (1000 * 60 * 60))).padStart(2, '0')
      const minutes = String(Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
      const seconds = String(Math.floor((elapsedMs % (1000 * 60)) / 1000)).padStart(2, '0')
      setElapsedTime(`${hours}:${minutes}:${seconds}`)
    }
    updateElapsedTime()
    const intervalId = setInterval(updateElapsedTime, 1000)
    return () => clearInterval(intervalId)
  }, [currentProject])
  return (
    <p className="mr-4 text-xl font-medium text-gray-900 dark:text-white">{elapsedTime}</p>
  )
}

export default function TimerCard({ projects, currentProject, onCurrentProject }) {
  const [apiToken, setApiToken] = useContext(ApiTokenContext)
  
  const isCurrentEmpty = Object.keys(currentProject).length === 0
  const name = isCurrentEmpty ? '停止中' : projects.filter(p => p.id === currentProject.project_id)[0].name
  const color = isCurrentEmpty ? '' : projects.filter(p => p.id === currentProject.project_id)[0].color

  const handleClick = project => {
    // Authorizationを作成
    const authorization = apiTokenAuthorization(apiToken)
    // APIチェック
    const { id, workspace_id } = project
    fetch('PATCH', `workspaces/${workspace_id}/time_entries/${id}/stop`, authorization).then(res => {
      if (!res.success) return
      onCurrentProject({})
    })
  }

  return (
    <Card className="w-full">
      <Button
        as="span"
        style={{
          backgroundColor: 'transparent',
          border: `2px solid ${color}`,
        }}
      >{name}</Button>
      <div className='w-1/2'style={{ margin: '0 auto' }}>
        <div className="flex items-center justify-between m-auto">
          <Time currentProject={currentProject} />
          <Button color="failure" pill disabled={isCurrentEmpty} onClick={() => handleClick(currentProject)}>
            <VscDebugStop />
          </Button>
        </div>
      </div>
    </Card>
  )
}