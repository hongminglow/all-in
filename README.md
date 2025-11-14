# 🎲 ALL IN (孤注一掷) - Casino Gaming Platform

> **Roll the dice and change your fortune!** 🎰
> A modern, interactive casino betting platform built with React, TypeScript, and cutting-edge web technologies.

---

## 🌟 Overview

**ALL IN** is a full-featured casino gaming platform where players can engage in multiple betting games, compete across different room tiers, and experience real-time multiplayer action. With support for **English & Chinese (中文)**, responsive design, and immersive audio, ALL IN delivers an engaging gaming experience.

---

## 🎮 Game Modes & Betting Rooms

Our casino features diverse game modes tailored to different player skill levels and budgets:

| Room                     | Description                               | Bet Range   | Max Players | Tier    |
| ------------------------ | ----------------------------------------- | ----------- | ----------- | ------- |
| **Beginner's Luck**      | Perfect for newcomers learning the ropes  | $10 - $100  | 500         | Regular |
| **Lightning Rounds** ⚡  | Fast-paced, high-frequency betting rounds | $50 - $500  | 1,000       | VIP     |
| **High Roller Suite** 👑 | Premium stakes for seasoned players       | $500 - $10k | 100         | VVIP    |
| **Private Lounge** 🏆    | Exclusive private betting experience      | $1k - $50k  | 50          | VVIP    |
| **Fortune Hall** 🏛️      | Classic mid-range betting arena           | $25 - $250  | 1,000       | Regular |
| **Speed Dice Arena** 🎯  | Ultra-fast dice rolls & instant payouts   | $100 - $1k  | 500         | VIP     |

---

## ✨ Current Features

### 🔐 Authentication & Security

- Secure user login & registration with email/password validation
- JWT-based session management with token expiry
- Protected routes with role-based access control (Regular, VIP, VVIP)
- Automatic logout on invalid/expired tokens

### 🎨 User Experience

- **Bilingual Support**: English & Chinese with instant language switching
- **Responsive Design**: Mobile-first layout with Tailwind CSS
- **Dark Theme**: Eye-friendly purple/indigo gradient interface
- **Real-time Stats**: Live player counts, daily winnings, games played

### 💰 Betting System

- Multi-tier room access based on user roles
- Dynamic bet limits per room (min/max)
- Currency formatting with thousand separators
- Compact number display (1.2k, 1.5M) for large values

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+ (recommended 20+)
- npm 9+

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd all-in

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Test Account

To clone and try the application, use the following mocked credentials:

- **Username**: `admin`
- **Password**: `password`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── base/              # Reusable form inputs (TextInput, PasswordInput)
│   ├── layout/            # Auth/Protected layouts, Header, LoadingSkeleton
│   └── ui/                # Radix UI + shadcn/ui components
├── features/
│   ├── auth/              # Authentication hooks & schemas
│   └── bet/               # Betting room components & logic
├── pages/
│   ├── auth/              # LoginPage, SignUpPage
│   ├── BetPage            # Main betting arena
│   ├── HomePage           # Dashboard & stats
│   ├── ErrorPage          # 404/error handling
│   └── lab/               # Testing/experimental features
├── store/
│   ├── useUserStore       # Global user state (Zustand)
│   └── useGlobalStore     # App-wide state
├── utils/
│   ├── format.ts          # formatCurrency, formatCompactNumber
│   ├── general.ts         # Helper utilities
│   ├── token.ts           # JWT creation/parsing
│   └── permission.ts      # Role-based access control
├── constants/             # Routes, auth roles, betting room config
├── types/                 # TypeScript interfaces
├── assets/
│   ├── audio/             # BGM & sound effects
│   └── locales/           # i18n translation files (en.json, zh.json)
└── hooks/
    └── usePlayMusic       # Audio playback hook
```

---

## 🔮 Future Roadmap & Enhancements

### 🎲 Game Mode Expansions

- [ ] **Roulette** 🎡 - Classic spinning wheel betting
- [ ] **Blackjack** 🃏 - Card game showdown
- [ ] **Poker** 🎰 - Head-to-head multiplayer poker
- [ ] **Slots** 🎯 - Progressive jackpot machines
- [ ] **Baccarat** 👗 - Elegant card betting
- [ ] **Craps** 🎪 - Dice-rolling strategy game
- [ ] **Tournament Mode** 🏅 - Seasonal leaderboards & prize pools

### 💎 Premium Features

- [ ] **Live Chat** 💬 - Real-time player communication
- [ ] **Live Streaming** 📹 - Watch dealers & high-stakes games
- [ ] **Referral System** 👥 - Earn rewards for inviting friends
- [ ] **VIP Rewards Program** 🎁 - Exclusive perks & bonuses
- [ ] **Achievement Badges** 🏆 - Unlock milestones
- [ ] **Replay System** 📹 - Watch past games
- [ ] **Advanced Statistics** 📊 - Detailed win/loss analytics

### 🎵 Audio & Ambience

- [ ] **Dynamic Music** 🎶 - Context-aware soundtrack (win/lose/tension)
- [ ] **Sound Effects Library** 🔊 - Chips dropping, wheel spinning, cards shuffling
- [ ] **Volume Presets** 🔉 - Customizable audio profiles

### 🌍 Platform Expansion

- [ ] **Mobile App** 📱 - iOS/Android native apps
- [ ] **API Integration** 🔌 - Real payments (Stripe, PayPal)
- [ ] **Multi-Language** 🗣️ - Spanish, Japanese, Korean, etc.
- [ ] **Social Leaderboards** 🏅 - Global player rankings
- [ ] **Spectator Mode** 👀 - Watch friends play live

### 🛡️ Security & Compliance

- [ ] **KYC Verification** 🆔 - Know Your Customer checks
- [ ] **Responsible Gaming** ⚠️ - Deposit limits, self-exclusion
- [ ] **Audit Logs** 📋 - All transaction tracking
- [ ] **Anti-Cheat System** 🚨 - Fair play enforcement

### ⚡ Performance & DevOps

- [ ] **Web3 Integration** 🔗 - Blockchain verification & NFT rewards
- [ ] **CDN Deployment** 🌐 - Global edge caching
- [ ] **Load Testing** 🔥 - Handle 10k+ concurrent players
- [ ] **Analytics Dashboard** 📈 - Player behavior insights

---

## 📄 License

This project is licensed under the MIT License — see LICENSE file for details.

---

**🎲 Ready to play? Start rolling the dice and change your fortune! 🎲**
