import React, { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";


function Login() {

  const navigate = useNavigate();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:5000/api/Login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );


      const data =
        await response.json();


      console.log(
        "Login response:",
        data
      );


      if (!response.ok) {

        alert(
          data.message ||
          "Login failed"
        );

        return;
      }


      // Save JWT token

      localStorage.setItem(
        "token",
        data.token
      );


      // Save user information

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );


      // Check user group

      const group =
        data.user?.group?.toLowerCase();


      if (group === "teacher") {

        navigate(
          "/teacher/dashboard"
        );

      } else {

        navigate(
          "/student/dashboard"
        );

      }


    } catch (error) {

      console.log(error);

      alert(
        "Cannot connect to backend"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #eff6ff, #dbeafe, #f8fafc)",
        fontFamily:
          "Segoe UI, Arial, sans-serif",
        padding: "30px 15px",
      }}
    >

      

      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "white",
          padding: "42px",
          borderRadius: "20px",
          boxShadow:
            "0 15px 40px rgba(15,23,42,0.15)",
          border:
            "1px solid #e2e8f0",
        }}
      >

      

        <div
          style={{
            width: "75px",
            height: "75px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #dbeafe, #bfdbfe)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "34px",
          }}
        >
          🔐
        </div>


        <h1
          style={{
            textAlign: "center",
            margin: "0 0 8px",
            fontSize: "30px",
            fontWeight: "700",
            color: "#0f172a",
          }}
        >
          Attendance System
        </h1>


        <p
          style={{
            textAlign: "center",
            margin: "0 0 32px",
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Login to your account
        </p>


        

        <form
          onSubmit={handleLogin}
        >

      

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#334155",
            }}
          >
            Email
          </label>


          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "20px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "9px",
              outline: "none",
              fontSize: "15px",
              color: "#1e293b",
              background: "#f8fafc",
            }}
          />


          

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#334155",
            }}
          >
            Password
          </label>


          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "25px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "9px",
              outline: "none",
              fontSize: "15px",
              color: "#1e293b",
              background: "#f8fafc",
            }}
          />


          

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              border: "none",
              background:
                loading
                  ? "#94a3b8"
                  : "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "white",
              padding: "14px",
              borderRadius: "9px",
              fontSize: "16px",
              fontWeight: "700",
              cursor:
                loading
                  ? "not-allowed"
                  : "pointer",
              boxShadow:
                loading
                  ? "none"
                  : "0 7px 18px rgba(37,99,235,0.25)",
              transition: "0.3s",
            }}
          >

            {loading
              ? "⏳ Logging in..."
              : "🔑 Login"}

          </button>

        </form>


    

        <p
          style={{
            textAlign: "center",
            marginTop: "27px",
            marginBottom: "0",
            fontSize: "14px",
            color: "#64748b",
          }}
        >

          Don't have an account?

          {" "}

          <Link
            to="/signup"
            style={{
              color: "#2563eb",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Create Account
          </Link>

        </p>


        

        <div
          style={{
            marginTop: "25px",
            paddingTop: "18px",
            borderTop:
              "1px solid #e2e8f0",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "12px",
          }}
        >
          🔒 Secure Attendance Management System
        </div>

      </div>

    </div>

  );
}


export default Login;