import { Card } from 'flowbite-react'
import { VscDebugStart, VscDebugStop } from 'react-icons/vsc'

export default function TimerCard() {

  return (
    <Card className="w-full">
      <div className="flex items-center">
        <p className="mr-4 text-xl font-medium text-gray-900 dark:text-white">00:00:00</p>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <VscDebugStart />
        </button>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <VscDebugStop />
        </button>
      </div>
    </Card>
  )
}