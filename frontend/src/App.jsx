import { Route, Routes, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthProvider, useAuth } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRouter";

const App = () => {
  return (
    <AuthProvider>
      <div className="relative h-full w-full">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/note/:id"
            element={
              <PrivateRoute>
                <NoteDetailPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
