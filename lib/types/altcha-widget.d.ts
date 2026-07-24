// Declaración de tipos para el Web Component <altcha-widget>
// El widget se carga desde CDN vía useEffect — no requiere el paquete 'altcha' en el bundle
import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "altcha-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          challengeurl?: string;
          hidelogo?: boolean;
          hidefooter?: boolean;
          name?: string;
          auto?: "onfocus" | "onload" | "onsubmit";
          onVerify?: (e: CustomEvent<{ payload: string }>) => void;
          onError?: (e: CustomEvent<{ error: unknown }>) => void;
        },
        HTMLElement
      >;
    }
  }
}
