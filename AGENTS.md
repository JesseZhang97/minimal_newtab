# AGENTS.md

## Basic Principle

- Avoid over-engineering. Only make changes that are directly requested or clearly necessary. Keep solutions simple and focused.
- Don't add features, refactor code, or make "improvements" beyond what was asked. A bug fix doesn't need surrounding code cleaned up. A simple feature doesn't need extra configurability. Don't add docstrings, comments, or type annotations to code you didn't change. Only add comments where the logic isn't self-evident.
- Don't add error handling, fallbacks, or validation for scenarios that can't happen. Trust internal code and framework guarantees. Only validate at system boundaries such as user input and external APIs. Don't use feature flags or backwards-compatibility shims when you can just change the code.
- Don't create helpers, utilities, or abstractions for one-time operations. Don't design for hypothetical future requirements. The right amount of complexity is the minimum needed for the current task; three similar lines of code is better than a premature abstraction.
- Avoid backwards-compatibility hacks like renaming unused `_vars`, re-exporting types, or adding `// removed` comments for removed code. If you are certain that something is unused, delete it completely.

## Project Notes

- This repo is a Chrome Manifest V3 new tab extension.
- The new tab page lives in `src/pages/newtab/`.
- The options page lives in `src/pages/options/`.
- Reusable UI pieces live in `src/components/` and `src/widgets/`.
- Shared defaults and browser helpers live in `src/shared/`.
- Extension metadata and permissions live in `src/assets/manifest.json`.
- The current feature set includes a clock, weather, bookmarks, top-right browser shortcuts, pixel art/background customization, Unsplash backgrounds, sidebar widgets, theme selection, and custom CSS.
- User settings are stored in `localStorage` and start from `defaultSettings` in `src/shared/defaultSettings.js`.
- Build output goes to `dist/dev` or `dist/prod`; do not edit files in `dist/` as source.
- Use `python build.py dev --once` for a quick development build and `python build.py prod` for a production build.
