import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "44 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center px-4">
        <h1 className="mb-4 text-6xl font-display font-bold text-primary">
          {t("not_found.title")}
        </h1>
        <p className="mb-8 text-xl text-muted-foreground max-w-md mx-auto">
          {t("not_found.subtitle")}
        </p>
        <Link
          to="/"
          className="btn-gradient inline-flex items-center gap-2 text-sm"
        >
          {t("not_found.back_home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

