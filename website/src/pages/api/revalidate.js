// import {generateSitemap} from "../../lib/generate-sitemap";

import {getAttr} from "@ansuzdev/nexi/dist/utils";
import {getPages} from "../../libs/api";

const getToken = req => {
  if (
    req.headers
    && req.headers.authorization
    && req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }

  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }

  if (req.signedCookies && req.signedCookies.token) {
    return req.signedCookies.token;
  }

  if (req.query && req.query.token) {
    return req.query.token;
  }

  return null;
};

const revalidate = async (hook, res) => {
  if (hook.model === "homepage") {
    res.revalidate("/");
  } else if (
    hook.model === "navbar"
    || hook.model === "footer"
    || hook.model === "servicemodal") {
    res.revalidate("/");
    const pages = (await getPages()) || [];
    for (const page of pages) {
      res.revalidate(`/${getAttr(page, "slug")}`);
    }
  } else if (hook.model === "page") {
    res.revalidate(`/${hook.entry.slug}`);
  }
};

export default async function handler(req, res) {
  const token = getToken(req);
  // Check for secret to confirm this is a valid request
  // eslint-disable-next-line no-process-env
  if (token !== process.env.SECRET_HOOK_TOKEN) {
    return res.status(401).json({message: "Invalid token"});
  }

  try {
    const hook = req.body;

    switch (hook.event) {
    case "entry.update":
    case "entry.delete":
    case "entry.unpublish":
      await revalidate(hook, res);
      // await generateSitemap(
      //     // Public host name for sitemap generation
      //   "https://timmau.vn",
      //     // subfolder for generated sitemaps (not index sitemap) in public folder
      //   "sitemaps",
      //     // folder for generated sitemaps and robots.txt
      //   "./public",
      //     // disallow routes in robots.txt
      //   ["/api/"],
      //     // allow routes in robots.txt
      //   ["/"],
      // );
      break;
    default:
      break;
    }

    return res.json({revalidated: true});
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
