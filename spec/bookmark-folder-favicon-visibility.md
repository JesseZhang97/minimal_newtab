# Bookmark Folder Favicon Visibility

## Problem Statement

The new tab page can show bookmark folders, but bookmark entries currently have one uniform text-only display. Users who keep different kinds of bookmarks in different parent folders may want favicons in some folders for quick visual scanning while keeping other folders cleaner and more compact.

## Goals

- Let users choose favicon visibility separately for each top-level bookmark folder.
- Keep the current text-only bookmark display as the default.
- Make the setting easy to find in the existing Bookmarks options area.
- Preserve the current folder selection and expand/collapse behavior.

## Non-Goals

- Do not redesign the bookmark list.
- Do not add per-bookmark favicon controls.
- Do not add custom favicon upload or editing.
- Do not change bookmark ordering, folder selection, or folder expansion rules.
- Do not sync this setting outside the existing local settings system.

## User Stories

- As a new tab user, I want to turn on favicons for one bookmark folder so that I can scan frequently used links faster.
- As a new tab user, I want to leave favicons off for another folder so that less-used bookmark lists stay visually quiet.
- As a new tab user, I want my choices to persist after saving settings so that the new tab page keeps the layout I chose.

## Requirements

### Must-Have (P0)

- The options page lists the current top-level bookmark folders in the Bookmarks settings area.
- Each listed folder has a checkbox for whether bookmark links in that folder show favicons.
- The setting is saved with the existing settings save flow.
- The new tab page shows favicons only for bookmark links whose top-level parent folder has favicon display enabled.
- Missing favicon settings default to hidden, preserving the current appearance for existing users.

### Nice-to-Have (P1)

- Keep the new controls visually consistent with the existing checkbox style.
- Keep bookmark text aligned cleanly whether favicons are shown or hidden.

### Future Considerations (P2)

- Support deeper folder-level controls if users later need separate behavior inside nested folders.
- Support a global "show favicons everywhere" shortcut if folder-by-folder setup becomes too repetitive.

## Acceptance Criteria

- Given multiple top-level bookmark folders, when the user enables favicons for only one folder and saves, then only that folder's bookmark links show favicons.
- Given a folder has favicon display disabled, when the new tab page renders it, then its bookmark links remain text-only.
- Given existing settings do not contain this new option, when the options page and new tab page load, then the extension still works and bookmarks remain text-only.
- Given the user selects a single bookmark folder to show on the new tab page, when favicons are enabled for that folder, then its bookmark links show favicons.
- Given the user selects All bookmark folders, when different folders have different favicon settings, then each folder follows its own setting.
- Development build succeeds with `python build.py dev --once`.

## Open Questions

- None blocking. The first version should use top-level bookmark folders only, matching the current bookmark folder selector.

## Timeline Considerations

- This is a small, single-feature change and should be implemented in one pass after spec confirmation.
