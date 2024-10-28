import { Flowbite } from 'flowbite-react'

import { ApiTokenProvider } from './components/ApiToken'
import Header from './components/Header'
import Main from './components/Main'

export default function App() {  
  return (
    <Flowbite>
      <ApiTokenProvider>
        <Header />
        <Main />
      </ApiTokenProvider>
    </Flowbite>
  )
}
