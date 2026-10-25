# Roam

A travel discovery app for Lagos. Find beaches, parks, galleries and food spots nearby, save the ones you like, plan day trips with several stops, follow turn-by-turn directions, and keep a photo journal of the places you visit.

Built with Expo and React Native.

## Features

- **Explore**: weekend picks, places near you, filters by category
- **Search**: recent searches, browse by mood, live results
- **Map**: Mapbox map with photo pins and a swipeable place carousel
- **Place details**: photos, facts, save, and directions
- **Trips**: plan a trip with dates and stops, then view the route and itinerary
- **Directions**: live location tracking, next turn, distance and time left, all steps
- **Field notes**: a timeline of photos and captions from your trips
- **Camera**: take photos with flash and front/back camera
- **Sign up**: email, one-time code, and name, as a multi-step flow
- **Profile**: stats, recent notes, settings, and a location on/off toggle

## Tech stack

| Area | Library |
| --- | --- |
| Framework | Expo SDK 58, React Native 0.88, React 19 |
| Navigation | Expo Router |
| Styling | NativeWind v5 (Tailwind CSS) |
| Maps and directions | @rnmapbox/maps, Mapbox Directions API |
| State | Zustand with AsyncStorage |
| Forms | react-hook-form and zod |
| Bottom sheets | @gorhom/bottom-sheet |
| Animation | Reanimated 4 |
| Device | expo-location, expo-camera, expo-image |

## Getting started

### 1. Requirements

- Node.js 20 or newer
- Xcode (iOS) or Android Studio (Android)
- A free [Mapbox](https://account.mapbox.com/) account for a public access token

The app uses native modules (Mapbox, camera), so it does **not** run in Expo Go. You need a development build.

### 2. Install

```bash
git clone https://github.com/Solomon13693/roam.git
cd roam
npm install
```

### 3. Add your keys

```bash
cp .env.example .env
```

Open `.env` and set your Mapbox public token (it starts with `pk.`):

```
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your-mapbox-public-token
```

`.env` is ignored by git, so your key stays on your machine.

### 4. Run

```bash
npx expo run:ios       # iOS simulator
npx expo run:ios --device   # your iPhone
npx expo run:android   # Android emulator or device
```

After the first build, you can start the dev server on its own:

```bash
npx expo start
```

## Scripts

```bash
npx expo lint     # lint
npx tsc --noEmit  # typecheck
npm run icons     # rebuild the icon set from assets/icons
```

## Project structure

```
src/
  app/          routes (Expo Router): tabs, auth, place, trip, notes, camera
  features/     one folder per screen, each with its own components
  components/   shared UI: buttons, chips, sheets, modals, icons, layout
  hooks/        location, camera, sheets, multi-step flows
  stores/       Zustand stores
  service/      API calls (Mapbox Directions)
  data/         sample places, trips and field notes
  constants/    colours and images
  lib/          helpers
assets/
  icons/        SVG icons (compiled by scripts/generate-icons.mjs)
  images/       app icon, splash, place photos
```

## Notes

- Places, trips and field notes are sample data in `src/data`. There is no backend yet.
- Directions use the Mapbox Directions API with the token from `.env`.
