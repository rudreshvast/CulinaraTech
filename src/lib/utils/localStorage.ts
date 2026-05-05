export interface StoredUser {
  id: string;
  email: string;
  password: string; // hashed
  name: string;
  role: 'STUDENT' | 'INSTRUCTOR';
  createdAt: string;
}

const USERS_KEY = 'culinaratech_users';
const INIT_KEY = 'culinaratech_init';

// Initialize with default users
export const initializeDefaultUsers = () => {
  if (typeof window === 'undefined') return;

  const isInitialized = localStorage.getItem(INIT_KEY);
  if (isInitialized) return;

  const defaultUsers: StoredUser[] = [
    {
      id: '1',
      email: 'student@example.com',
      password: hashPassword('password123'),
      name: 'Test Student',
      role: 'STUDENT',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      email: 'instructor@example.com',
      password: hashPassword('password456'),
      name: 'Test Instructor',
      role: 'INSTRUCTOR',
      createdAt: new Date().toISOString(),
    },
  ];

  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  localStorage.setItem(INIT_KEY, 'true');
};

export const getUsers = (): StoredUser[] => {
  if (typeof window === 'undefined') return [];

  initializeDefaultUsers();
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const findUserByEmail = (email: string): StoredUser | null => {
  const users = getUsers();
  return users.find(u => u.email === email.toLowerCase()) || null;
};

export const findUserById = (id: string): StoredUser | null => {
  const users = getUsers();
  return users.find(u => u.id === id) || null;
};

export const createUser = (email: string, password: string, name: string, role: 'STUDENT' | 'INSTRUCTOR'): StoredUser => {
  if (typeof window === 'undefined') throw new Error('localStorage not available');

  const users = getUsers();

  // Check if user already exists
  if (users.find(u => u.email === email.toLowerCase())) {
    throw new Error('Email already registered');
  }

  // Create hashed password (simplified - in production use proper bcrypt)
  // For demo purposes, we'll use a simple hash
  const hashedPassword = hashPassword(password);

  const newUser: StoredUser = {
    id: Date.now().toString(),
    email: email.toLowerCase(),
    password: hashedPassword,
    name,
    role,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return newUser;
};

export const hashPassword = (password: string): string => {
  // Simple hash function for demo (in production, use bcryptjs)
  // This creates a consistent hash of the password using a basic algorithm
  let hash = 0;
  let i, chr;
  if (password.length === 0) return 'hash_0';

  for (i = 0; i < password.length; i++) {
    chr = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Create a more predictable hash format
  return `hash_${Math.abs(hash)}`;
};

export const verifyPassword = (plainPassword: string, hashedPassword: string): boolean => {
  // Simple password verification (in production, use bcryptjs.compare)
  // For demo, we're doing a simple check by hashing the plain password and comparing
  return hashPassword(plainPassword) === hashedPassword;
};

export const authenticateUser = (
  email: string,
  password: string
): { user: StoredUser; token: string } | { error: 'USER_NOT_FOUND' | 'INVALID_PASSWORD' } => {
  const user = findUserByEmail(email);

  if (!user) {
    return { error: 'USER_NOT_FOUND' }; // User not found
  }

  if (!verifyPassword(password, user.password)) {
    return { error: 'INVALID_PASSWORD' }; // Password incorrect
  }

  // Generate a simple JWT-like token
  const token = btoa(JSON.stringify({ id: user.id, email: user.email, iat: Date.now() }));

  return { user, token };
};

export const clearAllUsers = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USERS_KEY);
  localStorage.removeItem(INIT_KEY);
};
