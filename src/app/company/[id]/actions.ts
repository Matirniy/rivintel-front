"use server";

import { placeView } from "@/app/api";

export async function fetchCompanyById(id: string) {
  return (await placeView({
    path: { id },
  })).data;
}
