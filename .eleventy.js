import fs from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";

export default function (eleventyConfig) {
  const markdownRenderer = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true
  });

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.ignores.add("src/assets/downloads/**");

  eleventyConfig.addShortcode("renderMarkdownFile", (filePath) => {
    if (!filePath) {
      return "";
    }

    const normalizedPath = String(filePath).replace(/^\//, "");
    const absolutePath = path.join(process.cwd(), "src", normalizedPath);

    if (!fs.existsSync(absolutePath)) {
      return `<p>Unable to load markdown file: ${filePath}</p>`;
    }

    const markdown = fs.readFileSync(absolutePath, "utf8");
    return markdownRenderer.render(markdown);
  });

  eleventyConfig.addFilter("featuredProjects", (items) => {
    return items.filter((item) => item.featured);
  });

  eleventyConfig.addFilter("projectsByPriority", (items) => {
    return [...items].sort((a, b) => {
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return b.year - a.year;
    });
  });

  eleventyConfig.addFilter("formatYear", (value) => {
    if (!value) {
      return "";
    }
    return String(value);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "dist"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}
