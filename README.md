# Flowly: Optimize Your Dollars-to-Units Ratio

![Flowly Logo](https://placehold.co/50x50/66B2B2/FFFFFF?text=Flowly)

Flowly is a lightweight Progressive Web App (PWA) designed to optimize business efficiency by tracking and improving the dollars-to-units ratio, a key metric measuring revenue per unit of product moved. A higher ratio (e.g., $5/unit vs. $4/unit) indicates greater profitability. The app provides a clean, intuitive interface for managing transactions, monitoring inventory, and analyzing financial metrics, accessible on both desktop and mobile devices. Built as a personal tool, Flowly emphasizes simplicity, clarity, and responsiveness to deliver actionable insights for small business owners or individuals managing financial and inventory data.

## Table of Contents

1.  [Purpose](#purpose)
2.  [Key Features & Functionality](#key-features--functionality)
    - [Current Features](#current-features)
    - [Planned Features](#planned-features)
3.  [UI/UX Principles](#uiux-principles)
4.  [Brand Identity](#brand-identity)
5.  [Technology Stack](#technology-stack)
6.  [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Firebase Setup](#firebase-setup)
    - [Running Locally](#running-locally)
    - [Deployment to Vercel](#deployment-to-vercel)
7.  [Project Structure](#project-structure)
8.  [Contributing](#contributing)
9.  [License](#license)

---

## Purpose

The primary goal of Flowly is to enable users to:

- Track and optimize the dollars-to-units ratio for enhanced business efficiency.
- Manage transactions and inventory with a focus on clear, accessible data.
- Monitor key financial metrics, such as cash flow and unit stock, to drive profitability.

Flowly serves as a focused tool for users seeking to understand and improve their business's financial performance through a single, critical metric.

## Key Features & Functionality

### Current Features

- **User Authentication:** Secure email/password-based signup and login using Firebase Authentication.
- **Responsive Layout:** Adapts seamlessly to various screen sizes with a mobile-first design using Tailwind CSS.
- **Dashboard View:** A redesigned dashboard displaying key indicators, account balances, cash flow metrics, and recent transactions in clearly defined sections.
- **Combined Metrics Cards:**
  - **Key Indicators:** Displays Dollars per Unit Ratio and Total Units in Stock.
  - **Account Balances:** Shows an overview of total cash balance and individual active account balances.
  - **Cash Flowly:** Consolidates daily, weekly, monthly, and overall net cash flow.
- **Recent Transactions:** Shows the three most recent transactions on the dashboard.
- **Account and Unit Display:** Shows account names and user-defined unit labels (e.g., grams, items) across the app.
- **Navigation:** Hamburger menu with a sidebar containing links to Dashboard, Transactions, Accounts, Inventory, Settings, Reports, and a functional logout button.
- **Add Transaction:** Floating button opens a modal form with fields for transaction details, including an account dropdown and dynamic unit label.
- **Modal Functionality:** Close via "Cancel" button or overlay click.
- **Input Validation:** Basic client-side checks for required fields in authentication forms and transaction forms.
- **Multi-Account Management:** Create, rename, deactivate accounts with fields for name, balance, default account setting, and color indicators.
- **Transaction Management:** Full CRUD (Create, Read, Update, Delete) operations with delete verification.
  - Supports transaction types: Sale, Purchase, Expense, Gift.
  - Ability to sort, filter, and search transactions by date, customer/vendor, account, etc.
  - Fields: date, customer/vendor, account, money in/out, units, type, notes.
  - Mobile swipe actions for quick edit/delete.
- **Inventory Page:** Dedicated page for detailed management and overview of total units in stock and unit movement breakdown.
- **Financial Metrics:** Customizable unit definitions (e.g., grams, ounces) in settings.
  - Metrics: total units in stock, total cash balance, dollars-to-units ratio, net cash flow (daily, weekly, monthly).
- **UI/UX Enhancements:**
  - Light/dark theme toggle with persistence.
  - Sticky navbar and accessible "Add Transaction" button.
  - Color-coded monetary values (green for inflow, red for outflow).
  - New muted cyan and coral color scheme.
  - Roboto font for a clean, modern look.
- **Reports and Data Management:**
  - Export transactions to CSV.
  - Import bulk transactions from CSV.
  - Generate PDF reports summarizing cash flow and product movement.
- **Accessibility and Mobile Optimization:** Mobile-first design with touch-friendly UI.
- **Productivity and Safety:** Toast notifications for user feedback (success, error, info).
- **User Preferences:** Set default accounts and customizable unit labels.
- **Dedicated Pages:** Fully implemented Transactions, Accounts, Settings, Inventory, and Reports pages.
- **Landing Page:** A basic but cool landing page with placeholders for screenshot mockups, features, benefits, and call-to-actions for unauthenticated users.

### Planned Features (Future Enhancements)

- **Advanced Inventory:** Detailed product SKUs, low-stock alerts.
- **Reporting Enhancements:** More customizable reports, graphical visualizations.
- **User Roles:** Role-based permissions (Owner, Admin, Staff) for multi-user scenarios.
- **Session-based Undo/Redo:** For transaction modifications.
- **CMS Integration Potential:** For more complex product catalogs.

## UI/UX Principles

Flowly adheres to the following principles to ensure an effective user experience:

- **Simplicity:** Minimalist design avoids unnecessary complexity.
- **Efficiency:** Quick access to common tasks like adding transactions.
- **Clarity:** Metrics and data presented clearly for easy interpretation.
- **Consistency:** Uniform look and feel across the app.
- **Responsiveness:** Mobile-first design ensures usability on all devices.
- **Accessibility:** High contrast, keyboard navigation, and clear labeling.
- **Feedback:** Visual indicators and notifications for user actions.

## Brand Identity

Flowly's brand is minimalist and functional, reflecting its focus on tracking the "flow" of money and units. The interface prioritizes readability and data clarity, using color functionally (e.g., for inflows/outflows or account indicators) to enhance usability without visual clutter. The new muted cyan and coral color scheme provides a fresh, modern, and calming aesthetic.

## Technology Stack

- **Frontend:**
  - React (with Vite for fast development)
  - Tailwind CSS (for utility-first styling and responsiveness)
  - React Router DOM (for client-side routing)
  - React Context API (for global state management)
  - Zustand (optional, could be integrated for more complex state needs)
  - `react-hot-toast` (for toast notifications)
  - `react-icons` (for intuitive icons)
- **Backend/Database:**
  - Firebase (Authentication for user management, Cloud Firestore for NoSQL database, Hosting for deployment)
- **Utilities:**
  - `jspdf` & `jspdf-autotable` (for PDF report generation)
  - `papaparse` (for CSV parsing and generation)

## Getting Started

Follow these instructions to set up and run Flowly locally, or deploy it.

### Prerequisites

- Node.js (LTS version recommended)
- npm or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/flowly.git](https://github.com/your-username/flowly.git) # Replace with your repo URL
    cd flowly
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Firebase Setup

1.  **Create a Firebase Project:**
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Click "Add project" and follow the steps.
2.  **Enable Firebase Services:**
    - In your Firebase project, navigate to **Build > Authentication**. Click "Get started" and enable the **Email/Password** sign-in method.
    - Navigate to **Build > Firestore Database**. Click "Create database" and choose to start in **production mode**. Select a Cloud Firestore location (e.g., `nam5 (us-central)`).
3.  **Register a Web App:**
    - In your Firebase project overview, click the `</>` icon (Web) to "Add an app to get started".
    - Register your app and copy the Firebase configuration object.
4.  **Configure Environment Variables:**
    - Create a `.env` file in the root of your Flowly project (same level as `package.json`).
    - Paste your Firebase configuration into this file, prefixed with `VITE_` for Vite to expose them to the client-side:
      ```
      VITE_FIREBASE_API_KEY=YOUR_API_KEY
      VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
      VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
      VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
      VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
      VITE_FIREBASE_APP_ID=YOUR_APP_ID
      VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
      ```
5.  **Set up Firestore Security Rules:**

    - In the Firebase Console, go to **Firestore Database > Rules**.
    - Replace the default rules with the following to ensure secure data access for authenticated users:

      ```firestore
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          // Allow a user to create their own user document
          // and read/update their own user document (if needed for profile info)
          match /users/{userId} {
            allow read, create: if request.auth != null && request.auth.uid == userId;
            allow update: if request.auth != null && request.auth.uid == userId;
          }

          // Allow a user to create their own settings document
          // and read/update their own settings document
          match /users/{userId}/settings/{documentId} {
            allow read, write: if request.auth != null && request.auth.uid == userId;
          }

          // Allow a user to create, read, update, and delete their own accounts
          match /users/{userId}/accounts/{accountId} {
            allow read, write: if request.auth != null && request.auth.uid == userId;
          }

          // Allow a user to create, read, update, and delete their own transactions
          match /users/{userId}/transactions/{transactionId} {
            allow read, write: if request.auth != null && request.auth.uid == userId;
          }
        }
      }
      ```

    - Click "Publish Rules".

### Running Locally

```bash
npm run dev
# or
yarn dev
```
# flowly-app-5.0
