import BaseLayout from "../../components/layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Params } from "next/dist/server/router";
import { getAllProjectIds, getProjectData } from "../../lib/projects";
import DaftpyHero from "../../components/daftpyHero";
import Tags from "../../components/tags";
import styles from "../../styles/Project.module.css";
import blogStyle from "../../styles/Post.module.css"


interface ProjectData {
  title: string;
  language: string;
  tags: string[];
  preview: string[];
  github: string;
  contentHtml: string;
}

const Project: NextPage<{ projectData: ProjectData }> = ({ projectData }) => {
  const text: string = `
    I'm Daftpy, and I have been having random encounters with Python for 
    over a decade.
  `
  const subText: string = `
    This website was built to share some of my thoughts and projects.
    You'll find some Javascript and Typescript in the mix as well.
  `
  return (
    <BaseLayout>
      <Head>
        <title>Daftpy | { projectData.title }</title>
      </Head>
      <main className="text-slate-300 mb-20">
        <div id={styles.ProjectMetaData} className="flex flex-col flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">Test { projectData.title }</h1>
            <div className="font-medium text-red-600">Language: { projectData.language }</div>
          </div>
          <div id={styles.Github} className="flex items-center grow my-2">
            <Image
              priority
              src="/github_ico.png"
              height={24}
              width={24}
              alt="Github"
            />
            <div className="ml-1 text-center">
              <Link href={ projectData.github }>
                <a className="font-bold">
                  Download on Github
                </a>
              </Link>
            </div>
          </div>
        </div>
        <Tags tags={ projectData.tags }/>
        <div className="my-14 text-xl font-light text-center text-slate-400 italic">
          { projectData.preview }
        </div>
        <div
          id={blogStyle.BlogPost}
          className="mt-8 text-lg"
          dangerouslySetInnerHTML={{ __html: projectData.contentHtml }}
        />
      </main>
      <div className="text-slate-300">
        <DaftpyHero text={text} subText={subText} />
      </div>
    </BaseLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ params }: Params) => {
  const paths = getAllProjectIds();
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const projectData = await getProjectData(params.id as string);
  return {
    props: {
      projectData
    }
  }
}

export default Project;
