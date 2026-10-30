import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      navigate("/");
      return;
    }

    getAttendance();
  }, []);

  const getAttendance = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/student-attendance",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Student attendance:", data);

      if (!response.ok) {
        alert(data.message || "Could not get attendance");
        return;
      }

      setAttendance(data.attendance || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const present = attendance.filter(
    (item) => item.status === "Present"
  ).length;

  const absent = attendance.filter(
    (item) => item.status === "Absent"
  ).length;

  const total = attendance.length;

  const percentage =
    total > 0 ? ((present / total) * 100).toFixed(1) : 0;

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        fontFamily: "Segoe UI, Arial, sans-serif",
        color: "#1e293b",
      }}
    >
      

      <nav
        style={{
          height: "70px",
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 45px",
          color: "white",
          boxShadow: "0 4px 15px rgba(0,0,0,0.12)",
          position: "sticky",
          top: 0,
          zIndex: 100,
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

      

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            👤 {user?.name}
          </span>

          <button
            onClick={logout}
            style={{
              border: "none",
              background: "white",
              color: "#1d4ed8",
              padding: "9px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      

      <main
        style={{
          width: "92%",
          maxWidth: "1250px",
          margin: "35px auto",
        }}
      >


        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "8px",
            }}
          >
            Student Dashboard
          </h1>

          <p
            style={{
              fontSize: "17px",
              color: "#64748b",
            }}
          >
            Welcome back, {user?.name} 👋
          </p>
        </div>

    

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "14px",
              borderLeft: "5px solid #2563eb",
              boxShadow: "0 5px 20px rgba(15,23,42,0.07)",
            }}
          >
            <h3
              style={{
                fontSize: "15px",
                color: "#64748b",
                marginBottom: "12px",
              }}
            >
              Total Classes
            </h3>

            <strong
              style={{
                fontSize: "32px",
                color: "#1e293b",
              }}
            >
              {total}
            </strong>
          </div>

  

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "14px",
              borderLeft: "5px solid #16a34a",
              boxShadow: "0 5px 20px rgba(15,23,42,0.07)",
            }}
          >
            <h3
              style={{
                fontSize: "15px",
                color: "#64748b",
                marginBottom: "12px",
              }}
            >
              Present
            </h3>

            <strong
              style={{
                fontSize: "32px",
                color: "#16a34a",
              }}
            >
              {present}
            </strong>
          </div>

        

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "14px",
              borderLeft: "5px solid #dc2626",
              boxShadow: "0 5px 20px rgba(15,23,42,0.07)",
            }}
          >
            <h3
              style={{
                fontSize: "15px",
                color: "#64748b",
                marginBottom: "12px",
              }}
            >
              Absent
            </h3>

            <strong
              style={{
                fontSize: "32px",
                color: "#dc2626",
              }}
            >
              {absent}
            </strong>
          </div>

      

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "14px",
              borderLeft: "5px solid #7c3aed",
              boxShadow: "0 5px 20px rgba(15,23,42,0.07)",
            }}
          >
            <h3
              style={{
                fontSize: "15px",
                color: "#64748b",
                marginBottom: "12px",
              }}
            >
              Attendance
            </h3>

            <strong
              style={{
                fontSize: "32px",
                color: "#7c3aed",
              }}
            >
              {percentage}%
            </strong>
          </div>
        </div>

        

        <div
          style={{
            background: "white",
            borderRadius: "15px",
            padding: "28px 30px",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            boxShadow: "0 5px 20px rgba(15,23,42,0.07)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "21px",
                color: "#0f172a",
                marginBottom: "7px",
              }}
            >
              Mark Today's Attendance
            </h2>

            <p
              style={{
                color: "#64748b",
                fontSize: "15px",
              }}
            >
              Select Present or Absent for today's class.
            </p>
          </div>

          <Link
            to="/student/attendance"
            style={{
              background: "#2563eb",
              color: "white",
              padding: "12px 23px",
              borderRadius: "9px",
              fontWeight: "600",
              textDecoration: "none",
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
          >
            Mark Attendance
          </Link>
        </div>

        

        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 5px 20px rgba(15,23,42,0.07)",
            overflowX: "auto",
          }}
        >
          <h2
            style={{
              fontSize: "21px",
              marginBottom: "20px",
              color: "#0f172a",
            }}
          >
            Attendance History
          </h2>

          {loading ? (
            <p
              style={{
                color: "#64748b",
                padding: "20px 0",
              }}
            >
              Loading attendance...
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#eff6ff",
                  }}
                >
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      color: "#1e40af",
                    }}
                  >
                    Date
                  </th>

                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      color: "#1e40af",
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {attendance.length === 0 ? (
                  <tr>
                    <td
                      colSpan="2"
                      style={{
                        padding: "25px",
                        textAlign: "center",
                        color: "#64748b",
                      }}
                    >
                      No attendance records found
                    </td>
                  </tr>
                ) : (
                  attendance.map((item, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          padding: "15px",
                          borderBottom: "1px solid #e2e8f0",
                          color: "#475569",
                        }}
                      >
                        {item.date}
                      </td>

                      <td
                        style={{
                          padding: "15px",
                          borderBottom: "1px solid #e2e8f0",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            padding: "6px 13px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "700",
                            background:
                              item.status === "Present"
                                ? "#dcfce7"
                                : "#fee2e2",
                            color:
                              item.status === "Present"
                                ? "#15803d"
                                : "#b91c1c",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;