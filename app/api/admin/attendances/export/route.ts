import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { getAttendancesForExport } from "@/repositories/admin/attendances.repositories";
import { extractTokenFromCookies } from "@/lib/auth/utils";
import { verifyJwtPayload } from "@/lib/auth/jwt-edge";
import { formatDateCO } from "@/lib/utils/date";

// Prefija con apóstrofo los valores de texto que Excel interpretaría como fórmula.
function sanitizeCell(value: string): string {
  if (/^[=+\-@\t\r]/.test(value)) {
    return `'${value}`;
  }
  return value;
}

export async function GET(request: NextRequest) {
  // autenticación y autorización antes de procesar o devolver cualquier dato
  const token = extractTokenFromCookies(request);
  if (!token) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  const decoded = await verifyJwtPayload(token);
  if (!decoded || decoded.role !== "admin") {
    return NextResponse.json({ error: "Acceso restringido" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const dateFrom = searchParams.get("dateFrom") || undefined;
    const dateTo = searchParams.get("dateTo") || undefined;
    const search = searchParams.get("search") || undefined;
    const program = searchParams.get("program") || undefined;
    const format = searchParams.get("format") === "csv" ? "csv" : "xlsx";

    const { data: attendances, isTruncated } = await getAttendancesForExport({ dateFrom, dateTo, search, program });

    const rows = attendances.map((a, idx) => ({
      "N°": idx + 1,
      Nombre: sanitizeCell(a.user?.name ?? ""),
      Apellido: sanitizeCell(a.user?.last_name ?? ""),
      Email: sanitizeCell(a.user?.email ?? ""),
      Programa: sanitizeCell(a.user?.program ?? "Sin programa"),
      Semestre: a.user?.semester ?? "",
      Fecha: formatDateCO(a.attendance_date, "long"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Asistencias");

    const today = new Date().toISOString().split("T")[0];

    if (format === "csv") {
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const res = new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="asistencias-${today}.csv"`,
        },
      });
      if (isTruncated) res.headers.set("X-Export-Truncated", "true");
      return res;
    }

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    const res = new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="asistencias-${today}.xlsx"`,
      },
    });
    if (isTruncated) res.headers.set("X-Export-Truncated", "true");
    return res;
  } catch (error) {
    console.error("Error generating attendance export:", error);
    return NextResponse.json({ error: "Error al generar el archivo" }, { status: 500 });
  }
}
