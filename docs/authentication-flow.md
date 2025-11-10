# Authentication Flow Documentation

## Overview

The admin dashboard is now fully protected with role-based authentication. Only users with the `ADMIN` role can access the admin dashboard at `/admin`.

## Authentication Features

### 1. **Protected Admin Routes**
- All routes under `/admin/*` are protected
- Requires authentication and `ADMIN` role
- Unauthorized users are redirected to home page (`/`)

### 2. **Token Persistence**
- Access tokens are stored in `localStorage`
- Auth state is automatically restored on page reload
- Tokens are checked for expiration

### 3. **Role-Based Redirection**
- After login, users are redirected based on their role:
  - `ADMIN` → `/admin` (Dashboard)
  - `HOST` → Current page (or custom redirect)
  - `CUSTOMER` → Current page (or custom redirect)

### 4. **Logout Functionality**
- Clears token from localStorage
- Resets auth state in Redux
- Redirects to home page

## Authentication Flow

### Login Process

```
1. User opens Login Modal
   ↓
2. Enters email/phone + password
   ↓
3. API call to /api/v1/auth/login
   ↓
4. Server returns JWT token
   ↓
5. Token stored in:
   - Redux store (state.auth.token)
   - localStorage (accessToken)
   ↓
6. JWT decoded to extract user info
   ↓
7. User data stored in Redux (state.auth.user)
   ↓
8. Role-based redirect:
   - ADMIN → /admin
   - Others → stay on current page
```

### Page Reload Process

```
1. App mounts
   ↓
2. AuthInitializer runs
   ↓
3. Checks localStorage for accessToken
   ↓
4. If token exists and not expired:
   - Decode token
   - Restore user data to Redux
   - Restore auth state
   ↓
5. If token expired or missing:
   - Clear localStorage
   - User remains unauthenticated
```

### Admin Dashboard Access

```
1. User navigates to /admin
   ↓
2. ProtectedRoute wrapper checks:
   - Is user authenticated?
   - Does user have ADMIN role?
   ↓
3. If YES:
   - Display admin dashboard
   ↓
4. If NO:
   - Show loading screen briefly
   - Redirect to home page (/)
```

### Logout Process

```
1. User clicks Logout button (in sidebar)
   ↓
2. Dispatch logout() action
   ↓
3. Redux state cleared:
   - user: null
   - token: null
   - isAuthenticated: false
   ↓
4. localStorage.removeItem('accessToken')
   ↓
5. Redirect to home page (/)
```

## File Structure

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx        # Route protection wrapper
│   ├── dashboard/
│   │   ├── Sidebar.tsx               # Logout button + user display
│   │   └── Header.tsx                # Dashboard header
│   ├── modals/
│   │   └── LoginModal.tsx            # Login form + role redirect
│   └── AuthInitializer.tsx           # Restores auth on page load
├── hooks/
│   └── useAuthPersistence.ts         # Hook for auth restoration
├── lib/
│   ├── api/
│   │   ├── auth.ts                   # Auth API calls
│   │   └── client.ts                 # API client with auth
│   ├── redux/slices/
│   │   └── authSlice.ts              # Auth state management
│   └── utils/
│       └── jwt.ts                    # JWT decode utilities
└── app/
    ├── layout.tsx                    # Root layout with AuthInitializer
    └── (dashboard)/
        └── layout.tsx                # Protected dashboard layout
```

## Key Components

### 1. ProtectedRoute Component

Located: `src/components/auth/ProtectedRoute.tsx`

**Purpose:** Wraps protected routes and ensures user has required role

**Features:**
- Checks authentication status
- Validates user role
- Shows loading state during check
- Redirects unauthorized users

**Usage:**
```tsx
<ProtectedRoute requiredRole="ADMIN" redirectTo="/">
  <DashboardContent />
</ProtectedRoute>
```

### 2. AuthInitializer Component

Located: `src/components/AuthInitializer.tsx`

**Purpose:** Restores auth state from localStorage on app mount

**Features:**
- Runs only on client side
- Checks token expiration
- Restores user data from JWT
- Clears expired tokens

**Usage:**
```tsx
<StoreProvider>
  <AuthInitializer />
  {children}
</StoreProvider>
```

### 3. useAuthPersistence Hook

Located: `src/hooks/useAuthPersistence.ts`

**Purpose:** Hook that handles auth state restoration

**Features:**
- Reads token from localStorage
- Validates token expiration
- Dispatches user and token to Redux
- Runs on component mount

### 4. Auth Slice

Located: `src/lib/redux/slices/authSlice.ts`

**State:**
```typescript
{
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

**Actions:**
- `setUser(user)` - Set authenticated user
- `setToken(token)` - Set and persist auth token
- `logout()` - Clear auth state and localStorage
- `setLoading(loading)` - Set loading state
- `setError(error)` - Set error message
- `clearError()` - Clear error message

## User Roles

### ADMIN
- Full access to admin dashboard
- Can manage all resources
- Access to `/admin/*` routes

### HOST
- Can create and manage listings
- Limited admin access (future)
- Access to host-specific routes

### CUSTOMER
- Can browse and book services
- No admin access
- Access to public routes only

## Security Notes

1. **JWT Decoding:** Client-side JWT decoding is for reading claims only, not for security validation
2. **Token Storage:** Tokens in localStorage are vulnerable to XSS attacks - ensure proper input sanitization
3. **Token Expiration:** Expired tokens are automatically cleared
4. **API Security:** All sensitive API endpoints should validate JWT server-side
5. **Role Validation:** Role checks happen both client-side (for UX) and should be validated server-side

## Testing the Flow

### Test Admin Login

1. Open the login modal
2. Login with admin credentials:
   ```
   Email: admin@example.com
   Password: your-password
   ```
3. Verify redirect to `/admin`
4. Check that user data appears in sidebar
5. Refresh page - should stay logged in
6. Click logout - should redirect to home

### Test Non-Admin Login

1. Login with HOST or CUSTOMER credentials
2. Verify user stays on current page
3. Try to access `/admin` manually
4. Should be redirected to home page

### Test Protected Route

1. Without logging in, try to access `/admin`
2. Should show loading briefly then redirect to `/`
3. Login as admin
4. Access to `/admin` should be granted

## Future Enhancements

- [ ] Add "Remember Me" functionality with longer-lived tokens
- [ ] Implement refresh token mechanism
- [ ] Add password reset flow
- [ ] Implement 2FA for admin accounts
- [ ] Add session timeout warnings
- [ ] Log auth events for security auditing
- [ ] Add role-based feature flags
- [ ] Implement HOST dashboard protection
