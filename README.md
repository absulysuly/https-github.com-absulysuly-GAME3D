<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Peshmerga: The Golden Square – Tactical FPS Concept

This repository hosts a Next.js + Tailwind CSS experience that showcases the tactical FPS concept generated with the Gemini API. The application can run entirely from a cached concept bundle or dynamically regenerate fresh data through Gemini when an API key is supplied.

## Getting Started

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```
2. (Optional) Enable live Gemini generation by creating a `.env.local` file with:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```
   Without an API key the app falls back to the curated concept stored in `data/gameConcept.json`.
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   npm run start
   ```
