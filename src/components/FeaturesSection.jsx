import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { Beaker, BarChart3, Target, Flag } from "lucide-react";

const features = [
  {
    icon: Beaker,
    key: "experiment_builder",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: BarChart3,
    key: "realtime_analytics",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Target,
    key: "conversion_tracking",
    gradient: "from-primary/15 to-accent/10",
  },
  {
    icon: Flag,
    key: "feature_flags",
    gradient: "from-accent/15 to-primary/10",
  },
];

export default function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-28 relative mesh-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="section-label mb-4 inline-flex">
            {t("nav.features")}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            {t("features.title")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("features.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, key, gradient }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="card-glass p-7 group"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2.5">
                {t(`features.${key}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`features.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

