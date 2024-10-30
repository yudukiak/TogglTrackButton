import { Avatar, Card } from 'flowbite-react'

export default function AvatarCard(me) {
  const { email, fullname, image_url } = me.me
  const status = image_url ? 'online' : 'busy'

  return (
    <Card className="w-full">
      <div className="flex items-center">
        <Avatar img={image_url} status={status} size="md" className='mr-4' />
        <div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{fullname}</h5>
          <span className="text-sm">{email}</span>
        </div>
      </div>
    </Card>
  )
}