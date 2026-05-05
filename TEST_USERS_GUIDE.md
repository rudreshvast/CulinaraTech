# CulinaraTech - Test Users Setup Guide

## Overview
This guide explains how to set up and use the test user accounts for the CulinaraTech application.

## Features Implemented ✅

### 1. **Success Message on Signup**
- When a user successfully creates an account, a success toast notification appears
- The message displays: `"Welcome [Name]! Your account has been created."`
- User is automatically redirected to the dashboard after 2 seconds

### 2. **Profile Icon & Logout on Navbar**
- When a user is **logged in**, the navbar displays:
  - A **Profile Icon** (User avatar) in the top-right
  - A **Dashboard** button
  - A dropdown menu with:
    - User's email
    - Profile link
    - Logout button (with red styling)

- When a user is **logged out**, the navbar shows:
  - Login link
  - Get Started button

### 3. **Test User Accounts**

Two hardcoded test users have been created for testing:

#### Test User 1 (Student)
```
Email: student@example.com
Password: password123
Role: Student
```

#### Test User 2 (Instructor)
```
Email: instructor@example.com
Password: password456
Role: Instructor
```

## How to Create Test Users

### Option 1: Using the Seed Script (Recommended)

1. Navigate to the backend directory:
```bash
cd /home/rudreshl/CulinaraTech/backend
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Ensure your database is running and connected

4. Run the seed script:
```bash
npm run seed
```

5. You should see output like:
```
✅ Created test user: student@example.com with password: password123
✅ Created test user: instructor@example.com with password: password456

📋 Test Credentials:
==================================================
Email: student@example.com
Password: password123
--------------------------------------------------
Email: instructor@example.com
Password: password456
==================================================
```

### Option 2: Manual Signup

You can also create test users manually through the signup flow:

1. Go to http://localhost:3000/auth/signup
2. Fill in the signup form with test data
3. Complete all 3 steps (Role, Details, Interests)
4. Click "Create Account"
5. You'll see a success message
6. You'll be redirected to the dashboard

## How to Test the Features

### Test 1: Signup Success Message
1. Go to signup page
2. Create a new account with any email
3. Verify success toast appears with custom message
4. Verify redirect to dashboard after 2 seconds

### Test 2: Login & Profile Icon
1. Go to http://localhost:3000/auth/login
2. Login with test credentials:
   - Email: `student@example.com`
   - Password: `password123`
3. After login, verify:
   - Navbar shows "Dashboard" button
   - User icon appears in top-right
   - Clicking the icon shows dropdown menu

### Test 3: Logout
1. While logged in, click the profile icon
2. Click "Logout" from the dropdown
3. Verify you're redirected to home page
4. Verify navbar now shows "Login" and "Get Started" buttons

### Test 4: Profile Icon Display
1. Login with test credentials
2. Check navbar - should show:
   - Profile icon with user initial
   - Dashboard button
   - Dropdown menu with email and options

## Database Setup (If Needed)

If the seed script fails, ensure:

1. PostgreSQL is running on your system
2. Database is created and accessible
3. Environment variables are set correctly in `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=culinaratech
```

## Architecture

### Frontend Changes
- **SignupForm.tsx**: Added success toast notification with 2-second delay before redirect
- **navbar.tsx**: Already had profile icon and logout functionality integrated
- **Auth Store (Zustand)**: Manages authentication state globally

### Backend Changes
- **seed.ts**: New seed script that creates test users with bcrypt-hashed passwords
- **package.json**: Added `npm run seed` script

### Authentication Flow
1. User signs up with email/password
2. Backend hashes password with bcrypt
3. User data stored in PostgreSQL database
4. On login, password is verified against hash
5. JWT token is issued
6. Token stored in Zustand store (persisted to localStorage)
7. Token sent with all API requests via interceptor

## Troubleshooting

### Issue: Seed script not found
**Solution**: Make sure you're in the `/backend` directory and run `npm run seed`

### Issue: Connection refused (database)
**Solution**: Ensure PostgreSQL service is running:
```bash
# On Linux/Mac
brew services start postgresql

# On Windows
net start postgresql-14
```

### Issue: Test users already exist
**Solution**: The seed script checks for existing users and won't create duplicates. To reset:
1. Delete the test users from the database, or
2. Modify the seed script to use different emails

### Issue: Password not working after signup
**Solution**: Make sure you use the exact password you entered during signup. Passwords are case-sensitive.

## Security Notes

⚠️ **Important**: These test credentials are for development only!
- Never use `password123` or `password456` in production
- Always use strong, unique passwords in production
- The `src/seed.ts` file should be removed before deploying to production
- Ensure the seed script is not accessible in production builds

## Testing Checklist

- [ ] Test users can be created via seed script
- [ ] Signup page shows success message
- [ ] Profile icon appears when logged in
- [ ] Logout button works correctly
- [ ] Navbar updates when logging in/out
- [ ] Token persists across page refreshes (stored in localStorage)
- [ ] Protected routes redirect to login when not authenticated

## Next Steps

1. Run the seed script to create test users
2. Test login with the provided credentials
3. Verify profile icon and logout functionality
4. Create more test users as needed via signup flow

---

**Created**: May 2026
**Version**: 1.0
