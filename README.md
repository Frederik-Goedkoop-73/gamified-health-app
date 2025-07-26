# Gamified Health Platform for Fitbit Users

This repository contains the source code for a custom-built gamified web platform designed for a behavioural intervention study on physical activity and well-being. The platform integrates with Fitbit Inspire 2 devices and provides daily/weekly quests (or challenges), badges (or lifetime quests), XP and coin rewards, a shop, a leaderboard, and avatar customisation to enhance user motivation.

## Overview

This project was developed as part of a master's thesis titled:
**"Utilising Wearable Technology to Create a Gamified Intervention for Well-Being in an Urban Environment."**

The goal was to investigate whether gamified digital feedback loops could increase physical activity among university students using real-time wearable data.

The website was developed during February 2025 - May 25th 2025. The experiment ran from May 12th 2025 - June 17th.

Link to the website: <a href="https://kul-health-monitor.netlify.app/" style="text-decoration: underline;">kul-health-monitor</a>

<a href="https://kul-health-monitor.netlify.app/"><img style="border: 1px black solid; border-radius: 1%;" alt="Home page hyper-linked screenshot" src="public/github/home page.png"></a>

## Features

- Fitbit integration via OAuth 2.0
- Daily and weekly quests
- XP and coin system
- Avatar and theme customisation (shop)
- Badge system (progress milestones)
- Leaderboard displaying XP rankings and cosmetic status
- Firebase-based user authentication and state storage

## Technologies Used

