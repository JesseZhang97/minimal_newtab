---
title: Bookmark Folder Favicon Visibility Design Specification
version: 1.0
date_created: 2026-04-29
last_updated: 2026-04-29
owner: Project Maintainer
tags: [design, bookmarks, options, newtab, favicon]
---

# Introduction

This specification defines the bookmark folder favicon visibility feature for the Minimal New Tab Chrome extension. The feature lets users choose whether bookmark links inside each top-level bookmark folder show favicons on the left side of each bookmark entry.

## 1. Purpose & Scope

The purpose of this specification is to define the requirements, constraints, data shape, and acceptance criteria for folder-level favicon visibility controls.

The scope is limited to:

- The new tab bookmark list in `src/pages/newtab/`.
- The bookmark settings controls in `src/pages/options/`.
- The shared settings object stored in `localStorage`.

The intended audience is an implementation agent or developer working in this repository.

Assumptions:

- The extension remains a Chrome Manifest V3 new tab extension.
- Bookmark data is read through the Chrome bookmarks API.
- User settings continue to be stored in the existing `settings` object in `localStorage`.
- The first version controls top-level bookmark folders only.

## 2. Definitions

- **Bookmark Entry**: A bookmark node with a URL.
- **Bookmark Folder**: A bookmark node with child bookmark nodes.
- **Top-Level Bookmark Folder**: A direct child folder under Chrome's bookmark tree root, such as "Bookmarks Bar" or "Other Bookmarks".
- **Favicon**: The small website icon associated with a bookmark URL.
- **New Tab Page**: The extension page rendered from `src/pages/newtab/`.
- **Options Page**: The extension settings page rendered from `src/pages/options/`.
- **Selected Bookmark Folder**: The folder chosen in the existing "Select Bookmark folder" option. An empty value means "All".

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The options page shall list all current top-level bookmark folders in the Bookmarks settings area.
- **REQ-002**: Each listed top-level bookmark folder shall have one checkbox that controls favicon visibility for bookmark entries under that folder.
- **REQ-003**: The settings save flow shall persist folder favicon choices in the existing `settings` object.
- **REQ-004**: The new tab page shall show favicons only for bookmark entries whose top-level bookmark folder has favicon visibility enabled.
- **REQ-005**: The new tab page shall keep bookmark entries text-only when favicon visibility is disabled or unspecified for the top-level folder.
- **REQ-006**: Existing settings without the new favicon visibility field shall continue to load without requiring migration.
- **REQ-007**: Existing bookmark folder selection behavior shall remain unchanged.
- **REQ-008**: Existing bookmark folder expand and collapse behavior shall remain unchanged.
- **CON-001**: The feature shall not add per-bookmark favicon controls.
- **CON-002**: The feature shall not add nested folder-specific favicon controls in the first version.
- **CON-003**: The feature shall not add custom favicon upload, editing, or replacement.
- **CON-004**: The feature shall not change bookmark sorting or bookmark folder ordering.
- **CON-005**: The feature shall not add a new storage system.
- **GUD-001**: The default visual result for existing users shall match the current text-only bookmark display.
- **GUD-002**: New options page controls should visually match the existing checkbox controls.
- **GUD-003**: Bookmark text alignment should remain clean whether favicon display is enabled or disabled.

## 4. Interfaces & Data Contracts

### 4.1 Settings Field

Add the `bookmarkFolderFavicons` field to the existing settings object.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `bookmarkFolderFavicons` | Object keyed by top-level folder title | No | `{}` | Maps each top-level bookmark folder title to whether bookmark entries under that folder show favicons. |

Example:

```json
{
  "bookmarkFolderFavicons": {
    "Bookmarks Bar": true,
    "Other Bookmarks": false
  }
}
```

### 4.2 Folder Key Rules

- The object key shall be the top-level bookmark folder title.
- A missing key shall be treated as `false`.
- A key with value `true` means bookmark entries under that folder show favicons.
- A key with value `false` means bookmark entries under that folder remain text-only.

### 4.3 New Tab Rendering Contract

When rendering a bookmark entry, the renderer must know the top-level bookmark folder that contains the entry.

Rendering behavior:

| Condition | Result |
| --- | --- |
| `settings.bookmarkFolderFavicons[topLevelFolderTitle] === true` | Show favicon to the left of the bookmark title. |
| Value is `false`, missing, or invalid | Show bookmark title without favicon. |

