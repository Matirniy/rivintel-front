import fs from "fs";
import path from "path";

// ---------- 1. sdk.gen.ts ----------
const sdkGenPath = path.resolve("src/app/api/gen/sdk.gen.ts");

if (fs.existsSync(sdkGenPath)) {
  let sdkContent = fs.readFileSync(sdkGenPath, "utf8");
  const newSdkContent = sdkContent.replace(/\bblob\b/g, "arraybuffer");

  if (newSdkContent !== sdkContent) {
    fs.writeFileSync(sdkGenPath, newSdkContent);
    console.log("✔ Replaced 'blob' with 'arraybuffer' in sdk.gen.ts");
  } else {
    console.log("✔ No 'blob' found in sdk.gen.ts");
  }
} else {
  console.log("⚠ sdk.gen.ts not found, skipping");
}
