import { Button, Card } from 'flowbite-react'

export default function ProjectCard(projects) {

  return (
    <Card className="col-span-2">
      <div className="flex flex-wrap gap-4">
        {
          projects.projects.map((project, index) => {
            const { color, name } = project
            return (
              <Button
                style={{backgroundColor: color}}
                key={index}
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