"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        // Si el backend manda errorRequest, puede tener campo y mensaje
        alert(data?.Error || "Error en el registro");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "60px auto",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h2>Registro</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="lastname"
            placeholder="Apellido"
            value={form.lastname}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            name="email"
            placeholder="Correo universitario"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
