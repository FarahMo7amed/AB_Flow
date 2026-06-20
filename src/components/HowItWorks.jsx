import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { FlaskConical, SplitSquareHorizontal, TrendingUp } from "lucide-react";

const stepIcons = [FlaskConical, SplitSquareHorizontal, TrendingUp];
const stepKeys = ["step1", "step2", "step3"];

export default function HowItWorks() {
  const { t } = useLanguage();

 
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

