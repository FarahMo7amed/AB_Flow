import { Link } from "react-router-dom";
import { experiments } from "../../data/experiments";

export default function ExperimentTable({
  searchTerm,
  statusFilter,
  }) {

    const filteredExperiments = experiments.filter((exp) => {

    const matchesSearch =
      exp.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      exp.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  const getStatusBadge = (status) => {
    switch (status) {
      case "Running":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";

      case "Complete":
        return "bg-green-500/20 text-green-400 border border-green-500/30";

      case "Stopped":
        return "bg-red-500/20 text-red-400 border border-red-500/30";

      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    }
  };

  return (
    <div className="card-glass rounded-2xl p-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">
          Experiments
        </h2>

        <button className="btn-gradient px-5 py-2 text-sm">
          + New Experiment
        </button>
      </div>

      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b border-border/50 text-left">
            <th className="pb-4 text-sm font-semibold text-muted-foreground">
              Experiment
            </th>

            <th className="pb-4 text-sm font-semibold text-muted-foreground">
              Status
            </th>

            <th className="pb-4 text-sm font-semibold text-muted-foreground">
              Users
            </th>

            <th className="pb-4 text-sm font-semibold text-muted-foreground">
              Start Date
            </th>

            <th className="pb-4 text-sm font-semibold text-muted-foreground">
              Decision
            </th>

            <th className="pb-4 text-sm font-semibold text-muted-foreground">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredExperiments.map((exp) => (
            <tr
              key={exp.id}
              className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
            >
              <td className="py-5">
                <div>
                  <p className="font-medium text-foreground">
                    {exp.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    #{exp.id}
                  </p>
                </div>
              </td>

              <td className="py-5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(
                    exp.status
                  )}`}
                >
                  {exp.status}
                </span>
              </td>

              <td className="py-5 text-foreground">
                {exp.users.toLocaleString()}
              </td>

              <td className="py-5 text-foreground">
                {exp.startDate}
              </td>

              <td className="py-5">
                <span
                  className={`text-sm font-semibold ${
                    exp.decision === "STOP_WINNER"
                      ? "text-green-400"
                      : exp.decision === "STOP_NULL"
                      ? "text-red-400"
                      : "text-blue-400"
                  }`}
                >
                  {exp.decision}
                </span>
              </td>

              <td className="py-5">
                <Link
                  to={`/experiments/${exp.id}`}
                  className="text-primary hover:underline font-medium"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}