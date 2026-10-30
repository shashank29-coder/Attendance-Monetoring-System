import React, { useState } from "react";

import {
  useNavigate
} from "react-router-dom";


function StudentAttendance() {

  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);


  const submitAttendance = async () => {

    if (!status) {

      alert(
        "Please select Present or Absent"
      );

      return;
    }


    setLoading(true);


    try {

      const token =
        localStorage.getItem("token");


      const today =
        new Date()
          .toISOString()
          .split("T")[0];


      const response =
        await fetch(
          "http://localhost:5000/api/attendance",
          {

            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`

            },

            body: JSON.stringify({

              status: status,

              date: today

            })

          }
        );


      const data =
        await response.json();


      console.log(
        "Attendance response:",
        data
      );


      if (!response.ok) {

        alert(
          data.message ||
          "Attendance failed"
        );

        return;
      }


      alert(
        "Attendance marked successfully!"
      );


      navigate(
        "/student/dashboard"
      );


    } catch (error) {

      console.log(error);

      alert(
        "Cannot connect to backend"
      );


    } finally {

      setLoading(false);

    }

  };


  const logout = () => {

    localStorage.clear();

    navigate("/");

  };


  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eff6ff, #f8fafc)",
        fontFamily:
          "Segoe UI, Arial, sans-serif",
      }}
    >

      

      <nav
        style={{
          width: "100%",
          height: "70px",
          background:
            "linear-gradient(135deg, #2563eb, #1d4ed8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 45px",
          color: "white",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.12)",
        }}
      >

    

        <div
          style={{
            fontSize: "22px",
            fontWeight: "700",
            letterSpacing: "0.3px",
          }}
        >
          📚 Attendance System
        </div>


        

        <button
          onClick={logout}
          style={{
            border: "none",
            background: "white",
            color: "#1d4ed8",
            padding: "10px 22px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Logout
        </button>

      </nav>


    

      <main
        style={{
          minHeight:
            "calc(100vh - 70px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >

        

        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            background: "white",
            borderRadius: "20px",
            padding: "45px",
            textAlign: "center",
            boxShadow:
              "0 15px 40px rgba(15,23,42,0.12)",
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
              background: "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "35px",
            }}
          >
            📋
          </div>


          

          <h1
            style={{
              margin: "0 0 10px",
              fontSize: "30px",
              color: "#0f172a",
              fontWeight: "700",
            }}
          >
            Mark Attendance
          </h1>


          <p
            style={{
              margin: "0 0 35px",
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            What is your attendance
            for today?
          </p>


          

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "20px",
              marginBottom: "30px",
            }}
          >

            
            <button
              onClick={() =>
                setStatus("Present")
              }
              style={{
                border:
                  status === "Present"
                    ? "3px solid #16a34a"
                    : "2px solid #dbeafe",

                background:
                  status === "Present"
                    ? "#dcfce7"
                    : "#f8fafc",

                color:
                  status === "Present"
                    ? "#15803d"
                    : "#475569",

                borderRadius: "15px",
                padding: "25px 15px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                fontSize: "17px",
                fontWeight: "700",
                transition: "0.3s",
                transform:
                  status === "Present"
                    ? "translateY(-3px)"
                    : "none",
                boxShadow:
                  status === "Present"
                    ? "0 8px 20px rgba(22,163,74,0.15)"
                    : "none",
              }}
            >

              <span
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  background:
                    status === "Present"
                      ? "#16a34a"
                      : "#dcfce7",
                  color:
                    status === "Present"
                      ? "white"
                      : "#16a34a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  fontWeight: "700",
                }}
              >
                ✓
              </span>

              <span>
                Present
              </span>

            </button>


        

            <button
              onClick={() =>
                setStatus("Absent")
              }
              style={{
                border:
                  status === "Absent"
                    ? "3px solid #dc2626"
                    : "2px solid #dbeafe",

                background:
                  status === "Absent"
                    ? "#fee2e2"
                    : "#f8fafc",

                color:
                  status === "Absent"
                    ? "#b91c1c"
                    : "#475569",

                borderRadius: "15px",
                padding: "25px 15px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                fontSize: "17px",
                fontWeight: "700",
                transition: "0.3s",
                transform:
                  status === "Absent"
                    ? "translateY(-3px)"
                    : "none",
                boxShadow:
                  status === "Absent"
                    ? "0 8px 20px rgba(220,38,38,0.15)"
                    : "none",
              }}
            >

              <span
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  background:
                    status === "Absent"
                      ? "#dc2626"
                      : "#fee2e2",
                  color:
                    status === "Absent"
                      ? "white"
                      : "#dc2626",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                ✕
              </span>

              <span>
                Absent
              </span>

            </button>

          </div>


          

          {status && (

            <div
              style={{
                marginBottom: "20px",
                padding: "12px",
                borderRadius: "8px",
                background:
                  status === "Present"
                    ? "#f0fdf4"
                    : "#fef2f2",
                color:
                  status === "Present"
                    ? "#15803d"
                    : "#b91c1c",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Selected: {status}
            </div>

          )}


        
          <button
            onClick={submitAttendance}
            disabled={loading}
            style={{
              width: "100%",
              border: "none",
              background:
                loading
                  ? "#94a3b8"
                  : "#2563eb",
              color: "white",
              padding: "14px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "700",
              cursor:
                loading
                  ? "not-allowed"
                  : "pointer",
              boxShadow:
                loading
                  ? "none"
                  : "0 6px 15px rgba(37,99,235,0.25)",
              transition: "0.3s",
            }}
          >

            {loading
              ? "⏳ Submitting..."
              : "✓ Submit Attendance"}

          </button>


          

          <button
            onClick={() =>
              navigate(
                "/student/dashboard"
              )
            }
            style={{
              width: "100%",
              marginTop: "15px",
              padding: "13px",
              border:
                "2px solid #e2e8f0",
              background: "white",
              color: "#475569",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            ← Back to Dashboard
          </button>


          {/* DATE */}

          <p
            style={{
              marginTop: "25px",
              fontSize: "13px",
              color: "#94a3b8",
            }}
          >
            📅 Today's attendance will be
            recorded automatically.
          </p>

        </div>

      </main>

    </div>

  );
}


export default StudentAttendance;