import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./context/auth-context";
import AddLocationPage from "./module/location/AddLocationPage";
import LocationPage from "./module/location/LocationPage";
import LocationUpdatePage from "./module/location/LocationUpdatePage";

import AddUserPage from "./pages/AddUserPage";
import BusinessPage from "./pages/BusinessPage";
import HomePage from "./pages/HomePage";
import LocationDetail from "./pages/LocationDetail";

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
            <Route
              path="/locations/update/:id"
              element={<LocationUpdatePage />}
            ></Route>
            <Route path="/locations/add" element={<AddLocationPage />}></Route>
            <Route
              path="/locations/detail/:id"
              element={<LocationDetail />}
            ></Route>
            <Route path="/users" element={<UsersPage />}></Route>
            <Route path="/users/:userid" element={<UserDetailPage />}></Route>
            <Route path="/users-add/" element={<AddUserPage />}></Route>
            <Route path="/business" element={<BusinessPage />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
