"use client";
import Link from "next/link";

export default function ReglamentoButton() {
    return (
        <Link
            href="/help/reglamentos"
            className="
                px-8 py-4
                rounded-full
                font-ubuntu
                text-white
                bg-[var(--variable-collection-botones)]
                hover:bg-[var(--variable-collection-link)]
                transition-all
                duration-300
                shadow-md
                hover:shadow-lg
                text-lg
            "
        >
            Ver reglamentos →
        </Link>
    );
}
