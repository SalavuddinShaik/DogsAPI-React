import React from "react";
import { useAuth } from "../AuthContext.jsx";

const Login = () => {
  const { currentUser, loginHistory, signInWithGoogle, logout } = useAuth();

  if (currentUser) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "20px",
          margin: "20px auto",
          maxWidth: "450px",
          boxShadow: "0 10px 40px rgba(102, 126, 234, 0.4)",
        }}
      >
        {/* Profile Section */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "25px",
            width: "100%",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={currentUser.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "4px solid #667eea",
              marginBottom: "15px",
            }}
          />
          <h2 style={{ margin: "10px 0 5px", color: "#333", fontSize: "22px" }}>
            {currentUser.displayName}
          </h2>
          <p style={{ color: "#666", margin: "5px 0 20px", fontSize: "14px" }}>
            {currentUser.email}
          </p>
          <button
            onClick={logout}
            style={{
              padding: "12px 30px",
              background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%)",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(238, 90, 90, 0.4)",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            🚪 Sign Out
          </button>
        </div>

        {/* Login History Section */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "20px",
            width: "100%",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              margin: "0 0 20px",
              color: "#333",
              fontSize: "18px",
              borderBottom: "2px solid #667eea",
              paddingBottom: "10px",
            }}
          >
            👥 Login History
          </h3>
          {loginHistory && loginHistory.length > 0 ? (
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              {loginHistory.map((user, index) => (
                <div
                  key={user.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px",
                    backgroundColor: index % 2 === 0 ? "#f8f9ff" : "#fff",
                    borderRadius: "10px",
                    marginBottom: "8px",
                    border: "1px solid #eee",
                  }}
                >
                  <img
                    src={user.photoURL || "https://via.placeholder.com/45"}
                    alt={user.displayName}
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                      marginRight: "12px",
                      border: "2px solid #667eea",
                    }}
                  />
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: "bold",
                        color: "#333",
                        fontSize: "14px",
                      }}
                    >
                      {user.displayName}
                    </p>
                    <p
                      style={{
                        margin: "3px 0 0",
                        fontSize: "12px",
                        color: "#888",
                      }}
                    >
                      {user.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#888" }}>
              No login history yet
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "20px",
        margin: "20px auto",
        maxWidth: "400px",
        boxShadow: "0 10px 40px rgba(102, 126, 234, 0.4)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "30px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <h2 style={{ margin: "0 0 10px", color: "#333" }}>Welcome! 👋</h2>
        <p style={{ color: "#666", marginBottom: "25px" }}>
          Sign in to save your favorite breeds!
        </p>
        <button
          onClick={signInWithGoogle}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "14px 28px",
            background: "linear-gradient(135deg, #4285f4 0%, #356dd1 100%)",
            color: "white",
            border: "none",
            borderRadius: "25px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            width: "100%",
            boxShadow: "0 4px 15px rgba(66, 133, 244, 0.4)",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            style={{ width: "20px", height: "20px" }}
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
