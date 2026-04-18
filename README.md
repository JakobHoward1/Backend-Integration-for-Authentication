Assignment 4 – Group 4

*****Features*****
Users can sign up using an email and password
Users can sign in using an email and password
Form validation is handled with Zod and React Hook Form
Real-time error messages are shown for form inputs
Password confirmation is validated
Authentication is securely managed using Supabase


*****Tech Stack*****
Frontend: React Native (Expo)
Navigation: Expo Router
Forms & Validation: React Hook Form with Zod
Backend: Supabase (Authentication)
Language: TypeScript


*****Setup Instructions*****
Clone the repository from GitHub
Install dependencies:
> npm install
> npm install @supabase/supabase-js react-hook-form @hookform/resolvers zod

Create a .env.local file and add:
EXPO_PUBLIC_SUPABASE_URL=https://weubanlvvuyexayatbyo.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

Run the project:
npm run start
Use a test account or create a new one through the app
