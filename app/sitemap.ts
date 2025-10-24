import { getAllEntries } from '@/helper';
// TODO: Uncomment when blog_post content type is available in Contentstack
// import { getBlogListRes } from '@/helper';
import { Pages } from '@/typescript/pages';
// TODO: Uncomment when blog_post content type is available in Contentstack
// import { PostPage } from '@/typescript/pages';
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_HOSTED_URL || 'http://localhost:3000';

    try {
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
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        
        // Return a basic sitemap with just the home page if ContentStack fails
        const fallbackPages = [
            { url: `${baseUrl}/`, lastModified: new Date().toISOString(), changeFrequency: 'monthly' as const, priority: 1.0 },
            { url: `${baseUrl}/en-us`, lastModified: new Date().toISOString(), changeFrequency: 'monthly' as const, priority: 0.8 },
            { url: `${baseUrl}/es-es`, lastModified: new Date().toISOString(), changeFrequency: 'monthly' as const, priority: 0.8 },
            { url: `${baseUrl}/fr-fr`, lastModified: new Date().toISOString(), changeFrequency: 'monthly' as const, priority: 0.8 },
            { url: `${baseUrl}/de-de`, lastModified: new Date().toISOString(), changeFrequency: 'monthly' as const, priority: 0.8 },
            { url: `${baseUrl}/ar-sa`, lastModified: new Date().toISOString(), changeFrequency: 'monthly' as const, priority: 0.8 },
        ];
        
        return fallbackPages;
    }
};
