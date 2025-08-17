"use server";

import { GoogleService } from "@/app/api";
import { PlacesFields, SortOptions } from "@/types/google";
import DEFAULT_FIELDS from "./constant";
import { CompanyDataProps } from "@/types/company";
import { FilterCondition } from "@/types/filters.types";

interface TriggerParams {
  searchText: string;
  lat: number;
  lng: number;
  sortField: SortOptions | null;
  filterConditions: FilterCondition[];
  isSubscribed: boolean;
}

export async function triggerGoogleSearch({
  searchText,
  lat,
  lng,
  sortField,
  filterConditions,
  isSubscribed,
}: TriggerParams) {
  const isEmptyWebsite =
    filterConditions.find((c) => c.field === PlacesFields.WEBSITE_URI)?.value ??
    undefined;
  const isEmptySocialWebsite = true;

  const fields = filterConditions
    .map((c) => c.field)
    .filter((f) => f !== PlacesFields.UNSELECTED) as any[];

  try {
    let companies: CompanyDataProps[];

    if (isSubscribed) {
      companies = await GoogleService.placeList(
        searchText,
        lat.toString(),
        lng.toString(),
        isEmptyWebsite ?? false,
        isEmptySocialWebsite ?? false,
        0,
        sortField ?? SortOptions.NAME,
        fields.length ? fields : DEFAULT_FIELDS
      );
    } else {
      companies = await GoogleService.placeDemoList(
        searchText,
        lat.toString(),
        lng.toString(),
        isEmptyWebsite ?? false,
        isEmptySocialWebsite ?? false,
        0,
        sortField ?? SortOptions.NAME,
        fields.length ? fields : DEFAULT_FIELDS
      );
    }

    return companies;
  } catch (error) {
    console.error("Google search failed:", error);
  }
}
