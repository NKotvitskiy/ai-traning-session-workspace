export type UserSummary = {
  id: string;
  name: string;
  role: string;
};

const mockUsers: UserSummary[] = [
  { id: "u1", name: "Ava Stone", role: "Admin" },
  { id: "u2", name: "Liam Fox", role: "Viewer" }
];

export async function fetchUsers(): Promise<UserSummary[]> {
  return Promise.resolve(mockUsers);
}