### 4.4 Options Page Contract

The options page shall:

- Read top-level bookmark folders from Chrome.
- Render one favicon visibility checkbox per top-level bookmark folder.
- Initialize each checkbox from `settings.bookmarkFolderFavicons`.
- Save checkbox values back into `settings.bookmarkFolderFavicons`.

## 5. Acceptance Criteria

- **AC-001**: Given multiple top-level bookmark folders, when the user enables favicons for one folder and saves settings, then only bookmark entries under that folder show favicons on the new tab page.
- **AC-002**: Given favicon visibility is disabled for a folder, when the new tab page renders bookmark entries under that folder, then the entries remain text-only.
- **AC-003**: Given existing settings do not include `bookmarkFolderFavicons`, when the options page loads, then all folder favicon checkboxes are unchecked.
- **AC-004**: Given existing settings do not include `bookmarkFolderFavicons`, when the new tab page loads, then bookmark entries remain text-only.
- **AC-005**: Given the user selects a single bookmark folder in the existing bookmark folder selector, when favicon visibility is enabled for that folder, then bookmark entries in that selected folder show favicons.
- **AC-006**: Given the user selects "All" bookmark folders, when different top-level folders have different favicon settings, then each top-level folder follows its own setting.
- **AC-007**: Given bookmark folders are expanded or collapsed, when this feature is enabled or disabled, then existing expand and collapse behavior is unchanged.
- **AC-008**: Given implementation is complete, when `python build.py dev --once` is run, then the development build succeeds.

## 6. Test Automation Strategy

- **Test Levels**: Manual browser verification and development build verification.
- **Frameworks**: Use the repository's existing build command. No new test framework is required for this feature.
- **Test Data Management**: Use the current Chrome bookmark tree during manual extension testing.
- **CI/CD Integration**: No new CI requirement.
- **Coverage Requirements**: No formal coverage threshold.
- **Performance Testing**: No dedicated performance test is required. The feature should add only small DOM elements for enabled folders.

Manual verification should cover:

- Existing settings with no `bookmarkFolderFavicons` field.
- A single folder with favicons enabled.
- Multiple folders with mixed enabled and disabled states.
- The existing "All" bookmark folder mode.
- The existing single-folder mode.

## 7. Rationale & Context

The current bookmark list uses one text-only display style for all bookmark entries. Folder-level favicon controls solve the visual scanning need without changing the default experience for existing users.

Top-level folder control is chosen because the existing options page already exposes top-level bookmark folder selection. This keeps the feature small and aligned with the current settings model.

## 8. Dependencies & External Integrations

### External Systems

- **EXT-001**: Chrome bookmarks API - Required to read top-level bookmark folders and bookmark entries.
- **EXT-002**: Chrome favicon access - Required to render favicons for bookmark URLs.

### Third-Party Services

- None.

### Infrastructure Dependencies

- None.

### Data Dependencies

- **DAT-001**: Existing `localStorage` settings object - Required to persist the folder favicon visibility map.

### Technology Platform Dependencies

- **PLT-001**: Chrome Manifest V3 extension environment - Required runtime platform for the new tab and options pages.

### Compliance Dependencies

- None.

## 9. Examples & Edge Cases

### Example Settings

```json
{
  "bookmarkFolder": "",
  "bookmarkFolderFavicons": {
    "Bookmarks Bar": true,
    "Other Bookmarks": false
  }
}
```

Expected result:

- Bookmark entries under "Bookmarks Bar" show favicons.
- Bookmark entries under "Other Bookmarks" remain text-only.

### Edge Cases

- If `bookmarkFolderFavicons` is missing, treat it as an empty object.
- If a top-level folder has no stored value, treat the value as `false`.
- If a stored folder title no longer exists in Chrome bookmarks, ignore it during rendering and options display.
- If a bookmark URL has no available favicon, the bookmark link should still remain usable.

## 10. Validation Criteria

- The options page displays one favicon checkbox per top-level bookmark folder.
- Saving settings preserves favicon checkbox choices.
- The new tab page applies favicon visibility per top-level bookmark folder.
- Existing bookmark display remains text-only by default.
- Existing folder selection and expand/collapse behavior still work.
- `python build.py dev --once` completes successfully.

## 11. Related Specifications / Further Reading

- [Bookmark Folder Favicon Visibility PRD](bookmark-folder-favicon-visibility.md)
- [Project Instructions](../AGENTS.md)
