import type { SVGProps } from "react";
import {
	CheckIcon as HeroiconsCheckIcon,
	DocumentIcon as HeroiconsDocumentIcon,
	MagnifyingGlassIcon,
	UserIcon as HeroiconsUserIcon,
} from "@heroicons/react/24/outline";

// Wrapping the Heroicons components keeps the existing API based on SVGProps.
export function SearchIcon(props: SVGProps<SVGSVGElement>) {
	return <MagnifyingGlassIcon {...props} />;
}

export function UserIcon(props: SVGProps<SVGSVGElement>) {
	return <HeroiconsUserIcon {...props} />;
}

export function FileIcon(props: SVGProps<SVGSVGElement>) {
	return <HeroiconsDocumentIcon {...props} />;
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
	return <HeroiconsCheckIcon {...props} />;
}

