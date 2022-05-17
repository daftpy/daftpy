import { NextPage } from "next";
import BaseLayout from "../../components/layout";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from 'next';
import { Params } from 'next/dist/server/router';
import { getAllPostIds, getPostData } from "../../lib/posts";
import styles from '../../styles/Post.module.css';
import DaftpyHero from "../../components/daftpyHero";
import DisplayMessage from "../../components/displayMessage";

interface PostData {
  title: string;
  date: string;
  tags: string[];
  contentHtml: string;
}

const Post: NextPage<{ postData: PostData }> = ({ postData }) => {
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
    <BaseLayout>
      <div>
        <Head>
          <title>{ postData.title }</title>
        </Head>      
        <main
          className="text-slate-300 px-2"
        >
          <h1 className="text-2xl font-bold">{ postData.title }</h1>
          <div className="font-medium text-red-600">Published { postData.date }</div>
          <div id={styles.Tags} className="font-medium">
            {postData.tags.map((tag, i) => (
              <div key={tag} className="bg-amber-600 px-2 my-2 rounded-md">{ tag }</div>
            ))}
          </div>
          <div
            id={styles.BlogPost}
            className="mt-4 text-lg"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </main>
        <div className="text-slate-300">
          <DaftpyHero
            text={welcomeText}
            subText={welcomeSubText}
          />
        </div>
        <div className="my-16 text-xl font-light text-center text-slate-400 italic">
          <DisplayMessage message={displayMessage}/>
        </div>
      </div>
    </BaseLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const postData = await getPostData(params.id as string)
  return {
    props: {
      postData
    }
  }
}

export default Post;
