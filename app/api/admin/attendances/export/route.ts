import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { getAttendancesForExport } from "@/repositories/admin/attendances.repositories";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateFrom = searchParams.get("dateFrom") || undefined;
    const dateTo = searchParams.get("dateTo") || undefined;
    const search = searchParams.get("search") || undefined;
    const program = searchParams.get("program") || undefined;
    const format = searchParams.get("format") === "csv" ? "csv" : "xlsx";

    const attendances = await getAttendancesForExport({ dateFrom, dateTo, search, program });

    const rows = attendances.map((a, idx) => ({
      "N°": idx + 1,
      Nombre: a.user?.name ?? "",
      Apellido: a.user?.last_name ?? "",
      Email: a.user?.email ?? "",
      Programa: a.user?.program ?? "Sin programa",
      Semestre: a.user?.semester ?? "",
      Fecha: formatDate(a.attendance_date),
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Asistencias");

    const today = new Date().toISOString().split("T")[0];

    if (format === "csv") {
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="asistencias-${today}.csv"`,
        },
      });
    }

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="asistencias-${today}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error generating attendance export:", error);
    return NextResponse.json({ error: "Error al generar el archivo" }, { status: 500 });
  }
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
