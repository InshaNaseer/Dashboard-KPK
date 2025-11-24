// Mock authentication with hardcoded demo users
export interface User {
  id: string;
  email: string;
  name: string;
  role: "trainee" | "trainer" | "dpd_rpdc" | "dpd_admin" | "emis_admin";
  avatar?: string;
}

export const DEMO_USERS: User[] = [
  {
    id: "1",
    email: "ayesha.khan@kpk.edu",
    name: "Ayesha Khan",
    role: "trainee",
    avatar: "🧑‍🏫",
  },
  {
    id: "4",
    email: "dr.malik@kpk.edu",
    name: "Dr. Malik",
    role: "trainer",
    avatar: "👨‍🏫",
  },
  {
    id: "6",
    email: "admin.dpd@kpk.edu",
    name: "DPD Staff Officer",
    role: "dpd_rpdc",
    avatar: "👔",
  },
  {
    id: "7",
    email: "coordinator@kpk.edu",
    name: "RPDC Coordinator",
    role: "dpd_rpdc",
    avatar: "👩‍💼",
  },
  {
    id: "8",
    email: "emis.admin@kpk.edu",
    name: "EMIS Administrator",
    role: "emis_admin",
    avatar: "👨‍💻",
  },
  {
    id: "9",
    email: "dpd.admin@kpk.edu",
    name: "DPD System Administrator",
    role: "dpd_admin",
    avatar: "🔧",
  },
];

export function authenticateUser(email: string): User | null {
  return DEMO_USERS.find((user) => user.email === email) || null;
}

export function getUsersByRole(role: User["role"]): User[] {
  return DEMO_USERS.filter((user) => user.role === role);
}
