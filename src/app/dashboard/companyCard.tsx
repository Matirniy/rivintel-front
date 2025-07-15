import { FaStar, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe } from "react-icons/fa";
import Link from "next/link";
import { CompanyCardProps } from "@/types/company";


export default function CompanyCard({
  name,
  rating,
  address,
  phone,
  email,
  website,
}: CompanyCardProps) {
  return (
    <div className="bg-base-100 shadow-md rounded p-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center gap-1 text-yellow-500">
          <FaStar />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>

      <div className="mt-2 text-sm space-y-1">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt />
          <span>{address}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaPhone />
          <span>{phone}</span>
          <FaEnvelope className="ml-4" />
          <span>{email}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaGlobe />
          <Link
            href={website}
            target="_blank"
            className="text-primary underline"
          >
            {website.replace(/^https?:\/\//, "")}
          </Link>
        </div>
      </div>
    </div>
  );
}
