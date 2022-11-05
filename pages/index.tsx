import type { NextPage } from 'next'
import { Gomoku } from '../components/Gomoku'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>五目並べ</h1>
      <Gomoku width={19} height={19} />
    </div>
  )
}

export default Home
