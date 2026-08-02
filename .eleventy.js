export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.ignores.add("src/assets/downloads/**");

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
