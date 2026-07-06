# The Odin Project - Where's Wally

## Summary

This is a photo tagging app using the same idea as the book "Where's Wally". The user will try to find the characters on an images and by clicking on the image in the correct place the user with notified if they have found Wally and his friends.

## Preview

[Walkthrough](https://youtu.be/5J-f95DTRos)

## Features

- User give a unique name for tracking score
- When the user clicks on the wally image they are prompted with a drop down to select character they have found.
- The dropdown updates when a character is found, so the selection decrease as the game goes on.
- The user is prompted when they are successful or unsuccessful.
- Once the user has found all the characters, they are redirected to the scoreboard page.
- On the scoreboard page, the user can see there own score and then the scoreboard underneath which shows the order of users from quickest to slowest.

## Technical Challenges Overcome

- Getting the users click coordinates on the wally image.
- Being able to update the dropdown when the user is successful.
- Problem with prisma V7
- Seeding the DB using prisma
- Calculating the score_time for the user.

## Key Learnings

- Using useSearchParams to keep track of the users_id
- Using getBoundingClientRect to get the users click coordinates inside a `<div>`.
- Changing the position of the dropdown if the user is too close to the side of the page.
- Using the loaders and action correctly to handle the loading of the page and users actions.
- Using state to handle the characters and checking with the found_characters table and removing them from the dropdown.
- Using a separate file to seed the DB to `createMany` using the prismaClient.
- taking a start_time when the game starts and End_time once the characters have all ben found. then working out what there score_time is in seconds.

## Technologies Used

- **Frontend:** HTML, CSS, Vite, eslint, React
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL, Prisma
- **Authentication:** CORS
- **Validation:** express-validator
- **Utilities:** dotenv
- **Deployment:** Netlify (Frontend), Render (Backend), Supabase (Database)

## Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (running locally or via a service like Railway)
- Git

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/SReddy-96/TOP-PHOTO-TAG.git
   cd TOP-PHOTO-TAG
   ```

2. Navigate to the backend directory (assuming it's in a `backend` folder; adjust if different):

   ```bash
   cd top-photo-tag-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables: Create a `.env` file in the backend root and add:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/blog_db"
   PORT=3000 (choose port number that works for you)
   FRONTEND_URL=http://localhost:5174
   AMOUNT_OF_CHARACTERS=5 (match these with characters in DB table)
   ```

   - Replace with your actual database URL and secrets.

5. Set up the database with Prisma:

   ```bash
   npx prisma migrate dev
   npx run seed
   npx prisma generate
   ```

6. Start the backend server:

   ```bash
   npm start
   ```

   The API will run on `http://localhost:3000` (adjust port if needed).

### Frontend Setup (User)

1. Open a new terminal and navigate to the user frontend directory (assuming it's in a `frontend` folder; adjust if different):

   ```bash
   cd ../top-photo-tag-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables: Create a `.env` file in the frontend root and add:

   ```env
   VITE_API_BASE_URL="http://localhost:3000" (match the backend port numbers)
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The user app will run on `http://localhost:5173`.

### Deployment

- **Backend:** Deploy to Render (or similar) by connecting your repo and setting environment variables.
- **Frontend (User):** Deploy to Netlify (or similar) by connecting your repo and setting `VITE_API_BASE_URL` to your deployed database direct connection URL.
- **Database:** Deploy similarly, make sure to migrate and seed appropriately.

For production, ensure CORS are configured securely.
