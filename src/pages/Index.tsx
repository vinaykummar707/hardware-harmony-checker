import { useEffect, useState } from "react";
import { TestSelection } from "@/components/TestSelection";
import { TestStats } from "@/components/TestStats";
import { TestExecution } from "@/components/TestExecution";
import { TestConfigModal } from "@/components/TestConfig";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWriteFBAddress, useReadFBAddress } from "@/utils/portUtils";

type BoardType = string | "FB" | "SB" | "RB" | "IB";

interface IndexProps {
  selectedBoard: BoardType;
}
const Index = ({ selectedBoard }: IndexProps) => {
  const getDefaultValues = (boardType: string) => {
    const defaults = {
      FB: { address: "41", serialNumber: "NAVI1", type: "F" },
      SB: { address: "43", serialNumber: "NAVI2", type: "S" },
      RB: { address: "42", serialNumber: "NAVI3", type: "R" },
      IB: { address: "44", serialNumber: "NAVI4", type: "I" },
    };
    return defaults[boardType as keyof typeof defaults];
  };

  const defaultValues = getDefaultValues(selectedBoard);
  const [address, setAddress] = useState(defaultValues.address);
  const [serialNumber, setSerialNumber] = useState(defaultValues.serialNumber);
  const [addressRead, setAddressRead] = useState(defaultValues.address);
  const [serialNumberRead, setSerialNumberRead] = useState(
    defaultValues.serialNumber
  );

  const { mutate: writeFBAddress, isPending: isWriting } = useWriteFBAddress();
  const {
    mutate: readFBAddress,
    isPending: isReading,
    data: readData,
    isSuccess,
  } = useReadFBAddress();

  const handleWrite = () => {
    if (!address || !serialNumber) return;
    writeFBAddress({
      address,
      command: "20",
      width: "90",
      board_type: defaultValues.type,
      serial_number: serialNumber,
    });
  };

  const handleRead = () => {
    readFBAddress({
      address,
      command: "10",
      board_type: defaultValues.type,
      serial_number: serialNumber,
    });
  };

  useEffect(() => {
    setAddress(defaultValues.address);
    setSerialNumber(defaultValues.serialNumber);
    if (isSuccess) {
      setAddress(readData.output);
      setAddressRead(readData.output);
    }
  }, [selectedBoard, isSuccess]);

  return (
    <main className="py-4">
      <div className="text-xs  pb-4  uppercase tracking-wider text-muted-foreground font-medium">
        BOARD CONFIGURATION
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="col-span-12 space-y-4">
          <div className="inline-flex bg-white p-4 w-full rounded-lg border items-end space-x-1 ">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                className="bg-white"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                id="serialNumber"
                type="text"
                className="bg-white"
                placeholder="Serial Number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
            </div>
            <Button
              variant="default"
              className="border"
              onClick={handleWrite}
              disabled={isWriting}
            >
              {isWriting ? "Writing..." : "Write"}
            </Button>
            <div className="flex pl-6 flex-col space-y-1.5">
              <Label htmlFor="address">Read Address</Label>
              <Input
                id="address"
                type="text"
                className="bg-white"
                placeholder="Address"
                disabled
                value={addressRead}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <Button
              variant="default"
              className="border"
              onClick={handleRead}
              disabled={isReading}
            >
              {isReading ? "Reading..." : "Read"}
            </Button>
          </div>
          <Separator />
          <TestStats />
          <Separator />
          <TestSelection selectedBoard={selectedBoard} />
          <Separator />
          <TestExecution />
        </div>
        <div></div>
      </div>
      <TestConfigModal />
    </main>
  );
};

export default Index;
