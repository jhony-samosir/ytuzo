# ⚡ YTuzo — Your Universal Life OS

<p align="center">
  <img src="./assets/images/icon.png" width="200" alt="YTuzo Logo" style="border-radius: 40px;" />
</p>

YTuzo is a stunning, high-performance **Universal Life OS** built with React Native and Expo. Originally conceived as a financial tracker, YTuzo has evolved into a comprehensive command center for your daily activities—seamlessly integrating your **Finances, Sports/Fitness, and Vehicle (Fuel) Tracking** into a single, unified "Cyber-Zen" interface.

## ✨ Core Pillars

1. 💰 **Finance Tracker**: Log daily incomes and expenses. Track your cash flow with high-tech analytics.
2. 🏃‍♂️ **Sports Tracker**: Keep track of your runs, cycling, distance, duration, and calories burned.
3. 🚗 **Vehicle & Fuel Tracker**: Log your odometer readings and fuel consumption to automatically calculate vehicle efficiency.

## 🎨 Design Philosophy ("Cyber-Zen")
YTuzo breaks away from boring, generic app designs. We embrace a futuristic **"Cyber-Zen / Neon Zest"** aesthetic:
- **Midnight Carbon** background (`#09090B`) for OLED-friendly deep contrast.
- **Yuzu Yellow & Blaze Orange** gradients for high-energy neon glows.
- **Asymmetrical Geometries**: Using sharp shield/leaf radius shapes instead of standard soft rounded corners, creating a distinct and memorable brand identity.

## 🏗️ Architecture

YTuzo is engineered for speed, privacy, and reliability.

### Offline-First Architecture (SQLite)
The app runs on an **Offline-First** model powered by `expo-sqlite`. All user logs (transactions, sports, fuel) are instantly saved locally to the device. 
- Fast, instant UI updates without network latency.
- Usable completely offline (e.g., tracking a run on a mountain or logging fuel in a remote area).

### Future Cloud Sync (PostgreSQL)
A robust synchronization engine is integrated into the database schema (`sync_status` columns). Once connected to a backend, the app intelligently syncs pending logs in the background to a secure PostgreSQL cloud database.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/)
- **Toolset**: [Expo SDK](https://expo.dev/)
- **Routing**: [Expo Router (File-based routing)](https://docs.expo.dev/router/introduction/)
- **Database**: `expo-sqlite` (Local-first)
- **Styling**: Vanilla React Native StyleSheet (Optimized for Native performance)
- **Icons**: `expo-symbols` (Native SF Symbols / Material Icons) & `@expo/vector-icons`

## 🚀 Getting Started

### Prerequisites
- Node.js LTS
- Expo Go app on your physical device (iOS/Android) OR a configured emulator.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jhony-samosir/ytuzo.git
   cd ytuzo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start
   ```

4. Open the app:
   - Scan the QR code with your phone camera (iOS) or Expo Go app (Android).
   - Press `a` in the terminal to open an Android emulator.
   - Press `i` to open an iOS simulator.

## 🤝 Contributing
Refer to our [GitHub Issues](https://github.com/jhony-samosir/ytuzo/issues) page to view the current roadmap and epic plannings for the Universal Life OS refactor.

## 📄 License
This project is proprietary and confidential. All rights reserved.
