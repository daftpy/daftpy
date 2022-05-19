import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface ProjectPreview {
  id: string;
  title: string;
  language: string;
  preview: string;
  tags: string[];
  priority: number; // Used to order the projects
}

const projectsDirectory: string = path.join(process.cwd(), 'projects');

export function getSortedProjectsData(): ProjectPreview[] {
  // Get file names under /projects
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData: ProjectPreview[] = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the project metadata section
    const matterResult = matter(fileContents);
  
    // Combine the data with the id
    return {
      id: id,
      title: matterResult.data['title'],
      language: matterResult.data['language'],
      preview: matterResult.data['preview'],
      tags: matterResult.data['tags'],
      priority: matterResult.data['priority']
    }
  })

  // sort by priority
  return allProjectsData.sort(({ priority: a }, {priority: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0
    }
  })
}

export function getAllProjectIds(): { params: { id: string; }}[] {
  const fileNames = fs.readdirSync(projectsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      }
    }
  })
}

export async function getProjectData(id: string) {
  const fullPath = path.join(projectsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML
  const processedContent = await remark()
  .use(html)
  .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as {
      title: string;
      language: string;
      tags: string[];
      preview: string;
      github: string;
    })
  }
}
