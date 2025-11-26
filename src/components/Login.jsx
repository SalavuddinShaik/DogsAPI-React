import React from "react";
import { useAuth } from "../AuthContext.jsx";

const Login = () => {
  const { currentUser, signInWithGoogle, logout } = useAuth();

  if (currentUser) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          margin: "20px auto",
          maxWidth: "400px",
        }}
      >
        <img
          src={currentUser.photoURL}
          alt="Profile"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            marginBottom: "10px",
          }}
        />
        <p style={{ fontWeight: "bold", margin: "5px 0" }}>
          {currentUser.displayName}
        </p>
        <p style={{ color: "#666", margin: "5px 0" }}>{currentUser.email}</p>
        <button
          onClick={logout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        margin: "20px auto",
        maxWidth: "400px",
      }}
    >
      <p>Sign in to save your favorite breeds!</p>
      <button
        onClick={signInWithGoogle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 24px",
          backgroundColor: "#4285f4",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        🔐 Sign in with Google
      </button>
    </div>
  );
};

export default Login;
