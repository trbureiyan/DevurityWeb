"use client";

type AlertType = "success" | "error" | "info" | "warning";

interface AlertBoxProps {
  type: AlertType;
  message: string;
}

export default function AlertBox({ type, message }: AlertBoxProps) {
  const styles = {
    success: "bg-green-900/20 border-green-500 text-green-300",
    error: "bg-red-900/20 border-red-500 text-red-300",
    info: "bg-blue-900/20 border-blue-500 text-blue-300",
    warning: "bg-yellow-900/20 border-yellow-500 text-yellow-300",
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${styles[type]}`}>
      <p className="font-ubuntu text-sm">{message}</p>
    </div>
  );
}
