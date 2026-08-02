// Declaración de tipos para el Web Component <altcha-widget>
// El widget se carga desde CDN vía useEffect — no requiere el paquete 'altcha' en el bundle
import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * Widget ALTCHA para verificación anti-bot basada en proof-of-work.
       *
       * Se carga dinámicamente desde cdn.jsdelivr.net (v2.3.0).
       * Los eventos se registran vía `addEventListener`, no como props JSX:
       *
       * - `"verified"` → `CustomEvent<{ payload: string }>`
       *   Se dispara cuando el usuario completa el challenge exitosamente.
       *   `detail.payload` contiene el string base64 para enviar al servidor.
       *
       * - `"statechange"` → `CustomEvent<{ state: string }>`
       *   Se dispara en cambios de estado del widget.
       *   `detail.state` puede ser: `"created"`, `"verifying"`, `"verified"`,
       *   `"expired"`, `"error"`, `"unverified"`.
       */
      "altcha-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          /** URL del endpoint que genera el challenge (GET). */
          challengeurl?: string;
          /** Oculta el logo ALTCHA en la esquina. */
          hidelogo?: boolean;
          /** Oculta el footer con el enlace a ALTCHA. */
          hidefooter?: boolean;
          /** Nombre del campo oculto que contiene el payload al enviar el form. */
          name?: string;
          /** Modo de auto-verificación: `"onfocus"`, `"onload"`, o `"onsubmit"`. */
          auto?: "onfocus" | "onload" | "onsubmit";
        },
        HTMLElement
      >;
    }
  }
}
