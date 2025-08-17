import { CompanyDataProps } from "@/types/company";
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
        bg-base-100 rounded p-4
        shadow-md
        transition-shadow duration-300
        hover:shadow-lg
        relative
        cursor-pointer
      "
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{displayName.text}</h3>
        <div className="flex items-center gap-1 text-yellow-500">
          <FaStar />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>

      <div className="mt-2 text-sm space-y-1">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt />
          <span>{formattedAddress}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaPhone />
          <span>{internationalPhoneNumber}</span>
          <FaEnvelope className="ml-4" />
          <a
            href={`mailto:${"test@test.com"}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {"test@test.com"}
          </a>
        </div>

        <div className="flex items-center gap-2">
          <FaGlobe />
          {websiteUri ? (
            <a
              href={websiteUri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              {websiteUri.replace(/^https?:\/\//, "")}
            </a>
          ) : (
            <p>-</p>
          )}
        </div>
      </div>

      <div
        className="
          absolute bottom-3 right-6 text-primary
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
