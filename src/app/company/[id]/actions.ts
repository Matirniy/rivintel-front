"use server";

import { GoogleService } from "@/app/api";

export async function fetchCompanyById(id: string) {
  return await GoogleService.placeView(id);
}
