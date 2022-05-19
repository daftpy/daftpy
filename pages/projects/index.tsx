import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import DaftpyHero from "../../components/daftpyHero";
import DisplayMessage from "../../components/displayMessage";
import BaseLayout from "../../components/layout";
import { getSortedProjectsData, ProjectPreview } from "../../lib/projects";
import Tags from "../../components/tags";

export async function getStaticProps() {
  const allProjectsData: ProjectPreview[] = getSortedProjectsData();
  return {
    props: {
      allProjectsData
    }
  }
}


const ProjectsList: NextPage<{ allProjectsData: ProjectPreview[] }> = ({ allProjectsData }) => {
  const text: string = `
    Below is a list of my 'favorite' projects I think you should see!
  `

  const subText: string = `
    The following list is a collection of my best and most refined repos.
    There is no shortage of less refined repos on my github account you 
    are welcome to poke through.
  `

  const displayMessage: string = `
    I am looking for work! Use the contact page to get in touch with me if
    you need help with a project or would like to inquire about my CV.
  `
  return (
    <BaseLayout>
      <div className="text-slate-300">
        <div className="mb-16">
          <Head>
            <title>Daftpy | Projects</title>
          </Head>
          <DaftpyHero
            text={text}
            subText={subText}
          />
        </div>
        <main>
          <h1 className="mb-4 text-2xl font-bold text-center">Projects</h1>
          {allProjectsData.map(({ id, title, language, tags, preview, priority }, i) => (
            <Link href={`/projects/${id}`} key={id}>
              <a>
                <div>
                  <h3 className="text-xl font-bold">{ title }</h3>
                  <span className="font-bold text-red-600">{ language }</span>
                  <Tags tags={tags} />
                  <p className="my-2">{ preview }</p>
                </div>
              </a>
            </Link>
          ))}
        </main>
        <div className="my-20 text-xl font-light text-center text-slate-400 italic">
          <DisplayMessage message={displayMessage}/>
        </div>     
      </div>
    </BaseLayout>
  )
}

export default ProjectsList;
