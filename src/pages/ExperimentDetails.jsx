import { useState } from "react";
import { experiments } from "../data/experiments";
import OverviewPanel from "../components/dashboard/OverviewPanel";
import SequentialAnalysisChart from "../components/dashboard/SequentialAnalysisChart";
import SegmentationCards from "../components/dashboard/SegmentationCards";
import UpliftChart from "../components/dashboard/UpliftChart";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Download,
  FileText,
  Share2,
} from "lucide-react";

export default function ExperimentDetails() {
  const { id } = useParams();
  const decisionLabels = {
  CONTINUE: "Continue Testing",
  STOP_WINNER: "Winner Found",
  STOP_NULL: "No Significant Difference",
};

  const experiment = experiments.find(
    (exp) => exp.id === Number(id)
  );

  const [activeTab, setActiveTab] = useState("overview");

  if (!experiment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
        Experiment not found
      </div>
    );
  }

  const decisionBannerStyles = {
  CONTINUE:
    "bg-card border border-border border-l-[10px] border-l-blue-500 shadow-md",

  STOP_WINNER:
    "bg-card border border-border border-l-[10px] border-l-green-500 shadow-md",

  STOP_NULL:
    "bg-card border border-border border-l-[10px] border-l-red-500 shadow-md",
};

  const decisionMessage = {
    CONTINUE:
      "The experiment is still collecting data. No significant winner yet.",

    STOP_WINNER:
      "Variant B achieved statistically significant improvement.",

    STOP_NULL:
      "No statistically meaningful difference was detected.",
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">

      <div className="mb-6">
      <Link
  to="/dashboard"
  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-secondary transition"
>
  <ArrowLeft size={18} />
  Back
</Link>
    </div>

      {/* HEADER */}

      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">
          Experiment #{experiment.id}
        </p>

        <h1 className="text-3xl font-bold text-foreground">
          {experiment.name}
        </h1>
      </div>

      {/* DECISION BANNER */}

      <div
        className={`rounded-2xl border p-5 mb-8 ${decisionBannerStyles[experiment.decision]}`}
      >
        <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
  {experiment.decision === "STOP_WINNER" && "🏆"}
  {experiment.decision === "STOP_NULL" && "❌"}
  {experiment.decision === "CONTINUE" && "⏳"}

  {decisionLabels[experiment.decision]}
</h2>

        <p className="text-sm opacity-90">
          {decisionMessage[experiment.decision]}
        </p>
      </div>


      <div className="flex flex-wrap gap-4 mb-8 text-sm text-muted-foreground">

  <span>
    Status:
    <span className="ml-1 text-blue-400">
      {experiment.status}
    </span>
  </span>

  <span>
    Start Date: {experiment.startDate}
  </span>

  <span>
    Users: {experiment.users}
  </span>

</div>

      

      <div className="flex flex-wrap gap-3 mb-8">

  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary">
  <Download size={16} />
  Export CSV
</button>

<button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary">
  <FileText size={16} />
  Export PDF
</button>

<button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white">
  <Share2 size={16} />
  Share Link
</button>

</div>

      {/* TABS */}

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === "overview"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab("sequential")}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === "sequential"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}
        >
          Sequential Analysis
        </button>

        <button
          onClick={() => setActiveTab("segmentation")}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === "segmentation"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}
        >
          Segmentation
        </button>

        <button
          onClick={() => setActiveTab("uplift")}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTab === "uplift"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}
        >
          Uplift
        </button>
      </div>

      {/* TAB CONTENT */}

      <div className="card-glass rounded-2xl p-6">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">
              Overview
            </h2>

            <OverviewPanel experiment={experiment} />
          </div>
        )}

        {activeTab === "sequential" && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">
              Sequential Analysis
            </h2>

            <SequentialAnalysisChart />
          </div>
        )}

        {activeTab === "segmentation" && (
          <div>
  <h2 className="text-xl font-bold text-foreground mb-6">
    Segmentation Analysis
  </h2>

  <SegmentationCards />
</div>
        )}

        {activeTab === "uplift" && (
          <div>
  <h2 className="text-xl font-bold text-foreground mb-6">
    Uplift Modeling
  </h2>

  <UpliftChart />
</div>
        )}
      </div>
    </div>
  );
}