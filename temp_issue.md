## Overview
YTuzo is evolving from a pure financial tracker into a comprehensive "Life OS" that tracks daily activities across multiple pillars: Finance, Sports, and Vehicles.

## 1. Database Restructuring (SQLite Offline-First)
Currently, the local database only has a `transactions` table. We need to normalize and expand this:
- [ ] Create `finance_logs` table (Income/Expense).
- [ ] Create `sport_logs` table (Type, Distance, Duration, Calories).
- [ ] Create `fuel_logs` table (Odometer, Liters, Price, Location).
- [ ] Create a unified SQL View (`daily_activities`) to aggregate all logs by `created_at` for a polymorphic feed.
- [ ] Implement `sync_status` mechanism for future PostgreSQL synchronization.

## 2. Navigation & UI Architecture
The current bottom tab navigation is limited to Home and Settings.
- [ ] Expand Bottom Tab Navigation to 5 pillars: **Home, Finance, Sports, Vehicle, Settings**.
- [ ] Create empty screen templates for the new tabs (Finance, Sports, Vehicle) inside `app/(tabs)/`.

## 3. Super Dashboard (Home Screen)
Redesign `app/(tabs)/index.tsx` to act as a central command hub.
- [ ] Replace the massive balance card with 3 modular "Bento Box" widgets (Finance Balance, Weekly Sports Stats, Vehicle Fuel Efficiency).
- [ ] Update Quick Actions to be cross-module (e.g., `+ Uang`, `+ Lari`, `+ Bensin`).
- [ ] Update the `RecentActivityList` to display the unified `daily_activities` polymorphic feed.

## Next Steps
Pick up the database restructuring first to lay the foundation for the new UI components.
