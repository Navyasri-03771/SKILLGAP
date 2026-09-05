import { UserProfile } from '../types';

const AUTH_USERS_KEY = 'skillGap_registered_users';
const AUTH_CURRENT_USER_KEY = 'skillGap_current_user';

interface StoredUser extends UserProfile {
  passwordHash: string;
}

const DEFAULT_DEMO_USER: StoredUser = {
  id: 'usr_demo_01',
  name: 'Sarah Mitchell',
  email: 'demo@skillgap.io',
  targetRole: 'Fullstack Engineer',
  createdAt: new Date('2026-01-15').toISOString(),
  passwordHash: 'password123',
};

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(AUTH_USERS_KEY);
    if (!raw) {
      // Seed initial demo user so 1-click login always works
      const initial = [DEFAULT_DEMO_USER];
      localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [DEFAULT_DEMO_USER];
  } catch {
    return [DEFAULT_DEMO_USER];
  }
}

export function getCurrentUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(AUTH_CURRENT_USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserProfile;
    if (parsed && parsed.id && parsed.email) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: UserProfile | null): void {
  try {
    if (!user) {
      localStorage.removeItem(AUTH_CURRENT_USER_KEY);
    } else {
      localStorage.setItem(AUTH_CURRENT_USER_KEY, JSON.stringify(user));
    }
  } catch (error) {
    console.warn('Failed to persist current user session', error);
  }
}

export function registerUser(
  name: string,
  email: string,
  password: string,
  targetRole?: string
): { success: boolean; error?: string; user?: UserProfile } {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName || trimmedName.length < 2) {
    return { success: false, error: 'Please enter your full name (at least 2 characters).' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (!password || password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  const users = getStoredUsers();
  const existingUser = users.find((u) => u.email.toLowerCase() === trimmedEmail);

  if (existingUser) {
    return { success: false, error: 'An account with this email already exists. Please log in.' };
  }

  const newUser: StoredUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: trimmedName,
    email: trimmedEmail,
    targetRole: targetRole || 'Software Engineer',
    createdAt: new Date().toISOString(),
    passwordHash: password,
  };

  users.push(newUser);
  try {
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.warn('Failed to save registered users', err);
  }

  const profile: UserProfile = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    targetRole: newUser.targetRole,
    createdAt: newUser.createdAt,
  };

  setCurrentUser(profile);
  return { success: true, user: profile };
}

export function loginUser(
  email: string,
  password: string
): { success: boolean; error?: string; user?: UserProfile } {
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedEmail || !password) {
    return { success: false, error: 'Please enter both email and password.' };
  }

  const users = getStoredUsers();
  const found = users.find((u) => u.email.toLowerCase() === trimmedEmail);

  if (!found) {
    return {
      success: false,
      error: 'No account found with this email. Please check your spelling or register.',
    };
  }

  if (found.passwordHash !== password) {
    return {
      success: false,
      error: 'Incorrect password. Please try again or use the demo login.',
    };
  }

  const profile: UserProfile = {
    id: found.id,
    name: found.name,
    email: found.email,
    targetRole: found.targetRole,
    createdAt: found.createdAt,
  };

  setCurrentUser(profile);
  return { success: true, user: profile };
}

export function loginDemoUser(): UserProfile {
  const demoProfile: UserProfile = {
    id: DEFAULT_DEMO_USER.id,
    name: DEFAULT_DEMO_USER.name,
    email: DEFAULT_DEMO_USER.email,
    targetRole: DEFAULT_DEMO_USER.targetRole,
    createdAt: DEFAULT_DEMO_USER.createdAt,
  };
  setCurrentUser(demoProfile);
  return demoProfile;
}

export function logoutUser(): void {
  setCurrentUser(null);
}
