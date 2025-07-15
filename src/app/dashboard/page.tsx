"use client";

import SearchBar from "@/components/shared/searchBar";
import CompanyCard from "./companyCard";

export default function DashboardPage() {

  return (
    <div className="px-4 py-6 space-y-4">
      <SearchBar />

      <div className="grid gap-4 mt-6">
        <CompanyCard
          name="Coffee Club Berlin"
          rating={4.5}
          address="Alexanderplatz 1, 10178 Berlin, Germany"
          phone="+49 30 123456"
          email="info@coffeeclub.de"
          website="https://coffeeclub.de"
        />
      </div>
    </div>
  );
}