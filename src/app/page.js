import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';

import { getBlogPostList } from '@/helpers/file-helpers';
import Spinner from '@/components/Spinner';

async function Home() {
  const blogPostList = await getBlogPostList();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      {blogPostList.map(({ slug, title, abstract, publishedOn }) => {
        return (
          <React.Suspense key={publishedOn} fallback={<Spinner />}>
            <BlogSummaryCard
              slug={slug}
              title={title}
              abstract={abstract}
              publishedOn={publishedOn}
            />
          </React.Suspense>
        );
      })}
    </div>
  );
}

export default Home;
