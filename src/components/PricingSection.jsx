import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

const planKeys = ["starter", "pro", "enterprise"];

export default function PricingSection() {
  const { t } = useLanguage();

  return (
   
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {planKeys.map((key, i) => {
            const isPro = key === "pro";
            const features = t(`pricing.${key}.features`);
            return (
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
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  isPro
                    ? "bg-card border-2 border-primary/30 shadow-lg ring-1 ring-primary/10 scale-[1.03]"
                    : "card-glass"
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="font-display text-5xl font-bold text-foreground">
                    {t(`pricing.${key}.price`)}
                  </span>
                  {key !== "enterprise" && (
                    <span className="text-sm text-muted-foreground">
                      {t("pricing.monthly")}
                    </span>
                  )}
                </div>
                <ul className="space-y-3.5 mb-8">
                  {Array.isArray(features) &&
                    features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                </ul>
                <button
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isPro
                      ? "btn-gradient"
                      : "bg-secondary text-foreground hover:bg-secondary/80 border border-border/50"
                  }`}
                >
                  {t(`pricing.${key}.cta`)}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

