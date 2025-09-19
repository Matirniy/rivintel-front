"use server";

import {
  GoogleAnswerType,
  PlacesFields,
  SortOptions,
} from "@/types/google.types";
import DEFAULT_FIELDS from "./constant";
import { downloadExcel, placeDemoList, placeList } from "../api/gen";
import {
  TriggerGoogleParams,
  TriggerAnalyzeParams,
} from "@/types/dashboard.types";

export async function triggerGoogleSearch({
  searchText,
  lat,
  lng,
  radius,
  sortField,
  filterConditions,
  isSubscribed,
  page,
}: TriggerGoogleParams) {
  const isEmptyWebsite =
    filterConditions.find((c) => c.field === PlacesFields.WEBSITE_URI)?.value ??
    undefined;
  const isEmptySocialWebsite = true;

  const fields = filterConditions
    .map((c) => c.field)
    .filter((f) => f !== PlacesFields.UNSELECTED) as any[];

  try {
    let companies: GoogleAnswerType;

    const query = {
      searchText,
      lat: lat.toString(),
      lng: lng.toString(),
      radius,
      isEmptyWebsite,
      isEmptySocialWebsite,
      sort: sortField ?? SortOptions.NAME,
      fields: fields.length ? fields : DEFAULT_FIELDS,
      page,
      limit: 20,
    };

    if (isSubscribed) {
      companies = (await placeList({ query })).data as GoogleAnswerType;
    } else {
      companies = (await placeDemoList({ query })).data as GoogleAnswerType;
    }

    return companies;
  } catch (error) {
    console.error("Google search failed:", error);
    return null;
  }
}

export async function triggerAnalytic({
  searchText,
  lat,
  lng,
  radius,
}: TriggerAnalyzeParams) {
  try {
    const query = {
      searchText,
      lat: lat.toString(),
      lng: lng.toString(),
      radius,
    };
    // return await placeAnalyze({ query });
  } catch (error) {
    console.error("Analytics error:", error);
    return null;
  }
}

export async function triggerExcel({
  searchText,
  lat,
  lng,
  radius,
}: TriggerAnalyzeParams) {
  try {
    const query = {
      searchText,
      lat: lat.toString(),
      lng: lng.toString(),
      radius,
    };

    const { data } = await downloadExcel({ query });

    const blob = new Blob([data as File], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    return blob;
  } catch (error) {
    console.error("Excel error:", error);

    return null;
  }
}
