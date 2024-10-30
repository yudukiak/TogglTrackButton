import { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'flowbite-react'
import { ApiTokenContext, apiTokenAuthorization, fetch } from './Api'

export default function ProjectCard({ projects, currentProject }) {
  const [apiToken, setApiToken] = useContext(ApiTokenContext)
  const [classNames, setClassNames] = useState({})

  const updateBoxShadow = object => {
    const color = object.color
    if (color === undefined) return
    const classNameObject = { 'boxShadow': `0px 0px 5px 0px ${color}` }
    setClassNames(classNameObject)
  }

  useEffect(() => {
    updateBoxShadow(currentProject)
  }, [currentProject])

  const handleClick = project => {
    // Authorizationを作成
    const authorization = apiTokenAuthorization(apiToken)
    // APIチェック
    const { id, workspace_id } = project
    const body = {
      'created_with': 'API',
      'duration': -1,
      'project_id': id,
      'start': new Date().toISOString().replace('Z', '+00:00'),
      'workspace_id': workspace_id
    }
    fetch('POST', `workspaces/${workspace_id}/time_entries`, authorization, body).then(res => {
      if (!res.success) return
      const currentData = res.data
      const currentProjectData = projects.filter(p => p.id === currentData.project_id)[0]
      updateBoxShadow(currentProjectData)
    })
  }

  return (
    <Card
      className="col-span-2"
      style={classNames}
    >
      <div className="flex flex-wrap gap-4">
        {
          projects.map(project => {
            const { color, id, name } = project
            return (
              <Button
                style={{ backgroundColor: color }}
                key={id}
                onClick={() => handleClick(project)}
              >
                {name}
              </Button>
            )
          })
        }
      </div>
    </Card>
  )
}