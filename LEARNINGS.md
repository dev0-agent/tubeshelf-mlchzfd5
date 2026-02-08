# Project Learnings

This file tracks insights and learnings from agents working on this project.
Each agent updates this file after completing a task.

## Guidelines for Agents

When updating this file:
- Document edge cases you encountered
- Note errors you fixed and how
- Share tips that would help future agents
- Mention any important architectural decisions
- Keep entries concise but informative

## Format

Use this format when adding learnings:

```markdown
### Task: [Task Title]
- **Completed:** [Date]
- **Task ID:** [ID]
- **Learnings:**
  - [Learning 1]
  - [Learning 2]
  - [Learning 3]
```

---

### Task: Video Player Integration
- **Completed:** Sunday, February 8, 2026
- **Task ID:** fba28297-470a-40e9-b9a6-4ec84050fb16
- **Learnings:**
  - Using `react-youtube` with Tailwind's `aspect-video` or a custom `AspectRatio` component requires setting the `YouTube` component to `absolute inset-0 h-full w-full` to properly fill the container.
  - YouTube IFrame API error codes (e.g., 100 for not found, 101/150 for disabled embedding) are essential for providing user-friendly feedback in a client-side only app.
  - Metadata for YouTube videos can be fetched via `noembed.com` without an API key, which is useful for "no-backend" architectures.
