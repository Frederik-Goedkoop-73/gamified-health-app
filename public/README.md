# Public

This directory contains the all the **visual assets** used for the website. 
Copyright sensitive assets have been substituted with placeholder images, but the names of the files remain the same as the originals as to not break the references in other files (namely [`avatarData.ts`](components/tasks/data/avatarData.ts), [`bannerData.ts`](components/tasks/data/bannerData.ts), and [`badgeData.ts`](components/tasks/data/badgeData.ts). 
I apologise beforehand for the confusing subdirectory names:

- [`avatars`](public/avatars) contains the **original set of avatars** that have an **XP level requirement** to unlock, as well as the three default avatars.
- [`extra-avatars`](public/extra-avatars) contains the themed avatars, which were also part of the original set. These had **higher XP level requirements** and were supposed to serve as "ultra-rare" avatars with a higher cosmetic value.
- [`story-avatars`](public/story-avatars) contains the **newer set of avatar** that were implemented with the badges. Initially, the idea was that there would be a story page with a roadmap. This idea was scrapped due to time constraints and these avatars were **repurposed** for avatars that could be unlocked by passing the **badge star requirement**.

The data used for the avatars in the shop can be found in the following directory: [components/tasks/data](components/tasks/data).
