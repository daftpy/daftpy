import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import DaftpyHero from "../../components/daftpyHero";
import DisplayMessage from "../../components/displayMessage";
import BaseLayout from "../../components/layout";
import { PostPreview } from "../../lib/posts";
import { getSortedPostsData } from "../../lib/posts";
import styles from "../../styles/BlogList.module.css";

export async function getStaticProps() {
  const allPostsData: PostPreview[] = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}

const BlogList: NextPage<{ allPostsData: PostPreview[] }> = ({ allPostsData }) => {
  const text: string = `
    Most of my blog posts will about web development, python, and javascript.
  `

  const subText: string = `
    I've done my best researching any topic you'll find below. If you think 
    something is incorrect, use the contact page to reach out and I'll do my
    best to address it.
  `

  const displayMessage: string = `
    I am looking for work! Use the contact page to get in touch with me if
    you need help with a project or would like to inquire about my CV.
  `
  return (
    <BaseLayout>
      <div className="mb-20 text-slate-300">
      <Head>
        <title>Daftpy | Blog Posts</title>
      </Head>
        <DaftpyHero
          text={text}
          subText={subText}
        />
      </div>
      <div className="text-slate-300">
        <h2 className="text-xl font-bold text-center text-slate-300 mb-4">Blog Posts</h2>
        {allPostsData.map(({ id, date, title, preview, tags }, i) => (
          <Link key={id} href={`/posts/${id}`}>
            <a>
              <div className="mx-4 my-10">
                <h3 className="text-lg font-bold">{ title }</h3>
                <span className="font-bold text-red-600">{ date }</span>
                <div id={styles.Tags} className="font-medium">
                  {tags.map((tag, i) => (
                    <div key={tag} className="bg-amber-600 text-white drop-shadow-md text-shadow px-2 my-2 rounded-md">{ tag }</div>
                  ))}
                </div>
                <p className="my-2">{ preview }</p>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className="my-20 text-xl font-light text-center text-slate-400 italic">
        <DisplayMessage message={displayMessage}/>
      </div>
    </BaseLayout>
  )
}

export default BlogList;
