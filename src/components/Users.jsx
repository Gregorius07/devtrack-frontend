import api from "../api.js";
import { useEffect, useState } from "react";

function User({ name, email, role, password }) {
  return (
    <>
      <h1>Name: {name}</h1>
      <h1>Email: {email}</h1>
      <h1>Role: {role}</h1>
      <h1>Password: {password}</h1>
    </>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        console.log("Mengambil data...");

        const response = await api.get("/users");

        console.log("Data:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
        setError("Data user gagal diambil.");
      }
    }

    fetchUsers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {users.map((user) => (
        <User
          key={user.id}
          name={user.name}
          email={user.email}
          role={user.role}
          password = {user.password_hash}
        />
      ))}
    </>
  );
}