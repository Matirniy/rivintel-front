"use client";

import React, { useEffect, useState } from "react";
import { useMapSearchStore } from "@/store/map";
import Loader from "../shared/loader";
import { triggerAnalytic } from "@/app/(main)/dashboard/actions";

interface AnalyticsProps {
  isSubscribed: boolean;
}

export default function Analytics({ isSubscribed }: AnalyticsProps) {
  const { lat, lng, searchText, radius } = useMapSearchStore();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    const fetchAnalytics = async () => {      
      if (!isSubscribed || !lat || !lng) return;

      setLoading(true);

      try {
        const res = await triggerAnalytic({
          searchText,
          lat,
          lng,
          radius,
        });

        setResult(res ?? "No data");
      } catch (err) {
        console.error("Analytics error:", err);

        setResult("Error occurred during analysis");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [searchText, lat, lng, isSubscribed]);

  return (
    <div className="h-[92%] flex flex-col">
      <div className="flex-1 mt-4 overflow-auto">
        {loading && <Loader />}
        {!loading && result && (
          <pre className="p-3 border rounded bg-gray-50 text-sm overflow-x-auto">
            {result}
          </pre>
        )}
      </div>
    </div>
  );
}
