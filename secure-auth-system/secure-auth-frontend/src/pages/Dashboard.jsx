import React, { useEffect, useState } from "react";
import API from "../services/api";
import SessionCard from "../components/SessionCard";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);

  const fetchSessions = async () => {
    try {
      const res = await API.get("/auth/sessions");
      setSessions(res.data.sessions);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch sessions");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div>
      <Navbar />
      <h2 style={{ padding: "15px" }}>Active Sessions</h2>

      {sessions.length === 0 ? (
        <p style={{ padding: "15px" }}>No active sessions</p>
      ) : (
        sessions.map((session) => (
          <SessionCard
            key={session._id}
            session={session}
            refresh={fetchSessions}
          />
        ))
      )}
    </div>
  );
};

export default Dashboard;