# Project TODO

## Design System Foundation

- [x] Create a centralized design file for the application theme.
  - [x] Define light and dark theme colors.
  - [x] Define primary, secondary, background, surface, border, success, warning, and error colors.
  - [x] Define typography families and font weights.
  - [x] Define font sizes and line heights.
  - [x] Define spacing, border radii, icon sizes, and common dimensions.
  - [x] Define shared shadows and elevation values where supported.
- [x] Update components to use the centralized design tokens instead of hardcoded colors, font sizes, and spacing values.
- [x] Make changing the application color palette possible from one design file.
- [x] Verify the design tokens work consistently on Android, iOS, and web.

## App Structure

- [x] Replace starter Expo content with the application's actual home screen.
- [x] Define the final navigation structure in `src/app/`.
- [x] Keep route screens in `src/app/` and reusable UI in `src/components/`.
- [x] Add reusable components for repeated application patterns.
- [ ] Add reusable hooks for shared behavior and state.

## Assets

- [x] Organize production images in `assets/images/`.
- [ ] Add density variants such as `@2x` and `@3x` where needed.
- [x] Replace starter Expo icons and images with application branding.
- [ ] Confirm app icon, splash screen, Android adaptive icon, and web favicon configuration in `app.json`.

## Quality and Release

- [ ] Add loading, empty, error, and offline states to each production screen.
- [ ] Test layouts on Android, iOS, and web.
- [x] Run `npm run lint`.
- [x] Run `npx tsc --noEmit`.
- [x] Run `npx expo-doctor`.
- [ ] Review accessibility labels, color contrast, touch targets, and keyboard behavior.
- [ ] Configure EAS build profiles before release.
