import { Suspense } from "react";

import SearchBar from "@/components/shared/searchBar";
import CompanyList from "./companyList";
import Loader from "@/components/shared/loader";

export const revalidate = 60;

export default function DashboardPage() {
  return (
    <div className="px-2 py-4 h-full space-y-4">
      <SearchBar />
      <Suspense fallback={<Loader />}>
        <CompanyList />
      </Suspense>
    </div>
  );
}
