export default function OverviewPanel({ experiment }) {

  return (

    <div className="space-y-8">

      {/* TOP SUMMARY */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

        <div className="card-glass rounded-2xl p-5">
          <p className="text-sm text-muted-foreground mb-2">
            Total Users
          </p>

          <h3 className="text-3xl font-bold text-foreground">
            {experiment.users.toLocaleString()}
          </h3>
        </div>

        <div className="card-glass rounded-2xl p-5">
          <p className="text-sm text-muted-foreground mb-2">
            Conversion Lift
          </p>

          <h3 className="text-3xl font-bold text-green-400">
            +{experiment.uplift}
          </h3>
        </div>

        <div className="card-glass rounded-2xl p-5">
          <p className="text-sm text-muted-foreground mb-2">
            Confidence
          </p>

          <h3 className="text-3xl font-bold text-foreground">
            96%
          </h3>
        </div>

        <div className="card-glass rounded-2xl p-5">
          <p className="text-sm text-muted-foreground mb-2">
            Days Running
          </p>

          <h3 className="text-3xl font-bold text-foreground">
            {experiment.daysRunning}
          </h3>
        </div>

      </div>

      {/* VARIANT COMPARISON */}

      <div className="rounded-2xl border border-border p-6">

        <h2 className="text-xl font-bold text-foreground mb-6">
          Variant Comparison
        </h2>

        <div className="space-y-6">

          {/* VARIANT A */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <p className="text-sm text-muted-foreground">
                Variant A
              </p>

              <p className="text-sm font-medium text-foreground">
                {experiment.variantA}%
              </p>

            </div>

            <div className="w-full h-4 rounded-full bg-secondary overflow-hidden">

              <div
                className="h-full rounded-full bg-slate-400"
                style={{
                  width: `${experiment.variantA * 5}%`,
                }}
              />

            </div>

          </div>

          {/* VARIANT B */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <p className="text-sm text-muted-foreground">
                Variant B
              </p>

              <p className="text-sm font-medium text-foreground">
                {experiment.variantB}%
              </p>

            </div>

            <div className="w-full h-4 rounded-full bg-secondary overflow-hidden">

              <div
                className="h-full rounded-full bg-blue-500"
                style={{
                  width: `${experiment.variantB * 5}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* AI RECOMMENDATION */}

      <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">

  <h2 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">
    AI Recommendation
  </h2>

  <p className="text-sm leading-7 text-green-800 dark:text-green-100">

          Variant B is consistently outperforming Variant A
          across most user segments with statistically
          significant uplift. Current recommendation:
          continue rollout gradually while monitoring
          returning-user behavior.

        </p>

      </div>

      {/* LIVE STATUS */}

      <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 flex items-center gap-4">

        <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />

        <div>

          <h3 className="font-semibold text-blue-700 dark:text-blue-200">
            Live Experiment Active
          </h3>

          <p className="text-sm text-blue-800 dark:text-blue-100 mt-1">
            Posterior probabilities update automatically
            every few seconds.
          </p>

        </div>

      </div>

    </div>
  );
}