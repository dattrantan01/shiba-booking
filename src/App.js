import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./context/auth-context";
import AddLocationPage from "./pages/AddLocationPage";
import AddUserPage from "./pages/AddUserPage";
import HomePage from "./pages/HomePage";
import LocationPage from "./pages/LocationPage";
import LoginPage from "./pages/LoginPage";
import UserDetailPage from "./pages/UserDetailPage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/locations" element={<LocationPage />}></Route>
            <Route path="/users" element={<UsersPage />}></Route>
            <Route path="/users/:userid" element={<UserDetailPage />}></Route>
            <Route path="/users-add/" element={<AddUserPage />}></Route>
            <Route path="/locations/add" element={<AddLocationPage />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
