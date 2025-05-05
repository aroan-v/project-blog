import React from 'react';
import { loadBlogPost } from '@/helpers/file-helpers';

export const getBlogInfo = React.cache(async (postSlug) => {
  const { frontmatter, content } = await loadBlogPost(postSlug);

  return { frontmatter, content };
});
