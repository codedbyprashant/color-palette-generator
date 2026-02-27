# Color Palette Generator

A modern, feature-rich color palette generator built with React and Tailwind CSS.

## Features

- 🎨 **Random Palette Generation** – Generate beautiful color palettes with one click or press Spacebar
- 🔒 **Lock Colors** – Lock individual colors to keep them while regenerating the rest
- 📋 **Copy Values** – Click any color to copy its HEX value to clipboard
- 💾 **Save Palettes** – Save your favorite palettes and view them anytime
- 📤 **Export Options** – Export palettes as JSON, CSS variables, or Tailwind config
- 🌙 **Dark Mode** – Toggle between light and dark themes (persisted in localStorage)
- 🔢 **Adjustable Count** – Choose between 3 and 10 colors per palette
- 📱 **Responsive Design** – Works on all screen sizes

## Getting Started

### Prerequisites

- Node.js 14+
- npm 6+

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

## Usage

- **Generate**: Click the **Generate** button or press **Spacebar**
- **Lock**: Click the 🔓 icon on any color card to lock it
- **Copy HEX**: Click anywhere on a color card to copy its HEX value
- **Save**: Click **Save** to store the current palette
- **Export**: Click **Export** to get JSON, CSS variables, or Tailwind config output
- **Dark Mode**: Click the 🌙/☀️ button in the header to toggle theme

## Technology Stack

- [React 17](https://reactjs.org/) – UI framework
- [Tailwind CSS 2](https://tailwindcss.com/) – Utility-first CSS
- [Create React App](https://create-react-app.dev/) – Build tooling
- LocalStorage – Palette and theme persistence
