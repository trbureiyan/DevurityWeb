import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Obtener datos del usuario desde cookies o headers
  const userDataCookie = request.cookies.get('userData');
  
  if (!userDataCookie) {
    // Si no hay sesión, redirigir al login (excepto en login y registro)
    if (pathname !== '/login' && pathname !== '/registro') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  try {
    const userData = JSON.parse(userDataCookie.value);
    const userRole = userData.usuario?.role;

    // Proteger ruta /admin - solo para ADMIN
    if (pathname.startsWith('/admin')) {
      if (userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/perfil', request.url));
      }
    }

    // Proteger ruta /asistencias - solo para ADMIN
    if (pathname.startsWith('/asistencias')) {
      if (userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/perfil', request.url));
      }
    }


    // Si está en login o registro y ya tiene sesión, redirigir según rol
    if (pathname === '/login' || pathname === '/registro') {
      if (userRole === 'ADMIN') {
        return NextResponse.redirect(new URL('/asistencias', request.url));
        
      } else {
        return NextResponse.redirect(new URL('/perfil', request.url));
      }
    }

  } catch (error) {
    // Si hay error al parsear, eliminar cookie y redirigir al login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('userData');
    return response;
  }

  return NextResponse.next();
}

// Configurar qué rutas debe proteger el middleware
export const config = {
  matcher: [
    '/admin/:path*',
    '/asistencias/:path*',
    '/perfil/:path*',
    '/login',
    '/registro',
  ],
};