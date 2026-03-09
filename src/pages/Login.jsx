import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
export default function Login() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = t("validation.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = t("validation.email_invalid");
    if (!form.password) errs.password = t("validation.required");
    else if (form.password.length < 8)
      errs.password = t("validation.password_min");
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      login({ name: form.email.split("@")[0], email: form.email });
      navigate("/");
    }
  };

  const onChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputClass =
    "w-full pl-10 pr-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-200";

  return (
    <div className="min-h-screen bg-background mesh-bg">
      <div className="flex items-center justify-center min-h-screen pt-16 px-4">
        <div className="w-full max-w-md">
          <div className="card-glass p-8 sm:p-10 rounded-2xl">
            <div className="card-glass p-8 sm:p-10 rounded-2xl">
              <Link to="/">
                <img
                  src="/abflow_logo_light.png"
                  alt="ABFlow"
                  className="h-10 w-auto object-contain block dark:hidden"
                />
                <img
                  src="/abflow_logo_dark.svg"
                  alt="ABFlow"
                  className="h-10 w-auto object-contain hidden dark:block"
                />
              </Link>
            </div>
            <div className="text-center mb-8">
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                {t("login.title")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("login.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("login.email")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    className={inputClass}
                    placeholder={t("login.email_placeholder")}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive mt-1.5">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("login.password")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => onChange("password", e.target.value)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all duration-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive mt-1.5">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={(e) => onChange("remember", e.target.checked)}
                    className="rounded border-border accent-primary"
                  />
                  {t("login.remember")}
                </label>
                <a
                  href="#"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  {t("login.forgot")}
                </a>
              </div>

              <button
                type="submit"
                className="btn-gradient w-full !py-3.5 text-sm inline-flex items-center justify-center gap-2 group"
              >
                {t("login.submit")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-8">
              {t("login.no_account")}{" "}
              <Link
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                {t("login.register_link")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

