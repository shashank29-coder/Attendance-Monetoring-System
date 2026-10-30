import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";


function TeacherDashboard() {

  const navigate = useNavigate();

  const [attendance, setAttendance] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");


  const user =
    JSON.parse(
      localStorage.getItem("user")
    );


  useEffect(() => {

    const token =
      localStorage.getItem("token");


    if (!token) {

      navigate("/");

      return;

    }


    getAttendance();

  }, []);


  const getAttendance = async () => {

    try {

      const token =
        localStorage.getItem("token");


      const response =
        await fetch(
          "http://localhost:5000/api/attendance",
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );


      const data =
        await response.json();


      console.log(
        "Teacher attendance:",
        data
      );


      if (!response.ok) {

        alert(
          data.message ||
          "Could not get attendance"
        );

        return;

      }


      setAttendance(
        data.attendance || []
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


  const present =
    attendance.filter(
      item =>
        item.status === "Present"
    ).length;


  const absent =
    attendance.filter(
      item =>
        item.status === "Absent"
    ).length;


  const total =
    attendance.length;


  const percentage =
    total > 0
      ? ((present / total) * 100).toFixed(1)
      : 0;


  const filteredAttendance =
    attendance.filter(
      item => {

        const name =
          item.studentName || "";

        return name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      }
    );


  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937"
      }}
    >

    

      <nav
        style={{
          height: "70px",
          background: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}
      >

        {/* Logo */}

        <div
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#2563eb"
          }}
        >
          📚 Attendance System
        </div>


        {/* Right side */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}
        >

          <span
            style={{
              fontSize: "15px",
              fontWeight: "500",
              color: "#374151"
            }}
          >
            Teacher: {user?.name}
          </span>


          <button
            onClick={logout}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "7px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px"
            }}
          >
            Logout
          </button>

        </div>

      </nav>


      

      <main
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px"
        }}
      >

        {/* Welcome */}

        <div
          style={{
            marginBottom: "30px"
          }}
        >

          <h1
            style={{
              fontSize: "32px",
              margin: "0 0 8px 0",
              color: "#111827"
            }}
          >
            Teacher Dashboard
          </h1>

          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "16px"
            }}
          >
            Monitor student attendance
          </p>

        </div>


        

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "30px"
          }}
        >

          {/* Total */}

          <div
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.06)",
              borderLeft:
                "5px solid #2563eb"
            }}
          >

            <h3
              style={{
                margin: "0 0 12px 0",
                color: "#6b7280",
                fontSize: "15px"
              }}
            >
              Total Records
            </h3>

            <strong
              style={{
                fontSize: "32px",
                color: "#2563eb"
              }}
            >
              {total}
            </strong>

          </div>


          {/* Present */}

          <div
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.06)",
              borderLeft:
                "5px solid #16a34a"
            }}
          >

            <h3
              style={{
                margin: "0 0 12px 0",
                color: "#6b7280",
                fontSize: "15px"
              }}
            >
              Present
            </h3>

            <strong
              style={{
                fontSize: "32px",
                color: "#16a34a"
              }}
            >
              {present}
            </strong>

          </div>


    

          <div
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.06)",
              borderLeft:
                "5px solid #dc2626"
            }}
          >

            <h3
              style={{
                margin: "0 0 12px 0",
                color: "#6b7280",
                fontSize: "15px"
              }}
            >
              Absent
            </h3>

            <strong
              style={{
                fontSize: "32px",
                color: "#dc2626"
              }}
            >
              {absent}
            </strong>

          </div>


          

          <div
            style={{
              background: "#ffffff",
              padding: "25px",
              borderRadius: "12px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.06)",
              borderLeft:
                "5px solid #7c3aed"
            }}
          >

            <h3
              style={{
                margin: "0 0 12px 0",
                color: "#6b7280",
                fontSize: "15px"
              }}
            >
              Attendance
            </h3>

            <strong
              style={{
                fontSize: "32px",
                color: "#7c3aed"
              }}
            >
              {percentage}%
            </strong>

          </div>

        </div>


        

        <div
          style={{
            background: "#ffffff",
            padding: "30px",
            borderRadius: "14px",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.06)"
          }}
        >

          {/* Table Header */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
              gap: "20px"
            }}
          >

            <div>

              <h2
                style={{
                  margin: "0 0 7px 0",
                  fontSize: "22px",
                  color: "#111827"
                }}
              >
                Student Attendance
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#6b7280"
                }}
              >
                Today's attendance records
              </p>

            </div>


            {/* Search */}

            <input
              type="text"
              placeholder="🔍 Search student..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
                width: "280px",
                padding: "12px 15px",
                border:
                  "1px solid #d1d5db",
                borderRadius: "8px",
                outline: "none",
                fontSize: "14px",
                background: "#f9fafb"
              }}
            />

          </div>


          {/* Loading */}

          {loading ? (

            <div
              style={{
                textAlign: "center",
                padding: "50px",
                color: "#6b7280",
                fontSize: "16px"
              }}
            >
              Loading attendance...
            </div>

          ) : (

            <div
              style={{
                overflowX: "auto"
              }}
            >

              <table
                style={{
                  width: "100%",
                  borderCollapse:
                    "collapse"
                }}
              >

                <thead>

                  <tr>

                    <th
                      style={{
                        padding: "15px",
                        textAlign: "left",
                        background:
                          "#f3f4f6",
                        color: "#374151",
                        fontSize: "14px",
                        borderBottom:
                          "1px solid #e5e7eb"
                      }}
                    >
                      Student Name
                    </th>


                    <th
                      style={{
                        padding: "15px",
                        textAlign: "left",
                        background:
                          "#f3f4f6",
                        color: "#374151",
                        fontSize: "14px",
                        borderBottom:
                          "1px solid #e5e7eb"
                      }}
                    >
                      Email
                    </th>


                    <th
                      style={{
                        padding: "15px",
                        textAlign: "left",
                        background:
                          "#f3f4f6",
                        color: "#374151",
                        fontSize: "14px",
                        borderBottom:
                          "1px solid #e5e7eb"
                      }}
                    >
                      Date
                    </th>


                    <th
                      style={{
                        padding: "15px",
                        textAlign: "left",
                        background:
                          "#f3f4f6",
                        color: "#374151",
                        fontSize: "14px",
                        borderBottom:
                          "1px solid #e5e7eb"
                      }}
                    >
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredAttendance.length === 0 ? (

                    <tr>

                      <td
                        colSpan="4"
                        style={{
                          padding: "40px",
                          textAlign: "center",
                          color: "#6b7280"
                        }}
                      >
                        No attendance records found.
                      </td>

                    </tr>

                  ) : (

                    filteredAttendance.map(
                      (item, index) => (

                        <tr
                          key={index}
                          style={{
                            borderBottom:
                              "1px solid #e5e7eb"
                          }}
                        >

                          <td
                            style={{
                              padding: "16px",
                              fontWeight: "600"
                            }}
                          >
                            {item.studentName}
                          </td>


                          <td
                            style={{
                              padding: "16px",
                              color: "#6b7280"
                            }}
                          >
                            {item.studentEmail}
                          </td>


                          <td
                            style={{
                              padding: "16px",
                              color: "#374151"
                            }}
                          >
                            {item.date}
                          </td>


                          <td
                            style={{
                              padding: "16px"
                            }}
                          >

                            <span
                              style={{
                                display:
                                  "inline-block",
                                padding:
                                  "6px 14px",
                                borderRadius:
                                  "20px",
                                fontSize:
                                  "13px",
                                fontWeight:
                                  "bold",

                                color:
                                  item.status ===
                                  "Present"
                                    ? "#15803d"
                                    : "#b91c1c",

                                background:
                                  item.status ===
                                  "Present"
                                    ? "#dcfce7"
                                    : "#fee2e2"
                              }}
                            >
                              {item.status}
                            </span>

                          </td>

                        </tr>

                      )
                    )

                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

    </div>

  );

}


export default TeacherDashboard;