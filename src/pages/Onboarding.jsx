import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();

  const [form, setForm] = useState({
    role: "",
    platform: "",
    goal: "",
    traffic: "",
    experience: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
    completeOnboarding(form);
    navigate("/");
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to ABFlow</h1>
        <p className="text-muted-foreground mb-8">
          Answer a few questions to personalize your experience.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">What is your role?</label>
            <select
              className={inputClass}
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              <option value="">Select your role</option>
              <option>Product Manager</option>
              <option>Marketing Specialist</option>
              <option>Data Analyst</option>
              <option>Developer</option>
              <option>Business Owner</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              What type of platform do you want to test?
            </label>
            <select
              className={inputClass}
              value={form.platform}
              onChange={(e) => handleChange("platform", e.target.value)}
            >
              <option value="">Select platform</option>
              <option>E-commerce Store</option>
              <option>Landing Page</option>
              <option>Mobile App</option>
              <option>SaaS Product</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              What metric do you prefer to optimize?
            </label>
            <select
              className={inputClass}
              value={form.goal}
              onChange={(e) => handleChange("goal", e.target.value)}
            >
              <option value="">Select metric</option>
              <option>Conversion Rate</option>
              <option>Click Through Rate</option>
              <option>Revenue</option>
              <option>User Engagement</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              What is your monthly traffic?
            </label>
            <select
              className={inputClass}
              value={form.traffic}
              onChange={(e) => handleChange("traffic", e.target.value)}
            >
              <option value="">Select traffic range</option>
              <option>Less than 10k users</option>
              <option>10k - 100k</option>
              <option>100k - 1M</option>
              <option>More than 1M</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              What is your estimated budget for A/B testing?
            </label>
            <select
              className={inputClass}
              value={form.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
            >
              <option value="">Select budget range</option>
              <option>Less than $500</option>
              <option>$500 - $2,000</option>
              <option>$2,000 - $5,000</option>
              <option>More than $5,000</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              How experienced are you with A/B testing?
            </label>
            <select
              className={inputClass}
              value={form.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
            >
              <option value="">Select experience</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-gradient w-full !py-3.5 text-sm"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}