# User Directory App

A responsive React.js application built with TypeScript and Tailwind CSS.  
The app fetches user data from a public API and supports real-time search, filtering by city and company, and clearing filters.  

---

## Features

- API Integration – Fetches data from https://jsonplaceholder.typicode.com/users  
- Responsive UI – Mobile-first design with Tailwind CSS  
- Real-Time Search – Search users by name as you type  
- Filter by City – Dropdown with unique, sorted city options  
- Filter by Company – Dropdown with unique, sorted company options  
- Clear Filters – Reset search and all filters in one click  
- Performance Optimized – Filtering and dropdowns memoized with useMemo  
- Error & Loading States – Graceful handling of API requests  

---

## Tech Stack

- React.js  
- TypeScript  
- Tailwind CSS  
- Vite  

---

## Project Structure

src/  
 ├── components/    # Reusable UI components  
 ├── services/      # Service to take on API  
 ├── types/         # TypeScript interfaces  
 ├── App.tsx        # Root component  
 ├── index.css      # CSS File for Tailwind  
 ├── main.tsx       # Entry point  
 └── vite-env.d.ts  # Vite type definitions  

---

## Setup Instructions

1. Clone the repository
   git clone https://github.com/dannysteve0693/interview-test-react-finology.git
   cd user-directory-app

2. Install dependencies
   npm install

3. Create environment file
   cp .env.example .env

   Add the following:
   VITE_API_URL=https://jsonplaceholder.typicode.com/users

4. Run the app
   npm run dev

---

## Assumptions & Explanations

1. API Integration  
   - Assumed the API is stable and no auth required.  
   - Implemented fetch with loading and error states.  

2. Data Display  
   - Only required fields (Name, Email, City, Company, Phone, Website) are displayed.  
   - Responsive layout for mobile & desktop.  

3. Filtering System  
   - Filters apply with AND logic (matchName && matchCity && matchCompany).  
   - Real-time search is case-insensitive.  

4. Unique Dropdown Values  
   - Cities/companies may repeat, so I used new Set() for uniqueness, converted with Array.from(), and sorted alphabetically.  
   - Memoized with useMemo to avoid recalculation.  

5. State Management  
   - Used React hooks (useState, useEffect, useMemo) since app is small.  
   - No external state library added for simplicity.  

6. Environment Variables  
   - Vite requires env vars to start with VITE_.  
   - TypeScript typing added with vite-env.d.ts.  

7. UI/UX  
   - Added hover effects, spacing, responsive breakpoints, and clear filter button for better usability.  

---

## Screenshots (Optional)

### Home Page
![Home Page](./screenshots/home.png)


---

## License

MIT License
