"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

// Props de galeria
type GalleryPreviewSectionProps = {
	images: string[];
};

export default function GalleryPreviewSection({ images }: GalleryPreviewSectionProps) {
	// Estado para el índice actual del carrusel
	const [currentIndex, setCurrentIndex] = useState(0);
	// Control de autoplay
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);

	// Seleccion de imagenes
	const previewImages = useMemo(() => images.slice(0, 8), [images]);

	// Efecto para el autoplay del carrusel
	useEffect(() => {
		if (!isAutoPlaying) return;

		// Cambio a 4s
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % Math.max(previewImages.length, 1));
		}, 4000);

		// Cleanup del intervalo
		return () => clearInterval(interval);
	}, [isAutoPlaying, previewImages.length]);

	// Redireccion de imagen
	const goToSlide = (index: number) => {
		setCurrentIndex(index % Math.max(previewImages.length, 1));
		// Pausar autoplay cuando el usuario interactúa
		setIsAutoPlaying(false);
	};

	// Avanzar
	const nextSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % Math.max(previewImages.length, 1));
		setIsAutoPlaying(false);
	};

	// Retroceder
	const prevSlide = () => {
		setCurrentIndex((prev) => (prev - 1 + Math.max(previewImages.length, 1)) % Math.max(previewImages.length, 1));
		setIsAutoPlaying(false);
	};

	return (
		<section className="relative py-20 lg:py-24 overflow-hidden">
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-variable-collection-fondo/50 to-variable-collection-fondo" />

			<div className="relative container mx-auto px-6 md:px-10">
				<div className="space-y-8">
					{/* Header */}
					<div className="text-center space-y-4">
                        <p className="font-orbitron text-s font-bold uppercase tracking-[0.8em] text-variable-collection-link">
                            Galería
                        </p>
						<h2 className="font-orbitron text-4xl leading-tight text-white sm:text-5xl lg:text-[56px]">
							<span className="block">Momentos que nos</span>
							<span className="block text-white/90">definen</span>
						</h2>
						<p className="max-w-2xl mx-auto font-ubuntu text-base text-white/80 sm:text-lg">
							Explora los eventos, talleres y proyectos que hacen parte de nuestra comunidad.
						</p>
					</div>

					{/* Carrusel */}
					<div className="relative max-w-5xl mx-auto">
						<div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur">
							{/* Imagen principal */}
							<div className="relative w-full h-full">
								{previewImages.map((image, index) => (
									<div
										key={image}
										className={`absolute inset-0 transition-opacity duration-700 ${
											index === currentIndex ? "opacity-100" : "opacity-0"
										}`}
									>
										<Image
											src={image}
											alt={`Galería imagen ${index + 1}`}
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
											className="object-cover"
											priority={index === 0}
										/>
									</div>
								))}

								{/* Overlay gradient */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
							</div>

							{/* Controles de navegación */}
							<button
								onClick={prevSlide}
								className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all hover:scale-110"
								aria-label="Imagen anterior"
							>
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>

							<button
								onClick={nextSlide}
								className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all hover:scale-110"
								aria-label="Imagen siguiente"
							>
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>

							{/* Indicadores */}
							<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
								{previewImages.map((_, index) => (
									<button
										key={index}
										onClick={() => goToSlide(index)}
										className={`h-2 rounded-full transition-all ${
											index === currentIndex
												? "w-8 bg-variable-collection-link"
												: "w-2 bg-white/40 hover:bg-white/60"
										}`}
										aria-label={`Ir a imagen ${index + 1}`}
									/>
								))}
							</div>
						</div>

						{/* Thumbnails collage - Desktop only */}
						<div className="hidden lg:grid grid-cols-4 gap-3 mt-4">
							{previewImages.slice(0, 4).map((image, index) => (
								<button
									key={image}
									onClick={() => goToSlide(index)}
									className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
										index === currentIndex
											? "border-variable-collection-link scale-105"
											: "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
									}`}
								>
									<Image
										src={image}
										alt={`Thumbnail ${index + 1}`}
										fill
										sizes="(max-width: 1024px) 0vw, 300px"
										className="object-cover"
									/>
								</button>
							))}
						</div>
					</div>

					{/* CTA Button */}
					<div className="text-center pt-4">
						<Link
							href="/gallery"
							className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 font-ubuntu text-sm text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
						>
							Ver galería completa
							<svg
								className="h-4 w-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
