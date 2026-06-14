import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden mesh-bg">
      <div className="absolute top-1/3 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[100px] floating" />
      <div className="absolute bottom-1/4 right-[15%] w-64 h-64 bg-accent/10 rounded-full blur-[100px] floating-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-label mb-8 mx-auto w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              {t("hero.badge")}
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-foreground mb-6">
              {t("hero.title").split(" ").slice(0, -2).join(" ")}{" "}
              <span className="gradient-text">
                {t("hero.title").split(" ").slice(-2).join(" ")}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {!user ? (
              <Link
                to="/register"
                className="btn-gradient inline-flex items-center gap-2.5 text-base group"
              >
                {t("hero.cta_primary")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              ) : (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm text-foreground font-semibold hover:bg-card hover:border-border transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 text-primary" />
                </div>
                {t("hero.cta_secondary")}
              </Link>
              )}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {t("hero.stats.experiments")}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {t("hero.stats.uptime")}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {t("hero.stats.compliance")}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 relative"
          >
            <div className="card-glass p-2 sm:p-3 rounded-2xl border border-border/40">
              <div className="bg-secondary/80 rounded-xl p-4 sm:p-6 overflow-hidden">
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/70" />
                    <div className="w-3 h-3 rounded-full bg-accent/50" />
                    <div className="w-3 h-3 rounded-full bg-primary/40" />
                  </div>
                  <div className="flex-1 h-7 rounded-lg bg-muted/60 mx-8" />
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    {
                      label: t("hero.mockup.conversion_rate"),
                      value: "+34.2%",
                      color: "text-accent",
                    },
                    {
                      label: t("hero.mockup.active_tests"),
                      value: "12",
                      color: "text-primary",
                    },
                    {
                      label: t("hero.mockup.total_visitors"),
                      value: "84.3K",
                      color: "text-foreground",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/30"
                    >
                      <p className="text-xs text-muted-foreground mb-1">
                        {stat.label}
                      </p>
                      <p
                        className={`text-xl sm:text-2xl font-display font-bold ${stat.color}`}
                      >
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-card/60 rounded-xl p-4 border border-border/30">
                  <div className="flex items-end gap-2 h-24">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const height =
                        30 + Math.sin(i * 0.8) * 30 + Math.random() * 20;
                      return (
                        <div
                          key={i}
                          className="flex-1 rounded-t-md"
                          style={{
                            height: `${height}%`,
                            background:
                              i === 8
                                ? "linear-gradient(180deg, hsl(346 87% 60%), hsl(15 90% 60%))"
                                : "hsl(var(--muted))",
                            opacity: i === 8 ? 1 : 0.6,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute -inset-8 -z-10 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, hsl(238 73% 60% / 0.08), transparent 70%)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

