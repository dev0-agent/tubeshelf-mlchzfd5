# Task List

This file shows the current progress of all tasks in this project.
It is automatically updated by dev0 as tasks are completed.

---

## Phase 1

- [x] ✅ **Define Types and Storage Context**
  Create the TypeScript interfaces for `Video`, `Note`, and `Tag`. Implement a React Context (`VideoContext`) and a custom hook `useLocalStorage` to manage the application state. The context should expose methods to add, update, and delete videos, automatically syncing with browser LocalStorage.

- [x] ✅ **App Layout and Routing**
  Set up the main application layout using a Sidebar/Header structure. Configure React Router (if needed, or simple conditional rendering) to switch between the 'Library' view and 'Player/Details' view. Include a responsive shell using shadcn/ui components.

## Phase 2

- [x] ✅ **Implement 'Add Video' Functionality**
  Create a dialog/modal component that accepts a YouTube URL. Implement a utility function to extract the YouTube Video ID from various URL formats (standard, shorts, share links). On submission, fetch basic metadata (thumbnail URL is derivable from ID) and add the video object to the global store.

- [x] ✅ **Video Grid Component**
  Develop the main dashboard view displaying videos in a responsive grid. Each card should show the thumbnail, title (user-editable or placeholder), and existing tags. Clicking a card should navigate to the Player view.

- [x] ✅ **Video Player Integration**
  Create a `PlayerView` component that embeds the YouTube video using `react-youtube` or an iframe wrapper. Ensure the player is responsive and handles basic errors (e.g., video deleted).

## Phase 3

- [ ] ⏳ **Tagging System UI & Logic**
  Implement the UI for managing tags within the `PlayerView` or a dedicated edit modal. Allow users to create new tags and toggle existing ones for the current video. Update the store to reflect these relationships.

- [ ] ⏳ **Notes and Comments Feature**
  Add a text area or rich text editor (simple) next to or below the video player. Allow users to save persistent notes associated with the specific video ID. Ensure notes are saved to LocalStorage via the context.

- [ ] ⏳ **Search and Filter Implementation**
  Add a search bar and tag filter dropdown to the main Video Grid. Implement logic to filter the displayed video list based on title matching or selected tags.

## Phase 4

- [ ] ⏳ **Data Management (Import/Export)**
  Create a settings area allowing users to export their entire library (videos, tags, notes) as a JSON file and import a JSON file to restore data. This is crucial for a local-only app.

- [ ] ⏳ **UI Polish and Empty States**
  Add empty states for the library (e.g., 'No videos yet, add one!'). Implement toast notifications for actions like 'Video Added' or 'Data Exported'. Refine transitions and hover effects.

---

_Last updated by dev0 automation_
