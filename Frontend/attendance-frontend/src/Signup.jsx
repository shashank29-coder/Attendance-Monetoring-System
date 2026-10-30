import React, { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";


function Signup() {

  const navigate = useNavigate();


  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [group, setGroup] =
    useState("student");


  const [loading, setLoading] =
    useState(false);


  const handleSignup = async (e) => {

    e.preventDefault();

    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:5000/api/users",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            name: name,

            email: email,

            password: password,

            group: group

          })
        }
      );


      const data =
        await response.json();


      console.log(
        "Signup response:",
        data
      );


      if (!response.ok) {

        alert(
          data.message ||
          "Registration failed"
        );

        return;

      }


      alert(
        "Registration successful!"
      );


      navigate("/");


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
          maxWidth: "470px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow:
            "0 15px 40px rgba(15,23,42,0.15)",
          border:
            "1px solid #e2e8f0",
        }}
      >

  

        <div
          style={{
            width: "70px",
            height: "70px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            background: "#dbeafe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
          }}
        >
          👤
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
          Create Account
        </h1>


        <p
          style={{
            textAlign: "center",
            margin: "0 0 30px",
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          Register for Attendance System
        </p>


  

        <form
          onSubmit={handleSignup}
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
            Full Name
          </label>


          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "13px 14px",
              marginBottom: "18px",
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
              padding: "13px 14px",
              marginBottom: "18px",
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
            placeholder="Create password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "13px 14px",
              marginBottom: "18px",
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
            Account Type
          </label>


          <select
            value={group}
            onChange={(e) =>
              setGroup(e.target.value)
            }
            style={{
              width: "100%",
              padding: "13px 14px",
              marginBottom: "25px",
              border:
                "1px solid #cbd5e1",
              borderRadius: "9px",
              outline: "none",
              fontSize: "15px",
              color: "#1e293b",
              background: "#f8fafc",
              cursor: "pointer",
            }}
          >

            <option value="student">
              Student
            </option>

            <option value="teacher">
              Teacher
            </option>

          </select>


        

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
              ? "⏳ Creating..."
              : "Create Account"}

          </button>

        </form>


  

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            marginBottom: "0",
            fontSize: "14px",
            color: "#64748b",
          }}
        >

          Already have an account?

          {" "}

          <Link
            to="/"
            style={{
              color: "#2563eb",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}


export default Signup;