import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token, ready } = useAuth();

  // ⏳ wait until AuthContext has hydrated once
  if (!ready) {
    // optional: return a loader instead of null
    return null;
  }

  // robust token check: prefer context, fall back to localStorage
  const lsToken = localStorage.getItem("token");
  const hasToken =
    (typeof token === "string" && token.trim() !== "") ||
    (typeof lsToken === "string" && lsToken.trim() !== "");

  // TEMP diagnostics (open DevTools console to see these):
  // console.log("[PrivateRoute] ready:", ready, "ctxToken:", token, "lsToken:", lsToken, "hasToken:", hasToken);

  return hasToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
