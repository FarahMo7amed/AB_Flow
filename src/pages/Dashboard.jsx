import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import ExperimentTable from "../components/dashboard/ExperimentTable";
import { useState } from "react";


export default function Dashboard() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  if (!user?.onboardingCompleted) {
  return <Navigate to="/onboarding" replace />;
}

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-muted-foreground mt-2">
            Here is your A/B testing analytics dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">

  <div className="rounded-2xl border border-border p-5 bg-card">
    <p className="text-sm text-muted-foreground">
      Total Experiments
    </p>
    <h2 className="text-2xl font-bold mt-2">
      3
    </h2>
  </div>

  <div className="rounded-2xl border border-border p-5 bg-card">
    <p className="text-sm text-muted-foreground">
      Running
    </p>
    <h2 className="text-2xl font-bold mt-2">
      1
    </h2>
  </div>

  <div className="rounded-2xl border border-border p-5 bg-card">
    <p className="text-sm text-muted-foreground">
      Completed
    </p>
    <h2 className="text-2xl font-bold mt-2">
      2
    </h2>
  </div>

  <div className="rounded-2xl border border-border p-5 bg-card">
    <p className="text-sm text-muted-foreground">
      Avg Conversion
    </p>
    <h2 className="text-2xl font-bold mt-2">
      4.8%
    </h2>
  </div>

</div>

<div className="flex flex-wrap gap-4 mb-6">

        <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="rounded-xl border border-border bg-card px-4 py-2"
>

          <option>All Status</option>
          <option>Running</option>
          <option>Complete</option>
          <option>Stopped</option>

        </select>

        <input
  type="text"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search Experiment..."
  className="rounded-xl border border-border bg-card px-4 py-2"
/>

      </div>

        

        <ExperimentTable
  searchTerm={searchTerm}
  statusFilter={statusFilter}
/>
      </div>
    </div>
  );
}