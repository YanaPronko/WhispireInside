# AGENTS.md

## Global project context for Codex / ChatGPT

This directory contains the **full documentation of the FLS template (Чертоги Фрілансера)** converted from PDF into Markdown.

Codex / ChatGPT MUST treat this folder as the **primary knowledge base** when working with any project that uses the FLS template.

---

## Knowledge source

Main documentation file:

- `all_docs.md` — full combined documentation (single-file knowledge base)
- Other `.md` files — original split documentation sections

The documentation describes:

- Project architecture
- Folder and file structure
- Build system and modes
- Components and their usage
- HTML / SCSS / JS structure
- WordPress integration
- Snippets and aliases
- Deployment (GitHub, FTP, ZIP)
- FLS component system

Codex should ALWAYS search this documentation before making assumptions.

---

## Priority rules

When generating code, explanations, or suggestions:

1. Prefer FLS architecture over generic frontend structure.
2. Use existing FLS components when possible.
3. Follow documented folder structure from `all_docs.md`.
4. Respect build system (`npm run dev`, `build`, `wp`, etc.).
5. Use documented aliases (`@components`, `@img`, etc.).
6. Prefer reusable template/component approach.
7. Avoid suggesting tools that conflict with FLS build system.

---

## Context usage

Codex should:

- Use this documentation as project memory
- Reuse component patterns described in docs
- Follow FLS conventions for HTML, SCSS, JS, PUG, PHP
- Prefer documented data-attributes (`data-fls-*`)
- Respect documented component lifecycle and architecture

---

## Scope

This AGENTS.md is **global** and applies to:

- VSCode Codex
- ChatGPT Codex
- Any project using FLS template
- Any repository where this file exists

---

## Notes

Documentation was auto-converted from original PDF and may contain minor formatting artifacts, but structural and technical information is valid.

If something is unclear, Codex should infer using FLS architecture patterns.

---
