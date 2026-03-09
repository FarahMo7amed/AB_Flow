import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const socialLinks = [
  { icon: Twitter, label: "Twitter" },
  { icon: Github, label: "GitHub" },
  { icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  const { t } = useLanguage();

  const columns = [
    {
      title: t("footer.product"),
      links: [
        t("footer.features"),
        t("footer.pricing"),
        t("footer.integrations"),
        t("footer.changelog"),
      ],
    },
    {
      title: t("footer.company"),
      links: [
        t("footer.about"),
        t("footer.careers"),
        t("footer.blog"),
        t("footer.contact"),
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        t("footer.docs"),
        t("footer.api_reference"),
        t("footer.guides"),
        t("footer.community"),
      ],
    },
  ];

  return (
    <footer className="relative border-t border-border/40">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col gap-10 md:grid md:grid-cols-5 md:gap-8">
          <div className="md:col-span-2 md:pr-8">
            <Link to="/" className="inline-flex items-center group">
              <img
                src="/abflow_logo_light.png"
                alt="ABFlow"
                className="h-9 w-auto object-contain group-hover:opacity-90 transition-opacity block dark:hidden"
              />
              <img
                src="/abflow_logo_dark.svg"
                alt="ABFlow"
                className="h-9 w-auto object-contain group-hover:opacity-90 transition-opacity hidden dark:block"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t("footer.description")}
            </p>
            <div className="flex gap-2 mt-6">
              {socialLinks.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-secondary/80 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-border transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:contents">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-display font-semibold text-sm text-foreground mb-4 uppercase tracking-wide">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-12 sm:mt-16 pt-8 border-t border-border/40 text-sm text-muted-foreground">
          <p className="text-center sm:text-left">{t("footer.copyright")}</p>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <a
              href="#"
              className="hover:text-foreground transition-colors whitespace-nowrap"
            >
              {t("footer.privacy")}
            </a>
            <a
              href="#"
              className="hover:text-foreground transition-colors whitespace-nowrap"
            >
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

