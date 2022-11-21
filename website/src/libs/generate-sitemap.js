import {createWriteStream, existsSync, mkdirSync, writeFile} from "fs";
import {resolve} from "path";
import {SitemapAndIndexStream, SitemapStream, EnumChangefreq} from "sitemap";

import {getPostSlugs, getCategories} from "./api";

const robotsTXT = (
  sitemap = "",
  disallow = [],
  allow = [],
) => `# Robots.txt generated at ${new Date().toString()}
User-agent: *
${allow.map(link => `Allow: ${link}`).join("\n")}
${disallow.map(link => `Disallow: ${link}`).join("\n")}
Sitemap: ${sitemap}
`;

export const generateSitemap = async (
  hostname = "http://localhost:3000",
  // sitemaps subfolder in public folder
  sitemapsFolder = "sitemaps",
  // public folder for nextjs
  realFolder = "./public",

  // Add paths to disallow in robots.txt
  disallow = ["/api/"],
  // Add paths to Allow in robots.txt
  allow = [],
) => {
  console.log("Generate sitemap...");

  // Generate index and sitemaps
  const smStream = new SitemapAndIndexStream({
    limit: 10000, // defaults to 45k
    getSitemapStream: i => {
      const sitemapStream = new SitemapStream({hostname});
      const sitemapXml = `sitemap-${i}.xml`;
      const fullPath = resolve(realFolder, sitemapsFolder);
      if (!existsSync(fullPath)) {
        mkdirSync(fullPath, {recursive: true});
      }
      sitemapStream.pipe(createWriteStream(resolve(fullPath, sitemapXml)));

      console.log("Generate robots.txt file...");
      const robotsContent = robotsTXT(`${hostname}/sitemap.xml`, disallow, allow);
      writeFile(resolve(realFolder, "robots.txt"), robotsContent, (err, data) => {
        if (err) {
          console.log("Generate robots.txt file Failed!", err);
          throw err;
        }
        console.log("Generate robots.txt file Done!");
      });

      return [new URL(sitemapXml, `${hostname}/${sitemapsFolder}/`).toString(), sitemapStream];
    },
  });
  smStream.pipe(createWriteStream(resolve(realFolder, "sitemap.xml")));

  // Generate paths for static pages
  smStream.write({
    url: "/",
    lastmod: new Date(),
    changefreq: EnumChangefreq.HOURLY,
  });

  smStream.write({
    url: "/ve-chung-toi",
    lastmod: new Date(),
    changefreq: EnumChangefreq.WEEKLY,
  });

  smStream.write({
    url: "/lien-he",
    lastmod: new Date(),
    changefreq: EnumChangefreq.WEEKLY,
  });

  // Generate paths for categories
  await getCategories()
    .then(categories => {
      categories.map(category => {
        smStream.write({
          url: `/${category.attributes.slug}`,
          lastmod: category.attributes.updatedAt,
          changefreq: EnumChangefreq.DAILY,
        });
      });
    })
    .catch(reason => {
      console.log("Something wrong with getting categories for sitemap -> ", reason);
      throw reason;
    });

  // Generate paths for Posts
  await getPostSlugs()
    .then(posts => {
      posts.map(post => {
        if (post.attributes.slug) {
          smStream.write({
            url: `/post/${post.attributes.slug}`,
            lastmod: post.attributes.updatedAt,
            changefreq: EnumChangefreq.WEEKLY,
          });
        }
      });
    })
    .catch(reason => {
      console.log("Something wrong with getting posts for sitemap -> ", reason);
      throw reason;
    });

  smStream.end();
  console.log("Generate sitemap Done!");
};
