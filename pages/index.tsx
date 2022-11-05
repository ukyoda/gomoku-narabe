import type { NextPage } from 'next'
import { Gomoku } from '../components/Gomoku'
import { Seo } from '../components/Seo'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Seo />
      <h1 className={styles.title}>五目並べ</h1>
      <Gomoku width={19} height={19} />
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <p>
            &copy; Produced by
            <a href='https://twitter.com/ukyoda' target='_blank' rel='noopener noreferrer' >
              @ukyoda
            </a>
          </p>
          <p>
            <a href='https://github.com/ukyoda/gomoku-narabe'  target='_blank' rel='noopener noreferrer'>
              Github
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
