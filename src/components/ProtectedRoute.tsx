import { useMutation } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkPortStatus } from "@/utils/portUtils";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const [status, setStatus] = useState<"checking" | "connected" | "disconnected">("checking");

  const { mutate } = useMutation({
    mutationFn: checkPortStatus,
    onSuccess: (data) => {
      if (!data || !data.output || data.output.trim() === '') {
        setStatus("disconnected");
      } else {
        setStatus("connected");
      }
    },
    onError: () => {
      setStatus("disconnected");
    }
  });

  useEffect(() => {
    mutate();
  }, []);

  if (status === "checking") {
    return (
      <div className="h-screen w-screen flex flex-col gap-2 items-center overflow-hidden justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="text-xs text-gray-500">Verifying COM Port Connection</span>
      </div>
    );
  }

  if (status === "disconnected") {
    return <Navigate to="/connect" replace />;
  }

  return <Outlet />;
};
