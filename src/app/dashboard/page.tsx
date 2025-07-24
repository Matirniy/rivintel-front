"use client";

import SearchBar from "@/components/shared/searchBar";
import CompanyCard from "./companyCard";
import COMPANIES from "./constant";
import SubscriptionButton from "@/components/shared/subscribeButton";

export default function DashboardPage() {
  const isAuthenticated = false;

  return (
    <div className="px-4 py-6 space-y-4">
      <SearchBar />

      <div className="grid gap-4 mt-6">
        {COMPANIES.map((company, index) => {
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

      <div className="flex justify-center mt-8">
        <div className="join">
          <button className="join-item btn btn-outline btn-primary btn-sm">
            «
          </button>
          <button className="join-item btn btn-outline btn-primary btn-sm btn-active">
            1
          </button>
          <button className="join-item btn btn-outline btn-primary btn-sm">
            2
          </button>
          <button className="join-item btn btn-outline btn-primary btn-sm">
            3
          </button>
          <button className="join-item btn btn-outline btn-primary btn-sm">
            »
          </button>
        </div>
      </div>
    </div>
  );
}
