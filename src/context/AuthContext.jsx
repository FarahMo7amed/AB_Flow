import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("abflow_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("abflow_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("abflow_user");
    }
  }, [user]);

  const login = (userData) => {
    setUser({
      ...userData,
      onboardingCompleted: false,
      onboardingAnswers: null,
    });
  };

  const completeOnboarding = (answers) => {
    setUser((prev) => ({
      ...prev,
      onboardingCompleted: true,
      onboardingAnswers: answers,
    }));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, completeOnboarding }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}