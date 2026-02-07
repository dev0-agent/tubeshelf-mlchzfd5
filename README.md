# TubeShelf

> Your personal, local YouTube video curator.

TubeShelf is a minimalist, client-side application that allows you to organize, tag, and annotate YouTube videos. It operates entirely in your browser using LocalStorage, meaning no accounts, no tracking, and no servers—just your curated collection.

## Tech Stack

*   **Framework:** React + Vite
*   **Styling:** Tailwind CSS + shadcn/ui
*   **Persistence:** Browser LocalStorage (Custom Hooks)
*   **Video API:** YouTube IFrame Player API

## Features

*   **Local Library:** Save videos from YouTube URLs directly to your browser.
*   **Smart Organization:** Add custom tags to categorize your collection.
*   **Notes:** Write personal comments and notes for each video.
*   **Search & Filter:** Quickly find content by title or tags.
*   **Data Ownership:** Export and import your library as JSON to back up your data.

## Getting Started

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd tubeshelf
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5173](http://localhost:5173) to view the app.

## Documentation

*   [TASKLIST.md](./TASKLIST.md) - Progress tracking and roadmap.
*   [LEARNINGS.md](./LEARNINGS.md) - Technical insights and decisions.
*   [.dev0/RULES.md](./.dev0/RULES.md) - AI coding guidelines.