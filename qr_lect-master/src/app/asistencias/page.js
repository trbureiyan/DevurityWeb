"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../routes/ProtectedRoute";

export default function AsistenciasPage() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  
  // Obtener fecha de hoy en formato YYYY-MM-DD
  const getFechaHoy = () => {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  };

  const getFechaHoyMasUnDia = () => {
    const hoy = new Date();
    const mañana = new Date(hoy);
    mañana.setDate(hoy.getDate() + 1);
    return mañana.toISOString().split('T')[0];
  };

  const [filters, setFilters] = useState({
    nombre: "",
    correo: "",
    fechaInicio: getFechaHoy(), // Filtro por defecto: fecha de hoy
    fechaFin: getFechaHoyMasUnDia() // Filtro por defecto: fecha de hoy
  });

  useEffect(() => {
    setLoading(true);
    fetch("/api/asistencia")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar asistencias");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let resultado = [...data];

    if (filters.nombre) {
      resultado = resultado.filter(item =>
        item.usuario.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
      );
    }

    if (filters.correo) {
      resultado = resultado.filter(item =>
        item.usuario.correo.toLowerCase().includes(filters.correo.toLowerCase())
      );
    }

    if (filters.fechaInicio) {
      const fechaInicio = new Date(filters.fechaInicio);
      resultado = resultado.filter(item => {
        const fechaItem = new Date(item.fecha);
        return fechaItem >= fechaInicio;
      });
    }

    if (filters.fechaFin) {
      const fechaFin = new Date(filters.fechaFin);
      fechaFin.setHours(23, 59, 59, 999);
      resultado = resultado.filter(item => {
        const fechaItem = new Date(item.fecha);
        return fechaItem <= fechaFin;
      });
    }

    setFilteredData(resultado);
  }, [filters, data]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const limpiarFiltros = () => {
    setFilters({
      nombre: "",
      correo: "",
      fechaInicio: "",
      fechaFin: ""
    });
  };

  const cerrarSesion = () => {
    document.cookie = 'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/login');
  };

  const descargarPDF = () => {
    const contenido = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Reporte de Asistencias</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #334155; text-align: center; }
          .info { text-align: center; color: #64748b; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #334155; color: white; padding: 12px; text-align: left; }
          td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
          tr:nth-child(even) { background-color: #f8fafc; }
          .footer { margin-top: 30px; text-align: center; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>Reporte de Asistencias</h1>
        <div class="info">
          <p>Semillero Devurity - Universidad Surcolombiana</p>
          <p>Generado el: ${new Date().toLocaleString('es-CO')}</p>
          <p>Total de registros: ${filteredData.length}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            ${filteredData.map(item => `
              <tr>
                <td>${item.id}</td>
                <td>${item.usuario.nombre}</td>
                <td>${item.usuario.correo}</td>
                <td>${new Date(item.fecha).toLocaleString('es-CO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="footer">
          <p>Este documento fue generado automaticamente por el sistema de asistencias</p>
        </div>
      </body>
      </html>
    `;

    // Crear una ventana nueva para imprimir como PDF
    const ventana = window.open('', '_blank');
    ventana.document.write(contenido);
    ventana.document.close();
    
    // Esperar a que se cargue y abrir el diálogo de impresión
    ventana.onload = () => {
      ventana.print();
    };
  };

  return (
    <ProtectedRoute requiredRole="ADMIN">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-4 sm:px-8 py-4 sm:py-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-white">
                    Lista de Asistencias
                  </h1>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 sm:mt-2">
                    Registro completo de asistencias del Semillero
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => router.push('/perfil')}
                    className="bg-slate-600 text-white px-3 py-2 text-sm rounded-md font-medium hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 transition-all flex items-center"
                  >
                    <svg className="w-4 h-4 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden sm:inline">Perfil</span>
                  </button>
                  <button
                    onClick={descargarPDF}
                    disabled={filteredData.length === 0}
                    className="bg-white text-slate-700 px-3 py-2 text-sm rounded-md font-medium hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <svg className="w-4 h-4 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="hidden sm:inline">Descargar PDF</span>
                  </button>
                  <button
                    onClick={cerrarSesion}
                    className="bg-red-600 text-white px-3 py-2 text-sm rounded-md font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800 transition-all flex items-center"
                  >
                    <svg className="w-4 h-4 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden sm:inline">Cerrar Sesion</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-8 py-4 sm:py-6">
              {/* Botón hamburguesa para mostrar/ocultar filtros */}
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="mb-4 flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-slate-700 font-medium"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {mostrarFiltros ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
                {mostrarFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros'}
              </button>

              {/* Panel de filtros desplegable */}
              {mostrarFiltros && (
                <div className="bg-slate-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base sm:text-lg font-semibold text-slate-700 flex items-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Filtros
                    </h2>
                    <button
                      onClick={limpiarFiltros}
                      className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
                    >
                      Limpiar
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={filters.nombre}
                        onChange={handleFilterChange}
                        placeholder="Buscar..."
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                        Correo
                      </label>
                      <input
                        type="text"
                        name="correo"
                        value={filters.correo}
                        onChange={handleFilterChange}
                        placeholder="Buscar..."
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                        Fecha desde
                      </label>
                      <input
                        type="date"
                        name="fechaInicio"
                        value={filters.fechaInicio}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-2">
                        Fecha hasta
                      </label>
                      <input
                        type="date"
                        name="fechaFin"
                        value={filters.fechaFin}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div> 
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 sm:mb-6">
                  <div className="flex">
                    <svg className="h-5 w-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="ml-3 text-xs sm:text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-700"></div>
                  <p className="text-slate-600 mt-4 text-sm">Cargando asistencias...</p>
                </div>
              ) : filteredData.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-slate-600 mt-4 font-medium text-sm sm:text-base">No se encontraron registros</p>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">Intenta ajustar los filtros de busqueda</p>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b-2 border-slate-200">
                          <th className="text-left py-3 px-2 sm:py-4 sm:px-4 text-xs sm:text-sm font-semibold text-slate-700">ID</th>
                          <th className="text-left py-3 px-2 sm:py-4 sm:px-4 text-xs sm:text-sm font-semibold text-slate-700">Nombre</th>
                          <th className="text-left py-3 px-2 sm:py-4 sm:px-4 text-xs sm:text-sm font-semibold text-slate-700 hidden sm:table-cell">Correo</th>
                          <th className="text-left py-3 px-2 sm:py-4 sm:px-4 text-xs sm:text-sm font-semibold text-slate-700">Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item, index) => (
                          <tr 
                            key={item.id} 
                            className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                              index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                            }`}
                          >
                            <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm text-slate-600 font-medium">#{item.id}</td>
                            <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm text-slate-900 font-medium">{item.usuario.nombre}</td>
                            <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm text-slate-600 hidden sm:table-cell">{item.usuario.correo}</td>
                            <td className="py-2 px-2 sm:py-3 sm:px-4 text-xs sm:text-sm text-slate-600">
                              <span className="hidden lg:inline">
                                {new Date(item.fecha).toLocaleString('es-CO', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                              <span className="lg:hidden">
                                {new Date(item.fecha).toLocaleString('es-CO', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-50 px-4 sm:px-8 py-3 sm:py-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <p className="text-xs text-slate-500">
                  Semillero Devurity - USCO
                </p>
                <p className="text-xs text-slate-600 font-medium">
                  {filteredData.length} de {data.length} registros
                </p>
              </div>
            </div>
          </div>

          {/* Botones flotantes */}
          <div className="fixed bottom-4 right-4 flex flex-col gap-3">
            <a
              href="/admin"
              className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-3 sm:p-4 rounded-full shadow-lg hover:from-slate-800 hover:to-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-500 focus:ring-offset-2 transition-all transform hover:scale-110 group"
            >
              <svg 
                className="w-5 h-5 sm:w-6 sm:h-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" 
                />
              </svg>
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-slate-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block">
                Escanear QR
              </span>
            </a>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}