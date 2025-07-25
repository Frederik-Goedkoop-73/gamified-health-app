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

   > [!IMPORTANT]
   > The website won't work unless a .env file is created!

   ```bash
   npm run dev
   ```

   Copy the localhost url from the terminal into a new browser tab to open the website.

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

> [!IMPORTANT]
> Quest rewards must be collected **manually before midnight**, as they reset daily at 00:00.

## Data & Privacy Notes

- **No personal or fitness data is stored** in this repository or in the platform database (except for username and email).

  - For the analysis of this experiment, all particpants sent their relevant fitness data via email. None of this data is accessible through the website or database.

- All Fitbit data was read **client-side** and processed in real-time.

- Final XP values were recorded via screenshot and pseudonymised for analysis.

> [!NOTE]
>
> - Avatar assets based on third-party artwork are not included in this repository due to potential licensing restrictions. These have been substituted with a placeholder png as to not disrupt the codebase. More info on this can be found here: (link to public readme) <br><br> <img alt="Proprietary Asset Placeholder" src="public/github/cc-placeholder.png"><br> (move to linked file)
> - Due to an API key leak, some versions in the commit history have been cleansed of the `fitbit.client.ts` file.

## Limitations

- Site performance was limited by non-optimised rendering logic in Vue components.
- Manual syncing and reward collection were required for full functionality.
- To prevent exceeding the Fitbit fetch request quota, weekly totals were cached each week and added to the lifetime totals (for badges). This method is rather inefficient and results in data gaps if the user doesn't log in the last days of the week.
- No tests were written for this website.

## Future Improvements

- Replace Firebase with a relational or graph-based database for more robust data queries.
- Implement lazy loading for large assets (avatars, badges) to improve initial load times.
- Add support for session logging and progress analytics.
- Add automated quest tracking and notifications.
- Refactor frontend with modular Vue components and memoisation for improved rendering efficiency.
- Expand unit testing and CI pipelines for deployment readiness.

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

---

## To mention

- Future optimisations -> No web dev experience so some parts unoptimised
- Technical descriptions in README files in folders
- Proprietary assets -> See README in assets, don't copy from previous commits!
- Screenshots
- Add diagram of flow
