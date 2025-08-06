import SearchBar from "@/components/shared/searchBar";
import CompanyList from "./companyList";

export const revalidate = 60;

export default function DashboardPage() {
  return (
    <div className="px-2 py-4 space-y-4">
      <SearchBar />
      <CompanyList />
    </div>
  );
}

// import SearchBar from "@/components/shared/searchBar";
// import CompanyCard from "./companyCard";
// import SubscriptionButton from "@/components/shared/subscribeButton";
// import { triggerGoogleSearch } from "./actions";

// export const revalidate = 60;

// export default async function DashboardPage() {
//   const isAuthenticated = false;

//   const companies = await triggerGoogleSearch();

//   return (
//     <div className="px-2 py-4 space-y-4">
//       <SearchBar />

//       <div className="grid gap-4 mt-6">
//         {companies.map((company: any, index: number) => {
//           const isLocked = !isAuthenticated && index === 2;

//           return (
//             <div key={company.name + index} className="relative">
//               <div className={isLocked ? "pointer-events-none opacity-30" : ""}>
//                 <CompanyCard {...company} />
//               </div>
//               {isLocked && (
//                 <div className="absolute inset-x-0 top-11 flex items-center justify-center rounded pointer-events-auto">
//                   <SubscriptionButton />
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
