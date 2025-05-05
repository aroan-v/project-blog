import React from 'react';

import BlogHero from '@/components/BlogHero';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getBlogInfo } from '@/components/getBlogInfo';
import CodeSnippet from '@/components/CodeSnippet';

const DivisionGroupsDemo = React.lazy(() =>
  import('@/components/DivisionGroupsDemo')
);

const CircularColorsDemo = React.lazy(() =>
  import('@/components/CircularColorsDemo')
);

import styles from './postSlug.module.css';

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const { frontmatter } = await getBlogInfo(postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
    openGraph: {
      publishedTime: frontmatter.publishedOn,
    },
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const { frontmatter, content } = await getBlogInfo(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
