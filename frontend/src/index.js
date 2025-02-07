import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { AuthProvider } from "./context/AuthContext.js";  // ✅ Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>  {/*  Wrap the entire App inside AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

