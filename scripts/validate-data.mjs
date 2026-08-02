import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const rootDir = process.cwd();
const dataDir = path.join(rootDir, "src", "_data");

const LinkSchema = z.object({
  label: z.string().min(1),
  url: z.url()
});

const ProfileSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  bioShort: z.string().min(40),
  careerNarrative: z.string().min(1).optional(),
  qualifications: z.array(z.string().min(1)).optional(),
  researchInterests: z.array(z.string().min(1)).optional(),
  focusNow: z.string().min(1),
  contact: z.array(LinkSchema).min(1)
});

const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  tagline: z.string().min(1),
  status: z.enum(["active", "maintained", "archived"]),
  stack: z.array(z.string().min(1)).min(1),
  problem: z.string().min(1),
  approach: z.string().min(1),
  outcome: z.string().min(1),
  lessons: z.string().min(1),
  year: z.number().int().min(2000).max(2100),
  featured: z.boolean(),
  links: z.object({
    repo: z.url().optional(),
    demo: z.url().optional(),
    writeup: z.url().optional()
  })
});

const ProjectsSchema = z.object({
  items: z.array(ProjectSchema).min(1)
});

const WebsiteSchema = z.object({
  name: z.string().min(1),
  url: z.url(),
  purpose: z.string().min(1),
  audience: z.string().min(1),
  relationshipToEdbird: z.string().min(1),
  status: z.enum(["active", "maintained", "archived"])
});

const WebsitesSchema = z.object({
  items: z.array(WebsiteSchema).min(1)
});

const MilestoneSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  link: z.url().optional()
});

const MilestonesSchema = z.object({
  curatedOnly: z.literal(true),
  items: z.array(MilestoneSchema).min(1)
});

const ThemeSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  description: z.string().min(1),
  palette: z.object({
    bg: z.string().min(1),
    surface: z.string().min(1),
    text: z.string().min(1),
    muted: z.string().min(1),
    accent: z.string().min(1),
    accentAlt: z.string().min(1),
    border: z.string().min(1)
  })
});

const ThemesSchema = z.object({
  items: z.array(ThemeSchema).min(3)
});

async function readJson(relativePath) {
  const filePath = path.join(dataDir, relativePath);
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function parseOrThrow(schema, data, label) {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`Validation failed for ${label}`);
    console.error(result.error.format());
    process.exit(1);
  }
}

async function main() {
  parseOrThrow(ProfileSchema, await readJson("profile.json"), "profile.json");
  parseOrThrow(ProjectsSchema, await readJson("projects.json"), "projects.json");
  parseOrThrow(WebsitesSchema, await readJson("websites.json"), "websites.json");
  parseOrThrow(MilestonesSchema, await readJson("milestones.json"), "milestones.json");
  parseOrThrow(ThemesSchema, await readJson("themes.json"), "themes.json");
  console.log("Data validation passed.");
}

main().catch((error) => {
  console.error("Unexpected error validating data.");
  console.error(error);
  process.exit(1);
});
