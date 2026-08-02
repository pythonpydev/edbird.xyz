# Studio Lab Static Site Design

## Context

The site is currently unimplemented. The design must prioritize low hosting cost, fast page delivery, and straightforward authoring. Content must be manageable without backend services. See proposal.md for motivation and scope.

## Goals / Non-Goals

**Goals:**

- Generate a fully static website for low-cost hosting.
- Drive project, website, profile, and milestone content from JSON files.
- Use a single reusable template for all project detail pages.
- Establish a studio-lab visual system for the first release.
- Keep runtime JavaScript minimal and optional.

**Non-Goals:**

- Adding a backend, CMS, or database.
- Real-time collaboration, authentication, or user accounts.
- Complex feed infrastructure or frequent journal-style updates.
- Multi-language localization in this first release.

## Decisions

- Static generator selection
- Use a static site generator to build HTML ahead of time from data and templates.
- Rationale: eliminates runtime server cost and supports low-maintenance hosting.
- Alternative considered: hand-authored HTML with ad hoc scripts; rejected due to weaker scalability as project entries grow.

- Data model and source of truth
- Store content in JSON files under a dedicated data directory.
- Files include profile, projects, websites, and milestones.
- Rationale: low overhead, versionable content, and easy build-time ingestion.

- Project page generation strategy
- Use one shared project detail template and generate one static page per project slug.
- Rationale: maximum consistency, minimal duplicated markup, and efficient maintenance.

- Milestone strategy
- Launch with curated milestones only.
- Rationale: lower publishing burden while preserving a sense of active progress.

- Visual direction: studio-lab
- Use modular card layouts, metadata tags, and subtle motion cues.
- Maintain strong readability and clear information hierarchy.
- Rationale: supports a maker-oriented identity without sacrificing usability.

## Risks / Trade-offs

- Risk: studio-lab style may become visually noisy.
  - Mitigation: enforce spacing and typography tokens with strict component-level patterns.

- Risk: JSON schema drift as entries increase.
  - Mitigation: validate required fields during build and fail fast on invalid data.

- Risk: single template could feel restrictive for unusual projects.
  - Mitigation: include optional sections in the project schema and conditional rendering in template logic.

- Trade-off: build-time generation favors speed and cost over runtime flexibility.
  - Accepted because low-cost static hosting is the top constraint.
