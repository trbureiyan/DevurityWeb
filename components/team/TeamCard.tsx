import Image from "next/image";
import { TeamMember } from "@/lib/types/team";

type Props = {
  member: TeamMember;
};

export default function TeamCard({ member }: Props) {
  return (
    <div className="bg-zinc-900/50 rounded-3xl p-6 text-center hover:bg-zinc-800/50 transition-all">
      <div
        className={`w-40 h-40 mx-auto mb-4 rounded-3xl overflow-hidden relative ${member.imageBgClass ?? ""}`}
      >
        <Image
          src={member.imageSrc}
          alt={member.imageAlt}
          fill
          className="object-cover"
          sizes="160px"
        />
      </div>

      <h3 className="text-xl font-bold mb-2">{member.name}</h3>
      <p className="text-sm font-semibold text-gray-400 mb-2">
        {member.role}
      </p>

      {member.tagline && (
        <p className="text-xs text-gray-500 mb-3">{member.tagline}</p>
      )}

      {member.description && (
        <p className="text-sm text-gray-400 mb-4">
          {member.description}
        </p>
      )}

      {member.linkHref && member.linkLabel && (
        <a
          href={member.linkHref}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-xs">{member.linkLabel}</span>
        </a>
      )}
    </div>
  );
}
