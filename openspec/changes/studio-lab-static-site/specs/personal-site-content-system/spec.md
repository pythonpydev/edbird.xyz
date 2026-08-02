# Personal Site Content System Spec

## Purpose

Establish a low-cost, static, JSON-driven personal website system that presents the owner profile, software projects, and related websites using a studio-lab design language and curated milestone updates.

## ADDED Requirements

### Requirement: Static Site Output

The system SHALL generate deployable static HTML, CSS, and JavaScript artifacts at build time with no required backend runtime.

#### Scenario: Build produces static output

- **WHEN** a production build is executed
- **THEN** the output SHALL consist of static files suitable for CDN or static-host deployment

### Requirement: JSON-Backed Content Sources

The system SHALL source page content from repository-managed JSON files for profile data, project entries, website entries, and curated milestones.

#### Scenario: Content update without template rewrite

- **WHEN** a maintainer updates a valid JSON content file
- **THEN** the next build SHALL reflect the updated content without requiring template duplication

### Requirement: Single Shared Project Template

The system SHALL use one shared project-detail template to generate static project pages for each project slug.

#### Scenario: Project page generation by slug

- **WHEN** projects are present in the projects data source
- **THEN** the build SHALL create one project detail page per slug using the same template

### Requirement: Studio-Lab Presentation

The system SHALL present project and milestone content using a studio-lab visual system with modular cards, visible metadata tags, and readable hierarchy.

#### Scenario: Projects rendered in studio-lab style

- **WHEN** a user views project listings or detail pages
- **THEN** project content SHALL include structured metadata treatment consistent with studio-lab styling rules

### Requirement: Curated Milestone Feed

The system SHALL provide milestone updates as curated entries rather than continuous chronological dev logs for the initial release.

#### Scenario: Home page updates section

- **WHEN** the home page renders milestone content
- **THEN** only curated milestone entries SHALL be shown
