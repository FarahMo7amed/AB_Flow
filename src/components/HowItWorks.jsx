import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { FlaskConical, SplitSquareHorizontal, TrendingUp } from "lucide-react";

const stepIcons = [FlaskConical, SplitSquareHorizontal, TrendingUp];
const stepKeys = ["step1", "step2", "step3"];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-subtle)" }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="section-label mb-4 inline-flex">
            {t("how_it_works.title")}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            {t("how_it_works.title")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("how_it_works.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          {stepKeys.map((key, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-center relative"
              >
                <div className="relative mx-auto mb-8 w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-2 border-primary/10" />
                  <div className="absolute inset-2 rounded-full bg-card border border-border/50 flex items-center justify-center shadow-sm">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold font-display shadow-md">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                  {t(`how_it_works.${key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {t(`how_it_works.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

