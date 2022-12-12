import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./context/auth-context";
import AddLocationPage from "./module/location/AddLocationPage";
import LocationPage from "./module/location/LocationPage";
import LocationUpdatePage from "./module/location/LocationUpdatePage";

import AddUserPage from "./module/user/AddUserPage";
import HomePage from "./pages/HomePage";
import LocationDetail from "./pages/LocationDetail";

import LoginPage from "./pages/LoginPage";
import UserDetailPage from "./module/user/UserDetailPage";
import UsersPage from "./module/user/UsersPage";
import AddBusinessPage from "./module/business/AddBusinessPage";
import BusinessUpdatePage from "./module/business/BusinessUpdatePage";

import Business from "./module/business/Business";
import RoomDetail from "./module/location/RoomDetail";
import ForgotPassword from "./pages/ForgotPassword";
import SubscriptionPage from "./module/subscription/SubscriptionPage";
import AddSubscriptionPage from "./module/subscription/AddSubscriptionPage";
import Subscription from "./module/subscription/Subscription";

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
            <Route path="/room/:id" element={<RoomDetail />}></Route>

            <Route path="/users" element={<UsersPage />}></Route>
            <Route path="/users/:userid" element={<UserDetailPage />}></Route>
            <Route path="/users-add/" element={<AddUserPage />}></Route>

            <Route path="/businesses" element={<Business />}></Route>
            <Route path="/subscriptions" element={<Subscription />}></Route>
            <Route
              path="/subscription-add"
              element={<AddSubscriptionPage />}
            ></Route>
            <Route
              path="/businesses/:businessId"
              element={<BusinessUpdatePage />}
            ></Route>
            <Route path="/business-add" element={<AddBusinessPage />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password/:id" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
