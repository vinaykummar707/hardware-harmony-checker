import axios from 'axios';

interface PortStatusResponse {
  status: boolean;
  output: string;
}

export const checkPortStatus = async (): Promise<PortStatusResponse> => {
  const API_BASE_URL = 'http://127.0.0.1:5000';
  const payload = {
    command: "get-com-port",
    serial_number: "12345"
  };

  const response = await axios.post<PortStatusResponse>(
    `${API_BASE_URL}/getComPort`,
    payload
  );
  return response.data;
};


import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const API_BASE_URL = 'http://127.0.0.1:5000';

interface FBAddressResponse {
  status: boolean;
  output: string;
}

// Write FB Address Types and Hook
interface WriteFBAddressPayload {
  address: string;
  command: string;
  width: string;
  board_type: string;
  serial_number: string;
}

export const useWriteFBAddress = () => {
  return useMutation<FBAddressResponse, Error, WriteFBAddressPayload>({
    mutationFn: async (payload) => {
      const response = await axios.post<FBAddressResponse>(
        `${API_BASE_URL}/deviceControl`,
        payload
      );
      return response.data;
    },
    onSuccess: (data,variables) => {
      if(data.status){
        toast.success(`Successfully wrote ${variables.address} address and ${variables.serial_number} serial number`)
      } else {
        toast.error(`Failed to write ${variables.address} address and ${variables.serial_number} serial number`);
      }
      

    },
    onError: (error) => {
      toast.error("Failed to write  address");
    }
  });
};

// Read FB Address Types and Hook
interface ReadFBAddressPayload {
  address: string;
  command: string;
  board_type: string;
  serial_number: string;
}

export const useReadFBAddress = () => {
  return useMutation<FBAddressResponse, Error, ReadFBAddressPayload>({
    mutationFn: async (payload) => {
      const response = await axios.post<FBAddressResponse>(
        `${API_BASE_URL}/deviceControl`,
        payload
      );
      return response.data;
    },
    onSuccess: (data) => {
     if(data.status){
        toast.success(`Successfully Read: ${data.output}`)
      } else {
        toast.error(`Failed to Read: ${data.output}`);
      }
    },
    onError: (error) => {
      toast.error("Failed to read  address");
    }
  });
};