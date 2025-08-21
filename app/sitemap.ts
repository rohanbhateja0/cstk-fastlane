import { getAllEntries } from '@/helper';
// TODO: Uncomment when blog_post content type is available in Contentstack
// import { getBlogListRes } from '@/helper';
import { Pages } from '@/typescript/pages';
// TODO: Uncomment when blog_post content type is available in Contentstack
// import { PostPage } from '@/typescript/pages';
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const baseUrl = process.env.NEXT_PUBLIC_HOSTED_URL || 'http://localhost:3000';

    let pages: Pages = await getAllEntries();
    // TODO: Uncomment when blog_post content type is available in Contentstack
    // let posts: PostPage = await getBlogListRes();

    const allPages = pages.map((page) => `${baseUrl}${page.url}`);
    // TODO: Uncomment when blog_post content type is available in Contentstack
    // const allPosts = posts.map((post) => `${baseUrl}${post.url}`);
    // const siteMapList = [...allPages, ...allPosts].sort();
    const siteMapList = [...allPages].sort();

    return siteMapList.map((url) => {
        return {
            url: url,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 1.0,
        };
    }
    );
};
