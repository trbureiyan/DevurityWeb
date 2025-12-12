import ReglamentoButton from "./ReglamentoButton";

export default function ReglamentoSection() {
    return (
        <section className="w-full py-20 flex flex-col items-center text-center px-6">
            
            <h2 className="text-3xl md:text-4xl font-orbitron mb-4">
                Consulta nuestros reglamentos
            </h2>

            <p className="text-lg md:text-xl font-ubuntu text-[var(--variable-collection-placeholder)] mb-8 max-w-2xl">
                Accede a la normativa, lineamientos y políticas internas que rigen 
                todas las actividades dentro de Devurity. Mantente informado y actualizado.
            </p>

            <ReglamentoButton />
        </section>
    );
}
