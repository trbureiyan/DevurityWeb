// SGG Componment: CTASection

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	CheckIcon,
	FileIcon,
	SearchIcon,
	UserIcon,
} from "@/components/icons/HeroIcons";
import { IMAGES } from "@/public/images";

type Step = {
	title: string;
	description: string;
	Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const STEPS: Step[] = [
	{
		title: "1. Aplica",
		description: "Rellena el formulario con tu interés y experiencia.",
		Icon: SearchIcon,
	},
	{
		title: "2. Presenta tu idea",
		description: "Trae un proyecto o propón uno; te asignamos mentoría.",
		Icon: UserIcon,
	},
	{
		title: "3. Crea y publica",
		description:
			"Trabajo colaborativo, posibilidad de grado por proyecto y apoyo para publicaciones.",
		Icon: FileIcon,
	},
	{
		title: "4. Participa",
		description: "Involúcrate en actividades y reuniones del semillero.",
		Icon: CheckIcon,
	},
];

export default function CTASection() {
	return (
		<section id="cta" className="relative overflow-hidden py-20 lg:py-24">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-gradient-to-br from-variable-collection-fondo/35 via-variable-collection-fondo/10 to-transparent" />
				<div className="absolute top-0 left-0 right-0 h-[22%] sm:h-[28%] bg-gradient-to-b from-variable-collection-fondo via-variable-collection-fondo/70 to-transparent" />
				<div className="absolute -right-24 top-1/4 hidden h-96 w-96 rounded-full bg-gradient-to-br from-variable-collection-link/35 via-white/18 to-transparent blur-3xl lg:block" />
				<div className="absolute -right-40 top-10 hidden h-[520px] w-[520px] rotate-12 lg:block xl:-right-20">
					<div className="relative h-full w-full">
						<Image
							src={IMAGES.landing.coinCellAbstract}
							alt="Ilustración abstracta de celdas circulares"
							fill
							sizes="(min-width: 1024px) 520px, 0px"
							className="object-contain opacity-60 mix-blend-screen blur-[1px]"
						/>
					</div>
				</div>
			</div>

			<div className="relative container mx-auto px-6 md:px-10">
				<div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] xl:gap-16">
					<div className="space-y-10">
						<div className="space-y-6 text-left">
							<p className="font-orbitron text-xs uppercase tracking-[0.6em] text-variable-collection-link">
								Comunidad Devurity
							</p>
							<h2 className="font-orbitron text-4xl leading-tight text-white sm:text-5xl lg:text-[56px] lg:leading-[1.05]">
								<span className="block">Tu idea dentro</span>
								<span className="block text-white/90">de una red que la potencia</span>
							</h2>
							<p className="max-w-2xl font-ubuntu text-base text-white/80 sm:text-lg">
								Creemos en aprender haciendo, compartir conocimiento y transformar ideas en proyectos con impacto real. Aquí encontrarás mentoría, comunidad y un espacio donde tu curiosidad se convierte en soluciones publicables y con opción de grado.
							</p>
						</div>

						<div className="relative rounded-[28px] border border-white/10 bg-black/70 px-6 py-10 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.8)] sm:px-10 lg:px-12">
							<div className="pointer-events-none absolute left-10 right-10 top-16 hidden h-20 lg:block">
								<div className="relative h-full">
									<div className="absolute top-1/2 h-3 w-full -translate-y-1/2 rounded-full bg-gradient-to-r from-white/10 via-white/15 to-variable-collection-botones/50">
										<span
											className="absolute inset-1 rounded-full opacity-70"
											style={{
												backgroundImage:
													"repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(255,255,255,0.9) 24px, rgba(255,255,255,0.9) 32px)",
											}}
										/>
									</div>
								</div>
							</div>

							<div className="relative z-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
								{STEPS.map(({ title, description, Icon }) => (
									<div key={title} className="flex flex-col items-center text-center">
										<div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/70 shadow-[0_10px_30px_rgba(18,18,18,0.6)]">
											<div className="absolute inset-0 rounded-full bg-gradient-to-b from-variable-collection-botones/25 via-transparent to-transparent" />
											<div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-black/70 backdrop-blur">
											<Icon className="h-7 w-7 text-white" aria-hidden />
											</div>
										</div>
										<h3 className="font-orbitron text-sm uppercase tracking-[0.24em] text-white">
										{title}
										</h3>
										<p className="mt-2 font-ubuntu text-sm text-white/70">
										{description}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					<aside className="flex flex-col justify-between gap-10">
						<div className="rounded-3xl border border-white/10 bg-black/60 p-8 backdrop-blur">
							<div className="mb-6 h-1.5 w-14 rounded-full bg-variable-collection-botones" />
							<p className="font-ubuntu text-base text-white/80 sm:text-lg">
								Unirte a nuestro semillero es sumarte a un ecosistema que combina desarrollo tecnológico (Dev) y ciberseguridad (Urity) como pilares principales, con proyección a congresos, publicaciones e impacto real.
							</p>
						</div>

						<Link
							href="/auth/register"
							className="inline-flex items-center justify-center rounded-full bg-variable-collection-botones px-10 py-4 text-center font-ubuntu text-base font-semibold uppercase tracking-[0.3em] text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_45px_-15px_rgba(202,43,38,0.9)] active:scale-[0.98]"
						>
							Regístrate y únete a Devurity
						</Link>
					</aside>
				</div>
			</div>
		</section>
	);
}
