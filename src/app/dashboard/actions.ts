"use server";

import { GoogleService } from "@/api";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { PlaceFields, SortOptions } from "@/types/google";

interface TriggerParams {
  searchText: string;
  lat: number;
  lng: number;
  sortField: SortOptions | null;
  filterConditions: {
    field: PlaceFields;
    value: boolean;
  }[];
}

export async function triggerGoogleSearch({
  searchText,
  lat,
  lng,
  sortField,
  filterConditions,
}: TriggerParams) {
  const isEmptyWebsite =
    filterConditions.find((c) => c.field === PlaceFields.WEBSITE_URI)?.value ??
    undefined;
  const isEmptySocialWebsite = true;
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // filterConditions.find((c) => c.field === PlaceFields.SOCIAL_WEBSITE)
  //   ?.value ?? undefined;

  const fields = filterConditions
    .map((c) => c.field)
    .filter((f) => f !== PlaceFields.UNSELECTED) as any[];

  try {
    const companies = await GoogleService.googleControllerList(
      searchText,
      lat.toString(),
      lng.toString(),
      isEmptyWebsite,
      isEmptySocialWebsite,
      1,
      sortField ?? undefined,
      fields.length ? fields : undefined
    );

    return companies;
    // revalidatePath("/dashboard");
    // redirect("/dashboard");
  } catch (error) {
    console.error("Google search failed:", error);
  }
}