- **Frontend:** [Nuxt.js](https://nuxtjs.org/) ([Vue 3](https://vuejs.org/)), [TypeScript](https://www.typescriptlang.org/)

  - Vue was chosen due to its simplicity, exntensive documentation, and performance.
  - Nuxt is a meta-framework built on top of Vue and simplifies the development of Vue applications by providing features like file-based routing, static site generation, auto-imports (components & composables), etc.
  - TypeScript improves code readability, debugging, and long-term maintainability — especially valuable for future collaborators or contributors.

- **Backend:** [Firebase](https://firebase.google.com/) (Firestore, Firebase Auth)

  - Firebase provides a serverless, no-code backend that's easy to integrate. Its generous free tier was ideal for this small-scale research project (n = 10).

- **API Integration:** [Fitbit Web API](https://www.fitbit.com/dev) (OAuth 2.0)

  - This enables secure access to participants’ fitness and health data.

- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/)

- **UI Template:** [Dian Pratama's Nuxt.js and Shadcn-vue dashboard template](https://github.com/dianprata/nuxt-shadcn-dashboard)<br>
  - Initially, the project started without a template — but that quickly became unsustainable due to the time investment required for basic UI scaffolding.
  - Dian’s template saved substantial development time and allowed me to focus on integrating gamification logic and data features.
  - The template includes:
    - [Shadcn-vue UI component library](https://shadcn-vue.com/)
    - [UnoCSS](https://unocss.dev/)

<img title="Tech Stack Graphic" alt="Tech Stack Graphic" src="public/github/Tech stack.png"><br>

> [!NOTE]
> For anyone unfamiliar with Vue but interested in contributing to this project:
>
> - This project uses Vue’s Composition API, a more modern way of writing Vue components. Unlike the older Options API, it lets you group related logic (like data, computed values, and watchers) together — making the code easier to read, maintain, and reuse.
> - The [official Vue documentation](https://vuejs.org/guide/introduction.html) provides a quick, high-level overview of the framework. For everything else, you can explore the existing codebase or use an AI code assistant to help you get started.

### Website Architecture

<img src="public/github/Website Architecture.png" alt="Site's Architectural Diagram">

## Installation & Setup

> [!WARNING]
> This platform was developed for research purposes and may not be fully production-ready.

Follow these steps to run the project **locally**:

0. **Ensure the necessary global dependencies are installed:**

   - [Node.js and npm](https://nodejs.org/en/download)
   - [Git](https://git-scm.com/downloads): Necessary for copying this repository to your local machine.
   - [Firebase CLI](https://firebase.google.com/docs/cli): Needed for firebase login and auth

   - (Optional) [Nuxt CLI](https://nuxt.com/docs/4.x/getting-started/installation): Helpful if you run `nuxi` commands often

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Frederik-Goedkoop-73/your-repo-name.git
   cd your-repo-name # Navigate to new directory with the repo
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   This will install the remaining dependencies such as nuxt, tailwindcss, firebase SDK, shadcn-ui, lucide-vue-next (for icons), pinia (store library and state management framework), vue ...

3. **Generate the Nuxt build files** (this will fix the `.nuxt/tsconfig.server.json` error):

   ```bash
   npm run build
   ```

4. **Environment Variables**:

   Create a `.env` file based on `.env.example` and add the following:

   ```
   NUXT_PUBLIC_FIREBASE_API_KEY=your_key
   NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NUXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NUXT_PUBLIC_FITBIT_CLIENT_ID=your_client_id
   ...
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   ```

   Copy the localhost url from the terminal into a new browser tab to open the website.

> [!IMPORTANT]
> The website won't work unless a .env file is created!

6. **Fitbit OAuth Setup**:

   - You must register your app at [https://dev.fitbit.com](https://dev.fitbit.com) and add `http://localhost:3000` as a redirect URI.
   - Use the Fitbit Client ID in your `.env` file.
   - For a public setup you will need to register another app and insert the hosted website's URL as the redirect URI.

## Usage Instructions

- Users sign in with their Google account and connect their Fitbit account via OAuth.
- After logging in:

  - User and player data — such as XP, coins, badges, streaks, selected/unlocked avatars, banners, and themes — is loaded from the database.
  - Fitbit data is fetched and displayed in the health dashboard. It also powers the quest system (i.e. progress tracking and completion).

- Users can complete and manually collect daily and weekly quests to earn XP and coins.
- Rewards can be spent in the Shop on customisation options like avatars, banners, and themes.

> [!WARNING]
> Quest rewards must be collected **manually before midnight**, as they reset daily at 00:00.

## Data & Privacy Notes

- **No personal or fitness data is stored** in this repository or in the platform database (except for username and email).

  - For the analysis of this experiment, all particpants sent their relevant fitness data via email. None of this data is accessible through the website or database.

- All Fitbit data was read **client-side** and processed in real-time.

- Final XP values were recorded via screenshot and pseudonymised for analysis.

> [!NOTE]
>
> - Avatar assets based on third-party artwork are not included in this repository due to potential licensing restrictions. These have been substituted with a placeholder png as to not disrupt the codebase. <br><br> <img alt="Proprietary Asset Placeholder" src="public/github/cc-placeholder.png"><br>
> - Due to an API key leak, some versions in the commit history have been cleansed of the `fitbit.client.ts` file.

## Limitations

### Technical limitations

1. Manual quest collection & login dependency

   - Users must manually collect rewards and log in daily.
   - Missed logins result in lost rewards and data gaps.
   - Users must also be logged in with Google and Fitbit to use / preview the website features. This can be disabled for development.

2. Fitbit API rate limits

   - The platform relies on frequent Fitbit API calls. To avoid exceeding the data fetch request quota, data is cached weekly - which leads to reduced precision and possible data loss (for badges) if the user doesn't sync before the week's end.

3. No server-side processing or background tasks

   - The platform runs entirely on the client side, relying on Firebase and the Fitbit Web API for backend functionality.
   - Without a custom backend or job scheduler, essential tasks like quest progression, badge unlocking, and data refreshing only occur when a user logs in — making all updates dependent on user interaction.

### Code limitations

1. No lazy loading of assets

   - Large images (e.g. avatars, banners) are loaded upfront, significantly increasing initial load time and reducing performance on slower devices.
   - This is the biggest issue currently.

2. No unit or integration testing

   - To save time, automated tests were skipped. This means that changes risk introducing bugs and makes the project harder to scale.

3. Tight coupling between stores and Firebase

   - Many Pinia stores directly fetch / save to Firebase, which limits flexibility for swapping out Firebase in the future.

4. No continuous integration or deployment pipeline

## Future Improvements

1. Add server-side automation

   - Use [Firebase Cloud Functions](https://firebase.google.com/docs/functions) or a [Node.js](https://nodejs.org/en) backend to:
   - Auto-reset daily/weekly quests (`cron` trigger).
   - Auto-unlock badges / quests when requirements are met.
   - Fetch Fitbit data periodically using refresh tokens (background sync).

2. [Optimise Vue Frontend](https://vuejs.org/guide/best-practices/performance)

   - Improve performance with:
   - Lazy-loading components using [defineAsyncComponent()](https://vuejs.org/guide/components/async) in Nuxt.
   - Memoising expensive computed properties using [useMemoize()](https://vueuse.org/core/useMemoize/).
   - Reducing rerenders by:
     - Applying [`v-memo`](https://vuejs.org/api/built-in-directives.html#v-memo) to tell Vue to reuse parts of the template unless specific data changes.
     - Using [`v-once`](https://vuejs.org/api/built-in-directives.html#v-once) for elements that never need to update.

3. Quest UX Improvements

   - Allow grace period collection via timestamp comparison and a `claimedLate: true` flag in Firestore.

4. Upgrade Deployment Readiness
   - Add unit tests for critical composables (e.g. [UseAuth](composables/UseAuth.ts), [useQuestProgress](composables/useQuestProgress.ts), [useHealthTotals](composables/useHealthTotals.ts)) using Vitest.
   - Set up CI/CD with [GitHub Actions](https://github.com/features/actions) to automatically lint, test, and deploy to [Netlify](https://www.netlify.com/).

## License

[MIT Licence](LICENSE)

Copyright (c) 2024 [Dian Pratama](https://github.com/dianprata) <br>
Copyright (c) 2025 [Frederik Goedkoop](https://github.com/Frederik-Goedkoop-73)

**Dian Pratama template**
[Dian Pratama](https://github.com/dianprata/nuxt-shadcn-dashboard)

## Contact

- Author: Frederik Goedkoop
- Email: frederik.goedkoop@icloud.com
- Thesis Supervisor: Prof. Jean-Marie Aerts
- University: KU Leuven and University of Antwerp (UA)
- Year: 2025
