import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkPortStatus } from "@/utils/portUtils";

interface PortStatusResponse {
  status: boolean;
  output: string;
}

export const PortCheck = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: checkPortStatus,
    onSuccess: (data: PortStatusResponse) => {
      if (!data || !data.output || data.output.trim() === '') {
        // navigate('/connect');
      } else {
        // navigate('/tests');
      }
    },
    onError: () => {
      // navigate('/connect');
    }
  });

  useEffect(() => {
    mutate();
  }, []);

  if (isPending) {
    return (
      <div className="h-screen w-screen flex flex-col gap-2 items-center overflow-hidden justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="text-xs text-gray-500">Verifying COM Port Connection</span>
      </div>
    );
  }

  return null;
};