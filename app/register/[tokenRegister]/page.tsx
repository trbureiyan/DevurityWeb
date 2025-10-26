"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

export default function RegisterValidate() {
  const { tokenRegister } = useParams();
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  const skillOptions = ["JavaScript", "Java", "Rust", "C"];

  const [form, setForm] = useState({
    semester: "",
    motivation: "",
    skills: [] as string[],
    password: "",
  });

  // dropdown state
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(`/auth/register/${tokenRegister}`);
        const data = await res.json();

        if (!res.ok) {
          alert(data?.Error || "El enlace no es válido o ha expirado.");
          setTokenValid(false);
        } else {
          setTokenValid(true);
        }
      } catch {
        alert("Error al verificar el enlace");
        setTokenValid(false);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [tokenRegister]);

  // cerrar dropdown al click fuera
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Añadir skill (si no existe)
  const addSkill = (skill: string) => {
    setForm((prev) => {
      if (prev.skills.includes(skill)) return prev;
      return { ...prev, skills: [...prev.skills, skill] };
    });
  };

  // Quitar skill
  const removeSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/auth/register/${tokenRegister}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          semester: Number(form.semester),
          motivation: form.motivation,
          skills: form.skills,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.Error || "Error en el registro");
        return;
      }

      alert(data.message);
    } catch {
      alert("Error al conectar con el servidor");
    }
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>Verificando enlace...</p>;
  if (!tokenValid)
    return (
      <p style={{ color: "red", textAlign: "center" }}>
        El enlace no es válido o ha expirado.
      </p>
    );

  return (
    <div
      style={{
        maxWidth: "520px",
        margin: "40px auto",
        border: "1px solid var(--selected)",
        padding: "18px",
        borderRadius: "10px",
        textAlign: "left",
        fontFamily: "system-ui, sans-serif",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Completa tu registro</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            name="semester"
            placeholder="Semestre"
            value={form.semester}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
              border: "1px solid var(--selected)",
              background: "var(--placeholder)",
              color: "var(--foreground)",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            name="motivation"
            placeholder="Motivación para ingresar"
            value={form.motivation}
            onChange={handleChange}
            rows={3}
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
              border: "1px solid var(--selected)",
              background: "var(--placeholder)",
              color: "var(--foreground)",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* ======= Skills: dropdown + chips ======= */}
        <div style={{ marginBottom: "12px" }}>
          <label
            style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}
          >
            Habilidades
          </label>

          <div
            ref={dropdownRef}
            style={{
              border: "1px solid var(--selected)",
              borderRadius: 6,
              padding: 8,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
              position: "relative",
              background: "var(--background)",
              color: "var(--foreground)",
            }}
            // clicking inside shouldn't close (we handle document click separately)
            onClick={() => setOpen(true)}
          >
            {/* Chips */}
            {form.skills.length === 0 && (
              <span
                style={{
                  color: "var(--foreground)",
                  opacity: 0.7,
                  fontSize: 14,
                }}
              >
                Selecciona tus habilidades...
              </span>
            )}

            {form.skills.map((s) => (
              <span
                key={s}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 8px",
                  borderRadius: 999,
                  background: "var(--placeholder)",
                  fontSize: 13,
                  color: "var(--foreground)",
                }}
              >
                <span>{s}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSkill(s);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                  aria-label={`Quitar ${s}`}
                >
                  ×
                </button>
              </span>
            ))}

            {/* botón + para abrir dropdown */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => !v);
              }}
              style={{
                marginLeft: "auto",
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid var(--selected)",
                background: "var(--placeholder)",
                cursor: "pointer",
                color: "var(--foreground)",
              }}
              aria-expanded={open}
            >
              +
            </button>

            {/* Dropdown */}
            {open && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 8,
                  right: 8,
                  border: "1px solid var(--selected)",
                  borderRadius: 6,
                  background: "var(--placeholder)",
                  zIndex: 50,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
                  color: "var(--foreground)",
                }}
              >
                {skillOptions.map((opt) => {
                  const disabled = form.skills.includes(opt);
                  return (
                    <div
                      key={opt}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!disabled) addSkill(opt);
                      }}
                      style={{
                        padding: "8px 10px",
                        cursor: disabled ? "not-allowed" : "pointer",
                        opacity: disabled ? 0.5 : 1,
                        borderBottom: "1px solid var(--selected)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{opt}</span>
                      {disabled && <small style={{ fontSize: 12 }}>✓</small>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
              border: "1px solid var(--selected)",
              background: "var(--placeholder)",
              color: "var(--foreground)",
              borderRadius: "4px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Finalizar registro
        </button>
      </form>
    </div>
  );
}
