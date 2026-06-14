import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
export default function Register() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = t("validation.required");
    if (!form.email.trim()) errs.email = t("validation.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = t("validation.email_invalid");
    if (!form.password) errs.password = t("validation.required");
    else if (form.password.length < 8)
      errs.password = t("validation.password_min");
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = t("validation.passwords_mismatch");
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      login({ name: form.name, email: form.email });
      navigate("/onboarding");
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
      <div className="flex items-center justify-center min-h-screen pt-16 px-4 py-8">
        <div className="w-full max-w-md">
          <div className="card-glass p-8 sm:p-10 rounded-2xl">
            <div className="flex justify-center mb-6">
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
                {t("register.title")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("register.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("register.name")}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    className={inputClass}
                    placeholder={t("register.name_placeholder")}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-destructive mt-1.5">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("register.email")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    className={inputClass}
                    placeholder={t("register.email_placeholder")}
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
                  {t("register.password")}
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

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("register.confirm_password")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      onChange("confirmPassword", e.target.value)
                    }
                    className={inputClass}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive mt-1.5">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn-gradient w-full !py-3.5 text-sm inline-flex items-center justify-center gap-2 group"
              >
                {t("register.submit")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-8">
              {t("register.has_account")}{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                {t("register.login_link")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

