import { Routes, Route, Link, Navigate } from "react-router";
import Users from "./components/Users";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/register" element={<CreateUser/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>

      {/* <CreateUser/> */}
    </>
  );
}
