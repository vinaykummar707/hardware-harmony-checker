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
    `${API_BASE_URL}/comport`,
    payload
  );
  return response.data;
};