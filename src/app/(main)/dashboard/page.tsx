import { Suspense } from "react";

import SearchBar from "@/components/shared/searchBar";
import CompanyList from "./companyList";
import Loader from "@/components/shared/loader";

export default function DashboardPage() {
  return (
    <div className="px-3 py-4 space-y-4 h-[calc(100vh-112px)] sm:px-4 md:h-full">
      <SearchBar />

      <Suspense fallback={<Loader />}>
        <CompanyList />
      </Suspense>
    </div>
  );
}
