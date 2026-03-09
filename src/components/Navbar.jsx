import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Sun, Moon, Globe, Menu, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { t, toggleLanguage, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (to) => {
    setMobileOpen(false);
    if (to.startsWith("/#") && location.pathname === "/") {
      const id = to.slice(2);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className={`container mx-auto transition-all duration-300`}>
        <div
          className={`flex items-center justify-between h-14 px-5 rounded-2xl transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-xl border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)]" : "bg-transparent"}`}
        >
          <Link to="/" className="flex items-center group">
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

          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            <Link
              to="/"
              onClick={() => handleNavClick("/")}
              className="text-sm font-medium text-foreground/80 hover:text-foreground px-4 py-2 rounded-full hover:bg-secondary/80 transition-all duration-200"
            >
              {t("nav.home")}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1 bg-secondary/30 p-1 rounded-full border border-border/40">
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-background shadow-sm transition-all duration-200"
                aria-label="Switch language"
              >
                <div className="flex gap-1 items-center text-[10px] font-bold">
                  {language === "en" ? "ع" : "EN"}
                </div>
              </button>

              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-background shadow-sm transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-3.5 h-3.5" />
                ) : (
                  <Moon className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            <div className="w-px h-5 bg-border/60 mx-1" />

            {!user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground px-4 py-2 rounded-full hover:bg-secondary/80 transition-all duration-200"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  className="btn-gradient inline-flex items-center gap-2 !px-5 !py-2 text-sm"
                >
                  {t("nav.register")}
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-secondary/30 pl-2 pr-1 py-1 rounded-full border border-border/40">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 text-white font-medium text-xs shadow-sm">
                    {user?.name ? (
                      user.name.charAt(0).toUpperCase()
                    ) : (
                      <User className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground pr-2">
                    {user?.name || t("nav.user_placeholder")}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  title={t("nav.logout")}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {mobileOpen ? (
            <button
              className="md:hidden p-2 text-foreground rounded-full hover:bg-secondary/80 bg-secondary/50 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              className="md:hidden p-2 text-foreground rounded-full hover:bg-secondary/80 transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-2xl border border-border/50 shadow-2xl rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4">
              <Link
                to="/"
                onClick={() => handleNavClick("/")}
                className="text-base font-medium text-foreground py-3 px-4 rounded-xl hover:bg-secondary/60 transition-colors"
              >
                {t("nav.home")}
              </Link>

              <div className="flex items-center gap-3 px-4 py-4 mt-2 border-t border-border/40">
                <button
                  onClick={toggleLanguage}
                  className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-foreground bg-secondary/40 py-2.5 rounded-xl hover:bg-secondary/60 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  {language === "en" ? "عربي" : "English"}
                </button>
                <button
                  onClick={toggleTheme}
                  className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-foreground bg-secondary/40 py-2.5 rounded-xl hover:bg-secondary/60 transition-colors"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-4 h-4" /> {t("nav.theme_light")}
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4" /> {t("nav.theme_dark")}
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-col gap-2 pt-2 px-2">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-center font-medium text-foreground py-3 rounded-xl hover:bg-secondary/60"
                    >
                      {t("nav.login")}
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="btn-gradient text-center !py-3 text-sm"
                    >
                      {t("nav.register")}
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 border border-border/40">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 text-white font-medium shadow-sm">
                        {user?.name ? (
                          user.name.charAt(0).toUpperCase()
                        ) : (
                          <User className="w-5 h-5" />
                        )}
                      </div>
                      <span className="font-medium text-foreground">
                        {user?.name || t("nav.user_placeholder")}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

