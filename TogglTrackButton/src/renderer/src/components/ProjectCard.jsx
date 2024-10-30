import { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'flowbite-react'
import { ApiTokenContext, apiTokenAuthorization, fetch } from './Api'

export default function ProjectCard({projects}) {
  const [apiToken, setApiToken] = useContext(ApiTokenContext)
  const [cardClassNames, setCardClassNames] = useState({})
  const setCardBoxShadow = color => setCardClassNames({ boxShadow: `0px 0px 5px 0px ${color}` })

  const handleClick = project => {
    // Authorizationを作成
    const authorization = apiTokenAuthorization(apiToken)
    // APIチェック
    const { color, id, workspace_id } = project
    const body = {
      'created_with': 'API',
      'duration': -1,
      'project_id': id,
      'start': new Date().toISOString().replace('Z', '+00:00'),
      'workspace_id': workspace_id
    }
    console.log('👘 - handleClick - body:', body)
    fetch('POST', `workspaces/${workspace_id}/time_entries`, authorization, body).then(res => {
      console.log('👘 - fetch - res:', res)
      if (res.success) setCardBoxShadow(color)
    })
  }

  return (
    <Card
      className="col-span-2"
      style={cardClassNames}
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