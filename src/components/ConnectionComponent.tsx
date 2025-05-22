import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

// Add these types near the top of the file
interface ComPortsResponse {
  status: boolean;
  output: ParsedOutput;
}

interface ParsedOutput {
  com_ports: string[];
}

// Add this interface near other interfaces
interface ConnectPortResponse {
  status: boolean;
  output: ParsedOutput;
}

const ConnectionComponent = () => {
  const [selectedPort, setSelectedPort] = useState<string>("");
  const navigate = useNavigate();

  const [availablePorts, setAvailablePorts] = useState<string[]>([]);

  const API_BASE_URL = "http://127.0.0.1:5000";

  const postComPorts = async (): Promise<string[]> => {
    const response = await axios.post<ComPortsResponse>(
      `${API_BASE_URL}/listComPorts`,
      {
        command: "list-com-ports",
        serial_number: "12345",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ No need to parse — it's already an object
    const parsedOutput = response.data.output;
    console.log(response.data);
    console.log(response.data.output);
    console.log(response.data.output.com_ports);
    return parsedOutput.com_ports;
  };

  const {
    mutate: fetchComPorts,
    data,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: postComPorts,
    onSuccess: (data) => {
      // Optional: update local state if needed
      console.log("success", data);
      setAvailablePorts(data);
    },
    onError: () => {
      toast.error("Failed to fetch COM ports");
    },
  });

  const connectMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        command: "update-com-port",
        serial_number: "12345",
        com_port: selectedPort,
      };
      const response = await axios.post<ConnectPortResponse>(
        `${API_BASE_URL}/comport`,
        payload
      );
      console.log(response.data)
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`Successfully connected to ${data.output}`);
      navigate("/tests");
    },
    onError: (error) => {
      toast.error("Failed to connect to port");
    },
  });

  const handleConnect = async () => {
    if (!selectedPort) return;
    connectMutation.mutate();
  };

  useEffect(() => {
    fetchComPorts(); // trigger the mutation once on mount
    console.log("available ports", availablePorts)
  }, [fetchComPorts, availablePorts]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="w-[280px] p-2 rounded-lg flex flex-col justify-center">
        <CardHeader className="space-y-4">
          <CardTitle>Connect</CardTitle>
          <CardDescription>
            Select from available ports to start testing the boards.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Ports</Label>
                <Select value={selectedPort} onValueChange={setSelectedPort}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select COM Port" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {availablePorts.map((port) => (
                      <SelectItem key={port} value={port}>
                        {port}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex ">
          <Button
            onClick={handleConnect}
            className="w-full"
            variant="default"
            size="default"
            disabled={!selectedPort || connectMutation.isPending}
          >
            {connectMutation.isPending ? "Connecting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConnectionComponent;
