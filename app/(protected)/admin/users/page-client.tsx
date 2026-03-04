"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

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

export default function AdminUsersClientPage() {
    const router = useRouter()
    const [data, setData] = useState<PaginatedResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Search & Filter state
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const [roleFilter, setRoleFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    // Auth User check (simplified directly or you can hit /api/auth/me if needed for disable own toggle)
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)

    useEffect(() => {
        // Get current user id to disable deleting/deactivating self
        fetch('/api/auth/is-admin')
            .then(res => res.json())
            .then(data => {
                if (data.userId) setCurrentUserId(data.userId)
            })
            .catch(console.error)
    }, [])

    // Debounce logic for search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
            setCurrentPage(1) // Reset to page 1 on new search
        }, 500)
        return () => clearTimeout(timer)
    }, [search])

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true)
            const query = new URLSearchParams({
                page: currentPage.toString(),
                limit: "10"
            })
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

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            const res = await fetch(`/api/admin/users/${userId}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            })
            if (!res.ok) throw new Error("No se pudo actualizar el rol")
            // Update local state without full refetch
            setData(prev => prev ? {
                ...prev,
                users: prev.users.map(u => u.id === userId ? { ...u, roles: { ...u.roles, name: newRole } } : u)
            } : null)
        } catch (err: any) {
            alert(err.message)
        }
    }

    const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
        if (userId === currentUserId) return;
        try {
            const res = await fetch(`/api/admin/users/${userId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_active: !currentStatus })
            })
            if (!res.ok) throw new Error("No se pudo actualizar el estado")
            // Update local state
            setData(prev => prev ? {
                ...prev,
                users: prev.users.map(u => u.id === userId ? { ...u, is_active: !currentStatus } : u)
            } : null)
        } catch (err: any) {
            alert(err.message)
        }
    }

    const handleDelete = async (userId: string) => {
        if (userId === currentUserId) {
            alert("No puedes eliminar tu propia cuenta.");
            return;
        }

        if (!window.confirm("¿Estás seguro de que deseas eliminar permanentemente a este usuario? Esta acción no se puede deshacer.")) {
            return;
        }

        try {
            const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
            if (!res.ok) throw new Error("Error al eliminar el usuario")
            fetchUsers() // Refresh list since pagination changed
        } catch (err: any) {
            alert(err.message)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Filters Toolbar */}
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/50">
                <div className="flex-1 w-full max-w-sm">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, email o username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        value={roleFilter}
                        onChange={e => { setRoleFilter(e.target.value); setCurrentPage(1); }}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Todos los Roles</option>
                        <option value="admin">Admin</option>
                        <option value="content_manager">Content Manager</option>
                        <option value="project_lead">Project Lead</option>
                        <option value="member">Member</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Cualquier Estado</option>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-500 uppercase bg-gray-100/50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-medium">Usuario</th>
                            <th className="px-6 py-4 font-medium">Programa</th>
                            <th className="px-6 py-4 font-medium">Rol</th>
                            <th className="px-6 py-4 font-medium">Estado</th>
                            <th className="px-6 py-4 border-l border-gray-200 text-right font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading && !data ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Cargando usuarios...</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-red-500">{error}</td>
                            </tr>
                        ) : data?.users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No se encontraron usuarios</td>
                            </tr>
                        ) : (
                            data?.users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{user.name} {user.last_name}</div>
                                        <div className="text-gray-500 text-xs">{user.email}</div>
                                        <div className="text-gray-400 text-xs mt-0.5">@{user.username || 'sin-usuario'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-600 truncate max-w-[200px] block" title={user.programs?.name || "No definido"}>
                                            {user.programs?.name || "No definido"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.roles.name}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            disabled={user.id === currentUserId}
                                            className="px-2 py-1.5 border border-gray-200 rounded text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[130px]"
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="content_manager">Content Mgr.</option>
                                            <option value="project_lead">Project Lead</option>
                                            <option value="member">Member</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleStatusToggle(user.id, user.is_active)}
                                            disabled={user.id === currentUserId}
                                            title={user.id === currentUserId ? "No puedes desactivar tu cuenta" : "Cambiar estado"}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${user.is_active ? 'bg-green-500' : 'bg-gray-300'
                                                } ${user.id === currentUserId ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${user.is_active ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                            />
                                        </button>
                                        <span className="ml-2 text-xs font-medium text-gray-600 block sm:inline mt-1 sm:mt-0">
                                            {user.is_active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 border-l border-gray-200 text-right">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            disabled={user.id === currentUserId}
                                            className={`text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded transition-colors text-sm font-medium ${user.id === currentUserId ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {data && data.totalPages > 1 && (
                <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50/50">
                    <span className="text-sm text-gray-500">
                        Mostrando página {data.page} de {data.totalPages} ({data.total} total)
                    </span>
                    <div className="flex gap-1">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                            className="px-3 py-1.5 border border-gray-300 rounded bg-white text-sm disabled:opacity-50 hover:bg-gray-50"
                        >
                            Anterior
                        </button>
                        <button
                            disabled={currentPage === data.totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                            className="px-3 py-1.5 border border-gray-300 rounded bg-white text-sm disabled:opacity-50 hover:bg-gray-50"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
