import {createWriteStream, writeFile} from "fs";
import {resolve} from "path";
import {Readable} from "stream";
import {streamToPromise, SitemapStream, EnumChangefreq} from "sitemap";

import {getAttr} from "@ansuzdev/nexi/dist/utils";
import {getPages} from "./api";

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

  const robotsContent = robotsTXT(`${hostname}/sitemap.xml`, disallow, allow);
  writeFile(resolve(realFolder, "robots.txt"), robotsContent, (err, data) => {
    if (err) {
      console.log("Generate robots.txt file Failed!", err);
      throw err;
    }
  });

  const sitemapStream = new SitemapStream({hostname});
  sitemapStream.pipe(createWriteStream(resolve(realFolder, "sitemap.xml")));

  // Generate paths for static pages
  const links = [
    {url: "/", lastmod: new Date(), changefreq: EnumChangefreq.HOURLY},
  ];

  // Generate paths for pages
  const pages = await getPages();
  pages.forEach(page => {
    links.push({
      url: `/${getAttr(page, "slug")}`,
      lastmod: getAttr(page, "updatedAt"),
      changefreq: EnumChangefreq.DAILY,
    });
  });

  await streamToPromise(Readable.from(links).pipe(sitemapStream));

  sitemapStream.end();

  console.log("Generate sitemap Done!");
};
