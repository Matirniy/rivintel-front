"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useFiltersStore } from "@/store/filters";
import { useSortingStore } from "@/store/sorting";
import SubscriptionButton from "@/components/shared/subscribeButton";
import CompanyCard from "./companyCard";
import { triggerGoogleSearch } from "./actions";
import { useMapSearchStore } from "@/store/map";
import Loader from "@/components/shared/loader";
import COMPANIES from "./constant";

export default function CompanyList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { filterConditions } = useFiltersStore();
  const { sortField } = useSortingStore();
  const {
    lat: stateLat,
    lng: stateLng,
    searchText: stateSearchText,
    setLat,
    setLng,
    setSearchText,
  } = useMapSearchStore();

  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = false;

  useEffect(() => {
    const fetchCompanies = async () => {
      let lat = stateLat;
      let lng = stateLng;
      let searchText = stateSearchText;

      const queryLat = parseFloat(searchParams.get("lat") || "");
      const queryLng = parseFloat(searchParams.get("lng") || "");
      const querySearchText = searchParams.get("searchtext");

      if (!lat && !isNaN(queryLat)) {
        lat = queryLat;
        setLat(queryLat);
      }

      if (!lng && !isNaN(queryLng)) {
        lng = queryLng;
        setLng(queryLng);
      }

      if (!searchText && querySearchText) {
        searchText = querySearchText;
        setSearchText(querySearchText);
      }

      if (!lat || !lng || !searchText) {
        router.push("/");

        return;
      }

      setIsLoading(true);

      const response = await triggerGoogleSearch({
        searchText,
        lat,
        lng,
        sortField,
        filterConditions,
      });

      setCompanies(response || []);
      setIsLoading(false);
    };

    fetchCompanies();
  }, [stateLat, stateLng, stateSearchText, sortField, filterConditions]);

  if (isLoading) return <Loader />;

  const renderCompanies = !isAuthenticated ? COMPANIES : companies;

  return (
    <div className="grid gap-4 mt-6">
      {renderCompanies.map((company, index) => {
        const isLocked = !isAuthenticated && index === 2;

        return (
          <div key={company.name + index} className="relative">
            <div className={isLocked ? "pointer-events-none opacity-30" : ""}>
              <CompanyCard {...company} />
            </div>

            {isLocked && (
              <div className="absolute inset-x-0 top-11 flex items-center justify-center rounded pointer-events-auto">
                <SubscriptionButton />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
