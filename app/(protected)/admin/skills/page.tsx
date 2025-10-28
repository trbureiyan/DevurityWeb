"use client";

import React, { useState, useEffect } from "react";
import { useCsrf } from "@/hooks/useCsrf";

interface Skill {
  id: number;
  name: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { fetchWithCsrf, loading: csrfLoading } = useCsrf();

  // Cargar habilidades desde la API
  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/skills");
      const result = await response.json();

      if (result.success) {
        setSkills(result.data);
      } else {
        setError(result.error || "Error al cargar las habilidades");
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      setError("Error de conexión al cargar las habilidades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!csrfLoading) {
      fetchSkills();
    }
  }, [csrfLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("El nombre de la habilidad es requerido");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      if (editingSkill) {
        // Editar habilidad existente
        const response = await fetchWithCsrf(`/api/skills/${editingSkill.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: formData.name.trim() }),
        });

        const result = await response.json();

        if (result.success) {
          setSkills((prev) =>
            prev.map((skill) =>
              skill.id === editingSkill.id ? result.data : skill,
            ),
          );
          setEditingSkill(null);
          setShowAddForm(false);
          resetForm();
        } else {
          setError(result.error || "Error al actualizar la habilidad");
        }
      } else {
        // Crear nueva habilidad
        const response = await fetchWithCsrf("/api/skills", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: formData.name.trim() }),
        });

        const result = await response.json();

        if (result.success) {
          setSkills((prev) => [...prev, result.data]);
          setShowAddForm(false);
          resetForm();
        } else {
          setError(result.error || "Error al crear la habilidad");
        }
      }
    } catch (error) {
      console.error("Error submitting skill:", error);
      setError("Error de conexión al guardar la habilidad");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({ name: skill.name });
    setShowAddForm(true);
    setError(null);
  };

  const handleDelete = async (skill: Skill) => {
    if (
      !confirm(
        `¿Estás seguro de que deseas eliminar la habilidad "${skill.name}"?`,
      )
    ) {
      return;
    }

    try {
      const response = await fetchWithCsrf(`/api/skills/${skill.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setSkills((prev) => prev.filter((s) => s.id !== skill.id));
      } else {
        setError(result.error || "Error al eliminar la habilidad");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      setError("Error de conexión al eliminar la habilidad");
    }
  };

  const resetForm = () => {
    setFormData({ name: "" });
    setEditingSkill(null);
    setError(null);
  };

  const cancelForm = () => {
    setShowAddForm(false);
    resetForm();
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">
          Gestión de Habilidades
        </h1>
        <p className="text-gray-400">
          Administra las habilidades disponibles en la plataforma
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Add Skill Button */}
      {!showAddForm && (
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full sm:w-auto px-4 py-2 lg:px-6 lg:py-3 bg-buttons text-white rounded-lg hover:bg-buttons/80 transition-colors font-medium text-sm lg:text-base"
          >
            + Nueva Habilidad
          </button>
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="mb-8 bg-[#1A1515] border border-[#2E2E2E] rounded-lg p-4 lg:p-6">
          <h3 className="text-white font-semibold text-base lg:text-lg mb-4">
            {editingSkill ? "Editar Habilidad" : "Nueva Habilidad"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-white text-sm font-medium mb-2"
              >
                Nombre de la Habilidad *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: React, Node.js, PostgreSQL..."
                className="w-full px-4 py-2 bg-[#0A0808] border border-[#2E2E2E] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-link text-sm lg:text-base"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-buttons text-white rounded-lg hover:bg-buttons/80 transition-colors font-medium disabled:opacity-50"
              >
                {submitting
                  ? "Guardando..."
                  : editingSkill
                    ? "Actualizar"
                    : "Crear"}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="px-6 py-2 bg-transparent border border-[#2E2E2E] text-white rounded-lg hover:bg-[#2E2E2E] transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills List */}
      <div className="bg-[#1A1515] border border-[#2E2E2E] rounded-lg">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-white">Cargando habilidades...</p>
          </div>
        ) : skills.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-white text-lg mb-4">
              No hay habilidades registradas
            </p>
            <p className="text-gray-400">
              Comienza agregando la primera habilidad
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#2E2E2E]">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-6 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-white font-semibold text-lg">
                    {skill.name}
                  </h4>
                </div>
                <div className="flex gap-1 lg:gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="px-2 py-1 lg:px-3 lg:py-1 bg-blue-600 text-white rounded text-xs lg:text-sm hover:bg-blue-700 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(skill)}
                    className="px-2 py-1 lg:px-3 lg:py-1 bg-red-600 text-white rounded text-xs lg:text-sm hover:bg-red-700 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
