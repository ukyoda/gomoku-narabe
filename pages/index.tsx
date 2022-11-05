import type { NextPage } from 'next'
import { Gomoku } from '../components/Gomoku'

const Home: NextPage = () => {
  return (
    <div>
      <h1>五目並べ</h1>
      <Gomoku width={19} height={19} />
    </div>
  )
}

export default Home
