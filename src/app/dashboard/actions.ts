"use server";

import { GoogleService } from "@/app/api";
import { GoogleAnswerType, PlacesFields, SortOptions } from "@/types/google";
import DEFAULT_FIELDS from "./constant";
import { FilterCondition } from "@/types/filters.types";

interface TriggerParams {
  searchText: string;
  lat: number;
  lng: number;
  radius: number;
  sortField: SortOptions | null;
  filterConditions: FilterCondition[];
  isSubscribed: boolean;
  page: number;
}

export async function triggerGoogleSearch({
  searchText,
  lat,
  lng,
  radius,
  sortField,
  filterConditions,
  isSubscribed,
  page,
}: TriggerParams) {
  const isEmptyWebsite =
    filterConditions.find((c) => c.field === PlacesFields.WEBSITE_URI)?.value ??
    undefined;
  const isEmptySocialWebsite = true;
  
  const fields = filterConditions
    .map((c) => c.field)
    .filter((f) => f !== PlacesFields.UNSELECTED) as any[];

  try {
    let companies: GoogleAnswerType;
    
    if (isSubscribed) {
      companies = await GoogleService.placeList(
        searchText,
        lat.toString(),
        lng.toString(),
        isEmptyWebsite ?? false,
        isEmptySocialWebsite ?? false,
        radius,
        sortField ?? SortOptions.NAME,
        fields.length ? fields : DEFAULT_FIELDS,
        page
      );
    } else {
      companies = await GoogleService.placeDemoList(
        searchText,
        lat.toString(),
        lng.toString(),
        isEmptyWebsite ?? false,
        isEmptySocialWebsite ?? false,
        radius,
        sortField ?? SortOptions.NAME,
        fields.length ? fields : DEFAULT_FIELDS,
        page
      );
    }

    return companies;
  } catch (error) {
    console.error("Google search failed:", error);
  }
}
