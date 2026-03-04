"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

// ─── Inline SVG Icons ────────────────────────────────────────────────────────
const SearchIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
)
const SlidersIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
    </svg>
)
const UsersIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
)
const TrashIcon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
)

// ─── Types ────────────────────────────────────────────────────────────────────
type User = {
    id: string
    name: string
    last_name: string
    email: string
    username: string | null
    roles: { id: string; name: string }
    programs: { id: string; name: string } | null
    is_active: boolean
    joined_at: string | null
}

type PaginatedResponse = {
    users: User[]
    total: number
    page: number
    limit: number
    totalPages: number
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AdminUsersClientPage() {
    const router = useRouter()
    const [data, setData] = useState<PaginatedResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [roleFilter, setRoleFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)

    useEffect(() => {
        fetch('/api/auth/is-admin')
            .then(res => res.json())
            .then(data => { if (data.userId) setCurrentUserId(data.userId) })
            .catch(console.error)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
            setCurrentPage(1)
        }, 500)
        return () => clearTimeout(timer)
    }, [search])

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true)
            const query = new URLSearchParams({ page: currentPage.toString(), limit: "10" })
            if (debouncedSearch) query.set("search", debouncedSearch)
            if (roleFilter) query.set("role", roleFilter)
            if (statusFilter) query.set("status", statusFilter)

            const res = await fetch(`/api/admin/users?${query.toString()}`)
            if (!res.ok) {
                if (res.status === 403) router.push('/access-denied')
                throw new Error("Error cargando usuarios")
            }
            const json = await res.json()
            setData(json)
            setError(null)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [currentPage, debouncedSearch, roleFilter, statusFilter, router])

    useEffect(() => { fetchUsers() }, [fetchUsers])

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            const res = await fetch(`/api/admin/users/${userId}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            })
            if (!res.ok) throw new Error("No se pudo actualizar el rol")
            setData(prev => prev ? {
                ...prev,
                users: prev.users.map(u => u.id === userId ? { ...u, roles: { ...u.roles, name: newRole } } : u)
            } : null)
        } catch (err: any) { alert(err.message) }
    }

    const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
        if (userId === currentUserId) return
        try {
            const res = await fetch(`/api/admin/users/${userId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_active: !currentStatus })
            })
            if (!res.ok) throw new Error("No se pudo actualizar el estado")
            setData(prev => prev ? {
                ...prev,
                users: prev.users.map(u => u.id === userId ? { ...u, is_active: !currentStatus } : u)
            } : null)
        } catch (err: any) { alert(err.message) }
    }

    const handleDelete = async (userId: string) => {
        if (userId === currentUserId) { alert("No puedes eliminar tu propia cuenta."); return }
        if (!window.confirm("¿Estás seguro de que deseas eliminar permanentemente a este usuario? Esta acción no se puede deshacer.")) return
        try {
            const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
            if (!res.ok) throw new Error("Error al eliminar el usuario")
            fetchUsers()
        } catch (err: any) { alert(err.message) }
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

                .au-wrap { font-family: 'DM Sans', sans-serif; }

                .au-filter-bar {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px;
                    padding: 14px 18px;
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    margin-bottom: 14px;
                    flex-wrap: wrap;
                }

                .au-search-wrap { position: relative; flex: 1; min-width: 200px; }
                .au-search-icon {
                    position: absolute; left: 13px; top: 50%;
                    transform: translateY(-50%);
                    color: rgba(255,255,255,0.25); pointer-events: none;
                }

                .au-input {
                    width: 100%;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px;
                    padding: 9px 13px 9px 40px;
                    color: rgba(255,255,255,0.85);
                    font-size: 13px;
                    font-family: 'DM Sans', sans-serif;
                    outline: none;
                    transition: all 0.2s;
                }
                .au-input::placeholder { color: rgba(255,255,255,0.22); }
                .au-input:focus {
                    border-color: rgba(220,38,38,0.5);
                    background: rgba(255,255,255,0.07);
                    box-shadow: 0 0 0 3px rgba(220,38,38,0.08);
                }

                .au-select {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px;
                    padding: 9px 13px;
                    color: rgba(255,255,255,0.55);
                    font-size: 13px;
                    font-family: 'DM Sans', sans-serif;
                    outline: none;
                    cursor: pointer;
                    transition: all 0.2s;
                    min-width: 140px;
                }
                .au-select:focus {
                    border-color: rgba(220,38,38,0.5);
                    color: rgba(255,255,255,0.85);
                }
                .au-select option { background: #1a1a1a; color: rgba(255,255,255,0.8); }

                .au-table-wrap {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px;
                    overflow: hidden;
                }

                .au-thead {
                    display: grid;
                    grid-template-columns: 2.5fr 1.8fr 1.4fr 1.2fr 0.8fr;
                    padding: 11px 22px;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                    background: rgba(255,255,255,0.02);
                }
                .au-th {
                    font-family: 'Syne', sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.25);
                }
                .au-th-right { text-align: right; }

                .au-row {
                    display: grid;
                    grid-template-columns: 2.5fr 1.8fr 1.4fr 1.2fr 0.8fr;
                    padding: 14px 22px;
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                    align-items: center;
                    transition: background 0.15s;
                }
                .au-row:last-child { border-bottom: none; }
                .au-row:hover { background: rgba(255,255,255,0.025); }

                .au-name {
                    font-weight: 500;
                    color: rgba(255,255,255,0.88);
                    font-size: 13.5px;
                }
                .au-email { font-size: 11.5px; color: rgba(255,255,255,0.32); margin-top: 2px; }
                .au-username { font-size: 11px; color: rgba(255,255,255,0.2); margin-top: 1px; }

                .au-program {
                    font-size: 13px;
                    color: rgba(255,255,255,0.45);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 160px;
                    display: block;
                }

                .au-role-select {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 8px;
                    padding: 6px 10px;
                    color: rgba(255,255,255,0.7);
                    font-size: 12px;
                    font-family: 'DM Sans', sans-serif;
                    outline: none;
                    cursor: pointer;
                    transition: all 0.15s;
                    width: 100%;
                }
                .au-role-select:focus { border-color: rgba(220,38,38,0.4); }
                .au-role-select:disabled { opacity: 0.4; cursor: not-allowed; }
                .au-role-select option { background: #1a1a1a; }

                .au-toggle {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .au-toggle-btn {
                    position: relative;
                    width: 36px; height: 20px;
                    border-radius: 99px;
                    border: none;
                    cursor: pointer;
                    transition: background 0.2s;
                    flex-shrink: 0;
                    padding: 0;
                }
                .au-toggle-btn.on  { background: rgba(34,197,94,0.85); }
                .au-toggle-btn.off { background: rgba(255,255,255,0.12); }
                .au-toggle-btn.disabled { opacity: 0.4; cursor: not-allowed; }
                .au-toggle-knob {
                    position: absolute;
                    top: 3px;
                    width: 14px; height: 14px;
                    border-radius: 50%;
                    background: white;
                    transition: left 0.2s;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                }
                .au-toggle-knob.on  { left: 19px; }
                .au-toggle-knob.off { left: 3px; }
                .au-toggle-label { font-size: 11.5px; color: rgba(255,255,255,0.35); }

                .au-del-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 8px;
                    padding: 6px 10px;
                    font-size: 12px;
                    font-family: 'DM Sans', sans-serif;
                    color: rgba(255,255,255,0.35);
                    cursor: pointer;
                    transition: all 0.15s;
                    width: 100%;
                }
                .au-del-btn:hover:not(:disabled) {
                    border-color: rgba(220,38,38,0.5);
                    color: rgba(220,38,38,0.9);
                    background: rgba(220,38,38,0.07);
                }
                .au-del-btn:disabled { opacity: 0.3; cursor: not-allowed; }

                .au-empty {
                    display: flex; flex-direction: column;
                    align-items: center; justify-content: center;
                    padding: 56px 24px; gap: 10px;
                }
                .au-empty-icon {
                    width: 48px; height: 48px; border-radius: 13px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.07);
                    display: flex; align-items: center; justify-content: center;
                    color: rgba(255,255,255,0.18); margin-bottom: 4px;
                }
                .au-empty-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 14px; font-weight: 600;
                    color: rgba(255,255,255,0.35);
                }
                .au-empty-sub { font-size: 12px; color: rgba(255,255,255,0.18); }

                .au-loading { color: rgba(255,255,255,0.3); font-size: 13px; text-align: center; padding: 56px; }
                .au-error   { color: rgba(220,38,38,0.8); font-size: 13px; text-align: center; padding: 56px; }

                .au-pagination {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 12px 22px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    background: rgba(255,255,255,0.01);
                }
                .au-page-info { font-size: 12px; color: rgba(255,255,255,0.25); }
                .au-page-btns { display: flex; gap: 6px; }
                .au-page-btn {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 8px;
                    padding: 6px 14px;
                    font-size: 12px;
                    font-family: 'DM Sans', sans-serif;
                    color: rgba(255,255,255,0.5);
                    cursor: pointer;
                    transition: all 0.15s;
                }
                .au-page-btn:hover:not(:disabled) {
                    border-color: rgba(220,38,38,0.4);
                    color: rgba(255,255,255,0.8);
                    background: rgba(220,38,38,0.06);
                }
                .au-page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
                .au-sliders-icon { color: rgba(255,255,255,0.2); flex-shrink: 0; }
            `}</style>

            <div className="au-wrap">
                {/* ── Filter Bar ─────────────────────────────────────────── */}
                <div className="au-filter-bar">
                    <SlidersIcon size={15} className="au-sliders-icon" />
                    <div className="au-search-wrap">
                        <SearchIcon size={14} className="au-search-icon" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, email o username..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="au-input"
                        />
                    </div>
                    <select
                        value={roleFilter}
                        onChange={e => { setRoleFilter(e.target.value); setCurrentPage(1) }}
                        className="au-select"
                    >
                        <option value="">Todos los roles</option>
                        <option value="admin">Admin</option>
                        <option value="content_manager">Content Manager</option>
                        <option value="project_lead">Project Lead</option>
                        <option value="member">Member</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1) }}
                        className="au-select"
                    >
                        <option value="">Cualquier estado</option>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
                </div>

                {/* ── Table ──────────────────────────────────────────────── */}
                <div className="au-table-wrap">
                    <div className="au-thead">
                        <span className="au-th">Usuario</span>
                        <span className="au-th">Programa</span>
                        <span className="au-th">Rol</span>
                        <span className="au-th">Estado</span>
                        <span className="au-th au-th-right">Acciones</span>
                    </div>

                    {loading && !data ? (
                        <div className="au-loading">Cargando usuarios...</div>
                    ) : error ? (
                        <div className="au-error">{error}</div>
                    ) : data?.users.length === 0 ? (
                        <div className="au-empty">
                            <div className="au-empty-icon"><UsersIcon size={20} /></div>
                            <p className="au-empty-title">No se encontraron usuarios</p>
                            <p className="au-empty-sub">
                                {search || roleFilter || statusFilter
                                    ? "Intenta ajustar los filtros de búsqueda"
                                    : "Aún no hay usuarios registrados en el sistema"}
                            </p>
                        </div>
                    ) : (
                        data?.users.map(user => (
                            <div key={user.id} className="au-row">
                                {/* Usuario */}
                                <div>
                                    <div className="au-name">{user.name} {user.last_name}</div>
                                    <div className="au-email">{user.email}</div>
                                    <div className="au-username">@{user.username || 'sin-usuario'}</div>
                                </div>
                                {/* Programa */}
                                <div>
                                    <span className="au-program" title={user.programs?.name || "No definido"}>
                                        {user.programs?.name || "No definido"}
                                    </span>
                                </div>
                                {/* Rol */}
                                <div>
                                    <select
                                        value={user.roles.name}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        disabled={user.id === currentUserId}
                                        className="au-role-select"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="content_manager">Content Mgr.</option>
                                        <option value="project_lead">Project Lead</option>
                                        <option value="member">Member</option>
                                    </select>
                                </div>
                                {/* Estado */}
                                <div className="au-toggle">
                                    <button
                                        onClick={() => handleStatusToggle(user.id, user.is_active)}
                                        disabled={user.id === currentUserId}
                                        title={user.id === currentUserId ? "No puedes desactivar tu cuenta" : "Cambiar estado"}
                                        className={`au-toggle-btn ${user.is_active ? 'on' : 'off'} ${user.id === currentUserId ? 'disabled' : ''}`}
                                    >
                                        <span className={`au-toggle-knob ${user.is_active ? 'on' : 'off'}`} />
                                    </button>
                                    <span className="au-toggle-label">{user.is_active ? 'Activo' : 'Inactivo'}</span>
                                </div>
                                {/* Acciones */}
                                <div>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        disabled={user.id === currentUserId}
                                        className="au-del-btn"
                                        title={user.id === currentUserId ? "No puedes eliminar tu cuenta" : "Eliminar usuario"}
                                    >
                                        <TrashIcon size={13} />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}

                    {/* ── Pagination ───────────────────────────────────────── */}
                    {data && data.totalPages > 1 && (
                        <div className="au-pagination">
                            <span className="au-page-info">
                                Página {data.page} de {data.totalPages} &nbsp;·&nbsp; {data.total} usuarios
                            </span>
                            <div className="au-page-btns">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => p - 1)}
                                    className="au-page-btn"
                                >← Anterior</button>
                                <button
                                    disabled={currentPage === data.totalPages}
                                    onClick={() => setCurrentPage(p => p + 1)}
                                    className="au-page-btn"
                                >Siguiente →</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}