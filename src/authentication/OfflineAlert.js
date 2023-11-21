import React from "react";

function OfflineAlert() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f2f2f2",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          You are currently offline
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
          Please check your internet connection and try again.
        </p>
        <button
          className="btn btn-secondary"
          style={{
            color: "#fff",
            borderRadius: "5px",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => window.location.reload()}
        >
          Refresh page
        </button>
      </div>
    </div>
  );
}

export default OfflineAlert;
