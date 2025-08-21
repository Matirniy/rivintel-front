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
    searchText: stateSearchText,
    setLat,
    setLng,
    setSearchText,
  } = useMapSearchStore();

  const [companies, setCompanies] = useState<CompanyDataProps[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const isSubscribed = !!user?.isSubscription;

  const didFirstFetch = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchCompanies = async (currentPage: number) => {
    if (isLoading) return;

    setIsLoading(true);

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

    const response: GoogleAnswerType | undefined = await triggerGoogleSearch({
      searchText,
      lat,
      lng,
      sortField,
      filterConditions,
      isSubscribed,
      page: currentPage,
    });

    if (response) {
      setTotal(response.total);
      setCompanies((prev) => [...prev, ...response.data]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (didFirstFetch.current) return;

    didFirstFetch.current = true;

    setCompanies([]);
    setPage(1);
    fetchCompanies(1);
  }, [stateLng, stateSearchText, sortField, filterConditions]);

  useEffect(() => {
    if (isSubscribed) {
      const handleScroll = () => {
        const container = containerRef.current;

        if (!container || isLoading || page * 20 >= total) return;

        const scrollPosition = container.scrollTop + container.clientHeight;
        const threshold = container.scrollHeight * 0.7;

        if (scrollPosition >= threshold) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;

            fetchCompanies(nextPage);

            return nextPage;
          });
        }
      };

      const container = containerRef.current;

      container?.addEventListener("scroll", handleScroll);

      return () => {
        container?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isLoading]);

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

        {isLoading && (
          <div className="flex justify-center py-4">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
