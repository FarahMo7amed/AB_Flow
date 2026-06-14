const segments = [
  {
    id: 1,
    label: "Mobile Users",
    users: 5400,
    variantA: 12,
    variantB: 17,
    uplift: "+5%",
    significant: true,
  },

  {
    id: 2,
    label: "Desktop Users",
    users: 3200,
    variantA: 14,
    variantB: 14.5,
    uplift: "+0.5%",
    significant: false,
  },

  {
    id: 3,
    label: "Returning Users",
    users: 2100,
    variantA: 9,
    variantB: 15,
    uplift: "+6%",
    significant: true,
  },

  {
    id: 4,
    label: "New Users",
    users: 4100,
    variantA: 11,
    variantB: 12,
    uplift: "+1%",
    significant: false,
  },
];

export default function SegmentationCards() {

  return (

    <div className="grid md:grid-cols-2 gap-5">

      {segments.map((segment) => (

        <div
          key={segment.id}
          className={`rounded-2xl border p-5 transition-all

          ${
            segment.significant
  ? "border-2 border-green-500 bg-green-500/15 shadow-lg shadow-green-500/20"
  : "border border-border bg-card"
          }`}
        >

          {/* HEADER */}

          <div className="flex items-center justify-between mb-4">

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {segment.label}
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                {segment.users.toLocaleString()} users
              </p>
            </div>

            <div className="flex items-center gap-2">

              {segment.significant && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white shadow-md shadow-green-500/40">
  ✓ Significant
</span>
              )}

              <span className="px-3 py-1 rounded-full text-xs bg-primary/20 text-primary">
                {segment.uplift}
              </span>

            </div>

          </div>

          {/* VARIANT A */}

          <div className="mb-5">

            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">
                Variant A
              </p>

              <p className="text-sm font-medium text-foreground">
                {segment.variantA}%
              </p>
            </div>

            <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">

              <div
                className="h-full rounded-full bg-slate-400"
                style={{
                  width: `${segment.variantA * 4}%`,
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
                {segment.variantB}%
              </p>
            </div>

            <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">

              <div
                className="h-full rounded-full bg-blue-500"
                style={{
                  width: `${segment.variantB * 4}%`,
                }}
              />

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}