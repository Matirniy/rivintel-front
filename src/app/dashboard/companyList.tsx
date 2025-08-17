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
import { useAuthStore } from "@/store/auth";
import { CompanyDataProps } from "@/types/company";

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

  const [companies, setCompanies] = useState<CompanyDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();

  const isSubscribed = !!user?.isSubscription;

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
        isSubscribed,
      });

      setCompanies(response || []);
      setIsLoading(false);
    };

    fetchCompanies();
  }, [stateLat, stateLng, stateSearchText, sortField, filterConditions]);

  const openCompany = (id: string, isLocked: boolean) => {
    if (!isLocked) router.push(`/company/${id}`);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col mt-6 h-[calc(100%-128px)] overflow-y-auto">
      {companies.map((company, index) => {
        const isLocked = !isSubscribed && index === 2;

        return (
          <div key={company.id} className="relative mb-6">
            <div
              onClick={() => {
                openCompany(company.id, isLocked);
              }}
              className={`block cursor-pointer ${
                isLocked ? "pointer-events-none opacity-30" : ""
              }`}
            >
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
