# Protein Price Tracker

A React application to track and compare protein prices across different stores.

## Setup Instructions

1. Clone the repository or download the source code

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=AIzaSyABYAR25uppLF70HPjUtOPYSzwcsZZel5w
VITE_FIREBASE_AUTH_DOMAIN=bolt---prot-comparateur.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=bolt---prot-comparateur
VITE_FIREBASE_STORAGE_BUCKET=bolt---prot-comparateur.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=659608471676
VITE_FIREBASE_APP_ID=1:659608471676:web:3749cc8722b82d6068a1f9
VITE_FIREBASE_MEASUREMENT_ID=G-KCV279N2K9
```

4. Start the development server:
```bash
npm run dev
```

## Firebase Security Rules

Add these security rules to your Firebase Console (Firestore Database > Rules):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      match /products/{productId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      
      match /stores/{storeId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## Project Structure

```
src/
├── components/         # React components
├── lib/               # Utilities and Firebase configuration
├── hooks/             # Custom React hooks
└── types/             # TypeScript type definitions
```

## Features

- User authentication
- Add and track protein products
- Compare prices across different stores
- Filter products by type (vegan, cheese, promotions)
- Search functionality
- Real-time updates with Firebase