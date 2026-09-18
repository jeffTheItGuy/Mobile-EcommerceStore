# Nimbusurf Mobi Store

Ecommerce mobile store app built with React Native and Expo.

## Project Name

    nimbusurf-mobistore

## App Display Name

    Nimbusurf Mobi Store

## Stack

- Expo SDK 57
- Node 22
- TypeScript
- React Navigation
- Expo EAS

## Setup

Use Node 22:

    nvm use 22

Install dependencies:

    npm install

Install Expo-compatible packages:

    npx expo install react react-native
    npx expo install expo-status-bar expo-font expo-splash-screen expo-image
    npx expo install react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated react-native-svg
    npx expo install @react-native-async-storage/async-storage
    npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @react-navigation/drawer
    npx expo install @tanstack/react-query zustand
    npx expo install typescript @types/react
    npx expo install --fix

Start the app:

    npx expo start

## EAS Build

Login to Expo:

    npx eas login

Initialize EAS:

    npx eas init

Build:

    npx eas build --platform android
    npx eas build --platform ios
