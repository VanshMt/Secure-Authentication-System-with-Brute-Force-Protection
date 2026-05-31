import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import API from "../services/api";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatsCard from "../components/dashboard/StatsCard";
import SessionCard from "../components/dashboard/SessionCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await API.get("/auth/sessions");
        
        // Map backend session data to frontend format
        const formattedSessions = (res.data.sessions || []).map((session) => ({
          id: session._id || session.id,
          device: session.device || "Unknown Device",
          browser: session.browser || "Unknown",
          os: session.os || "Unknown",
          ip: session.ip || "N/A",
          location: session.location ? `${session.location.region || ""}, ${session.location.country || ""}`.trim() || "Unknown Location" : "Unknown Location",
          lastActive: session.lastActive || "Never",
          current: session.current || false,
          failedAttempts: session.failedAttempts || 0,
        }));
        
        setSessions(formattedSessions);
      } catch (err) {
        // 401 errors are handled by API interceptor, so this catch is for other errors
        if (err.response?.status === 401) {
          // Interceptor should have already redirected, but if not, do it here
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        console.error("Failed to fetch sessions:", err);
        setError("Unable to load sessions. Please try again.");
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [navigate]);

  const activeSessions = sessions.length;
  const failedLogins = sessions.reduce((total, session) => total + (session.failedAttempts || 0), 0);
  const currentSession = sessions.find((session) => session.current) || sessions[0];
  const accountStatus = "Secure";

  const stats = useMemo(
    () => [
      {
        icon: "Users",
        label: "Active Sessions",
        value: activeSessions,
        delta: "+2%",
        progressClass: "bg-cyan-500",
        progressWidth: `${Math.min(activeSessions * 20, 100)}%`,
      },
      {
        icon: "AlertTriangle",
        label: "Failed Login Attempts",
        value: failedLogins.toString().padStart(2, "0"),
        delta: failedLogins > 0 ? "-15%" : "+0%",
        progressClass: "bg-red-500",
        progressWidth: `${Math.min(failedLogins * 20, 100)}%`,
      },
      {
        icon: "Clock",
        label: "Last Login",
        value: currentSession?.lastActive || "N/A",
        delta: "LIVE",
        progressClass: "bg-slate-500",
        progressWidth: "75%",
      },
      {
        icon: "Shield",
        label: "Account Status",
        value: accountStatus,
        delta: "ACTIVE",
        progressClass: "bg-cyan-500",
        progressWidth: "100%",
      },
    ],
    [activeSessions, failedLogins, currentSession, accountStatus]
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRevoke = async (sessionId) => {
    try {
      await API.post("/auth/logout-device", { sessionId });
      setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      console.error("Failed to revoke session:", err);
      setError("Failed to revoke session. Please try again.");
    }
  };

  const handleRevokeAll = async () => {
    try {
      await API.post("/auth/logout-all");
      localStorage.removeItem("token");
      navigate("/login");
      // setSessions([]);
      // setError("All devices logged out successfully.");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      console.error("Failed to revoke all sessions:", err);
      setError("Failed to revoke all sessions. Please try again.");
    }
  };

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="mb-10">
        <h1 className="font-headline-xl text-4xl text-white">Security Pulse</h1>
        <p className="max-w-2xl text-slate-400 mt-3">
          Real-time threat monitoring and active session control for the SENTINEL_SHIELD architecture.
          All metrics remain within operational parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((item) => (
          <StatsCard key={item.label} {...item} />
        ))}
      </div>

      <section className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-white">Current Active Sessions</h2>
            <span className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] uppercase tracking-[0.2em] font-label-caps">
              Live Feed
            </span>
          </div>
          <button
            onClick={handleRevokeAll}
            className="inline-flex items-center gap-2 text-slate-400 font-label-caps text-xs uppercase tracking-[0.2em] hover:text-white transition-colors"
          >
            REVOKE ALL
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="glass-panel p-4 rounded-3xl border border-red-500/30 bg-red-500/10 text-red-300 mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {loading ? (
            <div className="glass-panel p-8 rounded-3xl border border-white/10">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-slate-900/50 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            </div>
          ) : sessions.length === 0 ? (
            <div className="glass-panel p-8 rounded-3xl border border-white/10 text-slate-400">
              No active sessions available. Monitor will refresh when a new session connects.
            </div>
          ) : (
            sessions.map((session) => (
              <SessionCard key={session.id} session={session} onRevoke={handleRevoke} />
            ))
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;

