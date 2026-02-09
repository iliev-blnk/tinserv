# TinSerV Chișinău 🕊️

> **"Schimbă-te pentru a schimba"** (Change yourself to change)

TinSerV Chișinău is a modern, high-performance web platform designed for the Youth in Volunteer Service organization. It serves as a central hub for organizing volunteer activities, connecting dedicated youth with community projects, and tracking social impact in the Chișinău region.

## ✨ Features

- 🌍 **Multi-language Support**: Fully localized in Romanian and Russian.
- ⏳ **Event Countdown**: Real-time countdown timer to the next major volunteer event.
- 📝 **Registration System**: Dedicated registration page with integrated data collection.
- 📊 **Google Sheets Integration**: Submissions are automatically saved to Google Sheets via a custom API script.
- 📱 **Mobile Responsive**: Optimized for all devices with specific fixes for modal scrolling and touch interactions.
- 🎨 **Premium UI/UX**: Dark-themed aesthetic featuring glassmorphism, glowing accents, and smooth animations using Tailwind CSS v4.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iliev-blnk/tinserv.git
   cd tinserv
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Google Sheets Setup

The registration form requires a Google Apps Script backend to save submissions. 
Please refer to the [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) (check artifacts if not in root) for detailed instructions on:
1. Creating the Google Sheet.
2. Deploying the Apps Script.
3. Connecting the Web App URL to the React frontend.

## 📁 Project Structure

- `src/components`: UI components (Hero, Stats, Testimonials, etc.)
- `src/pages`: Main pages (Home Layout, Registration)
- `src/contexts`: Global state management for language and theme.
- `src/translations.ts`: Source of truth for all localized strings.

## 📄 License

This project is private and intended for the use of TinSerV Chișinău.

---
Made with ❤️ for a better world.
