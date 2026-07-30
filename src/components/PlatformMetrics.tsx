import React, { useState, useEffect } from "react";

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

interface StatsData {
  active_keys: number;
  total_tokens: number;
  total_requests: number;
}

export default function PlatformMetrics() {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    const fetchStats = () => {
      fetch("https://indos.tech/api/stats")
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch(() => {});
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60 * 60 * 1000); // refresh every 1 hour
    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  const metrics = [
    { label: "API Keys Active", value: stats.active_keys, suffix: "" },
    { label: "Tokens Processed", value: stats.total_tokens, suffix: "" },
    { label: "Requests Served", value: stats.total_requests, suffix: "" },
  ];

  return (
    <section className="relative py-12 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {formatNumber(metric.value)}
              </div>
              <div className="mt-1 text-sm text-gray-400 uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
