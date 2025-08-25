"use client";

import { useEffect, useState, useRef } from "react";
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
import { GoogleAnswerType } from "@/types/google";

export default function CompanyList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { filterConditions } = useFiltersStore();
  const { sortField } = useSortingStore();
  const {
    lat: stateLat,
    lng: stateLng,
    radius: stateRadius,
    searchText: stateSearchText,
    setLat,
    setLng,
    setRadius,
    setSearchText,
  } = useMapSearchStore();

  const [companies, setCompanies] = useState<CompanyDataProps[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user, hydrated } = useAuthStore();
  const isSubscribed = !!user?.isSubscription;

  const didFirstFetch = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchCompanies = async (currentPage: number, firstLoading: boolean) => {
    if (isLoading || !hydrated) return;

    if (firstLoading) {
      setIsLoading(true);
    }

    let lat = stateLat;
    let lng = stateLng;
    let searchText = stateSearchText;
    let radius = stateRadius;

    const queryLat = parseFloat(searchParams.get("lat") || "");
    const queryLng = parseFloat(searchParams.get("lng") || "");
    const queryRadius = parseFloat(searchParams.get("radius") || "");
    const querySearchText = searchParams.get("searchtext");

    if (!lat && !isNaN(queryLat)) {
      lat = queryLat;
      setLat(queryLat);
    }

    if (!lng && !isNaN(queryLng)) {
      lng = queryLng;
      setLng(queryLng);
    }

    if (!radius && !isNaN(queryRadius)) {
      radius = queryRadius;
      setRadius(queryRadius);
    }

    if (!searchText && querySearchText) {
      searchText = querySearchText;
      setSearchText(querySearchText);
    }

    if (!lat || !lng || !searchText) {
      router.push("/");
      return;
    }

    const response: GoogleAnswerType | undefined = await triggerGoogleSearch({
      searchText,
      lat,
      lng,
      radius,
      sortField,
      filterConditions,
      isSubscribed,
      page: currentPage,
    });

    if (response) {
      setTotal(response.total);
      setCompanies((prev) =>
        currentPage === 1 ? response.data : [...prev, ...response.data]
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (didFirstFetch.current || !hydrated) return;

    didFirstFetch.current = true;
    setCompanies([]);
    setPage(1);
    fetchCompanies(1, true);
  }, [
    hydrated,
    stateLng,
    stateSearchText,
    stateRadius,
    sortField,
    filterConditions,
  ]);

  useEffect(() => {
    if (page === 1 || !hydrated) return;

    fetchCompanies(page, false);
  }, [page, hydrated]);

  useEffect(() => {
    if (!isSubscribed || !hydrated) return;

    const handleScroll = () => {
      const container = containerRef.current;

      if (!container || isLoading || page * 20 >= total) return;

      const scrollPosition = container.scrollTop + container.clientHeight;
      const threshold = container.scrollHeight * 0.7;

      if (scrollPosition >= threshold) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const container = containerRef.current;

    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [hydrated, total, isSubscribed, isLoading, page]);

  const openCompany = (id: string, isLocked: boolean) => {
    if (!isLocked) router.push(`/company/${id}`);
  };

  return (
    <div className="h-[calc(100%-128px)]">
      <div className="mb-4">Total: {total} companies</div>
      <div
        className="relative flex flex-col h-[calc(100%-40px)] overflow-y-auto"
        ref={containerRef}
      >
        {companies.map((company, index) => {
          const isLocked = !isSubscribed && index === 2;

          return (
            <div key={company.id} className="relative mb-6">
              <div
                onClick={() => openCompany(company.id, isLocked)}
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

        {(isLoading || !hydrated) && (
          <div className="flex justify-center py-4">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
