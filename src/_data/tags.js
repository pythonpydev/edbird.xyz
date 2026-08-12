import projects from "./projects.json" with { type: "json" };
import milestones from "./milestones.json" with { type: "json" };

function slugify(tag) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function () {
  const byTag = new Map();

  const addItem = (tag, kind, item) => {
    const slug = slugify(tag);
    if (!byTag.has(slug)) {
      byTag.set(slug, { tag, slug, projects: [], news: [] });
    }
    byTag.get(slug)[kind].push(item);
  };

  for (const project of projects.items) {
    for (const tag of project.tags || []) {
      addItem(tag, "projects", project);
    }
  }

  for (const milestone of milestones.items) {
    for (const tag of milestone.tags || []) {
      addItem(tag, "news", milestone);
    }
  }

  return [...byTag.values()].sort((a, b) => a.tag.localeCompare(b.tag));
}
