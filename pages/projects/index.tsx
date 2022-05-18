import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import DaftpyHero from "../../components/daftpyHero";
import DisplayMessage from "../../components/displayMessage";
import BaseLayout from "../../components/layout";


const ProjectsList: NextPage = () => {
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
      <div className="mb-20 text-slate-300">
        <Head>
          <title>Daftpy | Projects</title>
        </Head>
        <DaftpyHero
          text={text}
          subText={subText}
        />
      </div>
      <div className="text-slate-300 text-center">
        <h1 className="text-2xl font-bold">Projects</h1>
      </div>
      <div className="my-20 text-xl font-light text-center text-slate-400 italic">
        <DisplayMessage message={displayMessage}/>
      </div>
    </BaseLayout>
  )
}

export default ProjectsList;
