"use client";

import { useState, FormEvent } from "react";

// Segmento form de contacto

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <section id="contacto" className="container mx-auto px-6 md:px-10 py-20">
      <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mb-12 text-center">
        Contáctanos
      </h2>
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block font-ubuntu text-white mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-variable-collection-placeholder text-white font-ubuntu px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-variable-collection-links"
              placeholder="Tu nombre completo"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-ubuntu text-white mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-variable-collection-placeholder text-white font-ubuntu px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-variable-collection-links"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-ubuntu text-white mb-2">
              Mensaje
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-variable-collection-placeholder text-white font-ubuntu px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-variable-collection-links resize-none"
              placeholder="¿En qué podemos ayudarte?"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-variable-collection-botones text-white font-ubuntu font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </section>
  );
}
