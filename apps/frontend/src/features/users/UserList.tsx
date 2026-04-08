import { useEffect, useState } from "react";

import { fetchUsers, type UserSummary } from "../../services/usersApi";

export function UserList() {
  const [users, setUsers] = useState<UserSummary[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <section>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.role}
          </li>
        ))}
      </ul>
    </section>
  );
}
