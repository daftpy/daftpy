import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';


export interface PostPreview {
    id: string;
    title: string;
    preview: string;
    date: string;
    tags: []
}

export interface PostData {
  id: string;
  title: string;
  date: string;
  tags: string[];
  contentHtml: string;
}

const postsDirectory: string = path.join(process.cwd(), 'posts');

export function getSortedPostsData(): PostPreview[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostPreview[] = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id: id,
      title: matterResult.data['title'],
      date: matterResult.data['date'],
      preview: matterResult.data['preview'],
      tags: matterResult.data['tags']
    };
  });

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds(): { params: { id: string; }}[] {
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
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
    ...(matterResult.data as { date: string; title: string; tags: string[]; })
  }
}
