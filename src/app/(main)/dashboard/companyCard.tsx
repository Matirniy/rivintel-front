import { CompanyDataProps } from "@/types/company.type";
import {
  FaStar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";

export default function CompanyCard({
  displayName,
  rating,
  formattedAddress,
  internationalPhoneNumber,
  websiteUri,
}: CompanyDataProps) {
  return (
    <div
      className="
        group
        bg-base-100 border border-base-300 rounded-box p-3 sm:p-4
        shadow-sm
        transition-shadow duration-300
        hover:shadow-md
        relative
        cursor-pointer
      "
    >
      <div className="flex justify-between items-start gap-2 pr-6">
        <h3 className="text-base sm:text-lg font-semibold break-words">
          {displayName.text}
        </h3>
        <div className="flex shrink-0 items-center gap-1 text-warning">
          <FaStar />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>

      <div className="mt-2 text-sm space-y-1.5">
        <div className="flex items-start gap-2">
          <FaMapMarkerAlt className="mt-0.5 shrink-0 opacity-70" />
          <span className="break-words">{formattedAddress}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <div className="flex items-center gap-2">
            <FaPhone className="shrink-0 opacity-70" />
            <span>{internationalPhoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="shrink-0 opacity-70" />
            <a
              href={`mailto:${"test@test.com"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all"
            >
              {"test@test.com"}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FaGlobe className="shrink-0 opacity-70" />
          {websiteUri ? (
            <a
              href={websiteUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              link
            </a>
          ) : (
            <p>-</p>
          )}
        </div>
      </div>

      <div
        className="
          absolute bottom-3 right-3 sm:right-6 text-primary
          transition-transform duration-300
          pointer-events-none
          group-hover:translate-x-2
        "
      >
        <FaArrowRight />
      </div>
    </div>
  );
}
