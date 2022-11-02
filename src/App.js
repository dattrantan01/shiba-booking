import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AddLocationPage from "./pages/AddLocationPage";
import HomePage from "./pages/HomePage";
import LocationPage from "./pages/LocationPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/locations" element={<LocationPage />}></Route>
          <Route path="/users" element={<UserPage />}></Route>
          <Route path="/locations/add" element={<AddLocationPage />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
