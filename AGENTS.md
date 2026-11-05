This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Project Overview

This repository is a cross-platform Expo application targeting Android, iOS, and web. It uses Expo Router for file-based navigation and TypeScript with strict type checking.

## Project Structure

Use the following locations for new files:

```text
.
├── assets/
│   ├── images/                # App images, icons, splash assets, favicons, and tab icons
│   │   └── tabIcons/          # Image assets used by tab navigation
│   └── expo.icon/             # iOS icon package and its source assets
├── scripts/                   # Development and project maintenance scripts
├── src/
│   ├── app/                   # Expo Router screens and layouts; every file is a route
│   │   ├── _layout.tsx        # Root/tab layout, theme provider, and splash overlay
│   │   ├── index.tsx          # Home screen route
│   │   └── explore.tsx        # Explore screen route
│   ├── components/            # Reusable UI components
│   │   └── ui/                # Generic UI primitives such as Collapsible
│   ├── constants/             # Shared constants such as colors, fonts, and spacing
│   ├── hooks/                 # Reusable React and platform-specific hooks
│   └── global.css             # Web font variables and global CSS
├── app.json                   # Expo app identity, platform, plugin, and asset configuration
├── package.json               # Dependencies and npm scripts
├── tsconfig.json              # Strict TypeScript and @/* path aliases
└── AGENTS.md                  # Agent instructions and project conventions
```

### Placement Rules

- Put route screens and route layouts in `src/app/`. Do not put reusable components there.
- Put reusable visual components in `src/components/`; put broadly generic primitives in `src/components/ui/`.
- Put colors, fonts, spacing, dimensions, and other shared design constants in `src/constants/`.
- Put reusable stateful or platform-specific hooks in `src/hooks/`.
- Put static images in `assets/images/`. Use `@2x` and `@3x` variants when density-specific assets are needed.
- Put application and platform asset references in `app.json`; do not hardcode those paths in unrelated components.
- Keep native platform directories out of this project unless the build setup explicitly requires them. Configure native behavior through `app.json` and config plugins.
- Use the `@/*` alias for imports from `src/` and `@/assets/*` for imports from `assets/`.

## Tech Stack

- **Framework:** Expo `~58.0.22`
- **Routing:** Expo Router `~58.0.29` with typed routes enabled
- **UI runtime:** React `19.3.0`, React Native `0.88.1`, and React Native Web `~0.21.4`
- **Language:** TypeScript `~6.0.3` with strict mode enabled
- **Animation:** React Native Reanimated `4.7.1` and React Native Worklets `0.13.0`
- **Platform utilities:** Expo Image, Expo Symbols, Expo Device, Expo Font, Expo Linking, Expo Web Browser, Expo System UI, and Expo Splash Screen
- **UI support:** React Native Gesture Handler, Safe Area Context, React Native Screens, and `@expo/ui`
- **Styling:** React Native `StyleSheet`, shared theme constants in `src/constants/theme.ts`, and web variables in `src/global.css`
- **Build configuration:** `app.json` with Expo Router and Splash Screen plugins; Android, iOS, and web targets
- **Package manager:** npm (`package-lock.json` is committed)

## Development Commands

```bash
npm install
npm start
npm run android
npm run ios
npm run web
npm run lint
npx tsc --noEmit
```

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
