import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import BaseLayout from '../components/layout'
import DaftpyHero from '../components/daftpyHero'
import DisplayMessage from '../components/displayMessage'
import { getSortedPostsData, PostPreview } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData: PostPreview[] = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}

const Home: NextPage<{ allPostsData: PostPreview[] }> = ({ allPostsData }) => {

  const welcomeText: string = `
    I'm Daftpy, and I have been having random encounters with Python for 
    over a decade.
  `
  
  const welcomeSubText: string = `
    This website was built to share some of my thoughts and projects.
    You'll find some Javascript and Typescript in the mix as well.
  `

  const displayMessage: string = `
    I am looking for work! Use the contact page to get in touch with me if
    you need help with a project or would like to inquire about my CV.
  `
  return (
    <BaseLayout home>
      <div>
        <Head>
          <title>Daftpy | Random Python and Javascript Encounters</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={`${styles.main} text-slate-300`}>
          <DaftpyHero
            text={welcomeText}
            subText={welcomeSubText}
          />
          <div className="my-16 text-xl font-light text-center text-slate-400 italic">
            <DisplayMessage message={displayMessage}/>
          </div>
          <div>
            <h2 className="text-xl font-bold text-center text-slate-300 mb-4">Blog Posts</h2>
            <div id={styles.ArticlePreviews}>
              {allPostsData.map(({ id, date, title, preview }, i) => (
                <Link key={id} href={`/posts/${id}`}>
                  <a>
                    <div className="mx-4 my-6">
                      <h3 className="text-lg font-bold">{ title }</h3>
                      <span className="font-bold text-red-600">{ date }</span>
                      <p className="my-2">{ preview }</p>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </main>

        <footer className={`${styles.footer} text-slate-300`}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </BaseLayout>
  )
}

export default Home
