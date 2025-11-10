# Redux and Error Boundaries Guide

This document provides comprehensive information about Redux state management and Error Boundaries integration in Arvion Rent.

## Table of Contents

1. [Redux Setup](#redux-setup)
2. [Error Boundaries](#error-boundaries)
3. [Usage Examples](#usage-examples)

---

## Redux Setup

### Overview

Redux Toolkit is configured for global state management in the Next.js App Router application.

### Architecture

```
src/lib/redux/
├── store.ts          # Redux store configuration
├── hooks.ts          # Typed hooks (useAppDispatch, useAppSelector)
├── StoreProvider.tsx # Client-side Redux Provider
└── slices/
    ├── authSlice.ts  # Authentication state
    └── uiSlice.ts    # UI state (language, theme, modals)
```

### Store Configuration

The store is configured with:
- **Auth Slice**: User authentication and profile data
- **UI Slice**: UI state (language, theme, sidebar, modals, notifications)
- Redux DevTools (enabled in development)
- Serialization check middleware

### Usage

#### 1. Using Redux Hooks

```typescript
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setLanguage, addNotification } from '@/lib/redux/slices/uiSlice';
import { setUser, logout } from '@/lib/redux/slices/authSlice';

function MyComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const language = useAppSelector((state) => state.ui.language);

  const handleLogin = () => {
    dispatch(setUser({
      id: '123',
      email: 'user@example.com',
      name: 'John Doe',
      role: 'user'
    }));

    dispatch(addNotification({
      type: 'success',
      message: 'Logged in successfully!'
    }));
  };

  const handleLanguageChange = () => {
    dispatch(setLanguage('bn'));
  };

  return (
    <div>
      <p>User: {user?.name}</p>
      <p>Language: {language}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLanguageChange}>Switch to Bengali</button>
    </div>
  );
}
```

#### 2. Auth Slice Actions

```typescript
// Available actions
import {
  setUser,      // Set user data
  setToken,     // Set auth token
  setLoading,   // Set loading state
  setError,     // Set error message
  logout,       // Clear user data
  clearError,   // Clear error message
} from '@/lib/redux/slices/authSlice';

// Example
dispatch(setUser({ id: '1', email: 'user@example.com', name: 'User', role: 'user' }));
dispatch(setToken('jwt-token'));
dispatch(logout());
```

#### 3. UI Slice Actions

```typescript
// Available actions
import {
  setLanguage,          // Set language ('en' | 'bn')
  setTheme,             // Set theme ('light' | 'dark' | 'system')
  toggleSidebar,        // Toggle sidebar
  setSidebarOpen,       // Set sidebar state
  toggleMobileMenu,     // Toggle mobile menu
  setMobileMenuOpen,    // Set mobile menu state
  openModal,            // Open specific modal
  closeModal,           // Close specific modal
  closeAllModals,       // Close all modals
  addNotification,      // Add notification
  removeNotification,   // Remove notification
  clearNotifications,   // Clear all notifications
} from '@/lib/redux/slices/uiSlice';

// Examples
dispatch(setLanguage('bn'));
dispatch(setTheme('dark'));
dispatch(openModal('loginOpen'));
dispatch(addNotification({ type: 'success', message: 'Action completed!' }));
```

#### 4. Creating New Slices

```typescript
// src/lib/redux/slices/exampleSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ExampleState {
  data: string[];
  loading: boolean;
}

const initialState: ExampleState = {
  data: [],
  loading: false,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<string[]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setData, setLoading } = exampleSlice.actions;
export default exampleSlice.reducer;
```

Then add to store:

```typescript
// src/lib/redux/store.ts
import exampleReducer from './slices/exampleSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
      example: exampleReducer, // Add new slice
    },
    // ...
  });
};
```

---

## Error Boundaries

### Overview

Error boundaries catch React errors and display fallback UI instead of crashing the app.

### Architecture

```
src/components/ErrorBoundary.tsx  # Reusable error boundary component
src/app/error.tsx                 # App-level error handler
src/app/global-error.tsx          # Root layout error handler
```

### Usage

#### 1. App-Level Error Handling

Errors in any page/route are automatically caught by `src/app/error.tsx`.

#### 2. Component-Level Error Boundary

```typescript
import ErrorBoundary from '@/components/ErrorBoundary';

function MyPage() {
  return (
    <ErrorBoundary
      fallback={<div>Custom error message</div>}
      onError={(error, errorInfo) => {
        // Log to error tracking service
        console.error('Error:', error, errorInfo);
      }}
    >
      <MyComponent />
    </ErrorBoundary>
  );
}
```

#### 3. Custom Fallback UI

```typescript
<ErrorBoundary
  fallback={
    <div className="p-4 bg-red-50 rounded">
      <h2>Something went wrong</h2>
      <button onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  }
>
  <MyComponent />
</ErrorBoundary>
```

---

## Usage Examples

### Complete Example: Form with Redux State Management

```typescript
'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { addNotification } from '@/lib/redux/slices/uiSlice';
import ErrorBoundary from '@/components/ErrorBoundary';

function BookingForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Your API call here
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id })
      });

      if (response.ok) {
        dispatch(addNotification({
          type: 'success',
          message: 'Booking submitted successfully!'
        }));
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Book Now'}
        </button>
      </form>
    </ErrorBoundary>
  );
}

export default BookingForm;
```

### Example: Language Switcher with Redux

```typescript
'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setLanguage } from '@/lib/redux/slices/uiSlice';

function LanguageSwitcher() {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);

  return (
    <button
      onClick={() => dispatch(setLanguage(language === 'en' ? 'bn' : 'en'))}
      className="px-4 py-2 rounded bg-primary text-white"
    >
      {language === 'en' ? 'বাংলা' : 'English'}
    </button>
  );
}

export default LanguageSwitcher;
```

### Example: Theme Switcher with Redux

```typescript
'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setTheme } from '@/lib/redux/slices/uiSlice';

function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);

  return (
    <select
      value={theme}
      onChange={(e) => dispatch(setTheme(e.target.value as 'light' | 'dark' | 'system'))}
      className="px-4 py-2 rounded border"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}

export default ThemeSwitcher;
```

### Example: Modal Management with Redux

```typescript
'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { openModal, closeModal } from '@/lib/redux/slices/uiSlice';

function LoginButton() {
  const dispatch = useAppDispatch();
  const isLoginOpen = useAppSelector((state) => state.ui.modals.loginOpen);

  return (
    <>
      <button
        onClick={() => dispatch(openModal('loginOpen'))}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Login
      </button>

      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2>Login</h2>
            {/* Login form */}
            <button onClick={() => dispatch(closeModal('loginOpen'))}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginButton;
```

### Example: Notifications System with Redux

```typescript
'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { removeNotification } from '@/lib/redux/slices/uiSlice';
import { useEffect } from 'react';

function NotificationCenter() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.ui.notifications);

  useEffect(() => {
    // Auto-dismiss notifications after 5 seconds
    notifications.forEach((notification) => {
      const age = Date.now() - notification.timestamp;
      if (age < 5000) {
        const timer = setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, 5000 - age);
        return () => clearTimeout(timer);
      }
    });
  }, [notifications, dispatch]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500' :
            notification.type === 'error' ? 'bg-red-500' :
            notification.type === 'warning' ? 'bg-yellow-500' :
            'bg-blue-500'
          } text-white`}
        >
          <p>{notification.message}</p>
          <button
            onClick={() => dispatch(removeNotification(notification.id))}
            className="mt-2 text-sm underline"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}

export default NotificationCenter;
```

---

## Best Practices

### Redux

1. **Use typed hooks** (`useAppDispatch`, `useAppSelector`) instead of plain Redux hooks
2. **Keep slices focused** - one concern per slice
3. **Use Redux for global state only** - use local state for component-specific data
4. **Normalize state structure** - avoid deeply nested data
5. **Use Redux DevTools** for debugging in development
6. **Name actions clearly** - use descriptive action names
7. **Keep reducers pure** - no side effects in reducers
8. **Use createSlice** - it simplifies reducer logic and action creators

### Error Boundaries

1. **Wrap risky components** (external data, user input) in error boundaries
2. **Log errors** to monitoring services (Sentry, LogRocket, etc.)
3. **Provide helpful error messages** to users
4. **Include recovery actions** (retry, go home) in fallback UI
5. **Show detailed errors** only in development
6. **Don't overuse** - only wrap components that might throw errors
7. **Test error scenarios** - ensure error boundaries work as expected

---

## Troubleshooting

### Redux Issues

**State not updating:**
- Ensure you're using `useAppSelector` from typed hooks
- Check if reducer is added to store
- Verify action is dispatched correctly
- Check Redux DevTools to see dispatched actions

**TypeScript errors:**
- Ensure you're using `useAppDispatch` and `useAppSelector` (not plain Redux hooks)
- Check if slice types are correct
- Verify RootState type includes your slice

**Component not re-rendering:**
- Check if you're selecting the right part of state
- Ensure you're not creating new objects in selectors
- Use memoized selectors for complex selections

### Error Boundary Issues

**Error boundary not catching errors:**
- Errors must occur during React rendering
- Async errors need try/catch
- Event handler errors need try/catch
- Errors in error boundary itself are not caught

**Error boundary not showing fallback:**
- Check if error boundary is wrapping the component
- Verify fallback prop or default UI is correct
- Ensure error is actually being thrown

---

## Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Redux Best Practices](https://redux.js.org/style-guide/)
