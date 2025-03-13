
import { TestConfig } from "@/store/testStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NetworkTestConfigProps {
  config: TestConfig;
  updateConfig: (key: keyof TestConfig, value: any) => void;
}

export function NetworkTestConfig({ config, updateConfig }: NetworkTestConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address">Network Address</Label>
        <Input
          id="address"
          defaultValue={config.address || ''}
          onChange={(e) => updateConfig('address', e.target.value)}
          placeholder="192.168.1.1"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="port">Port</Label>
        <Input
          id="port"
          defaultValue={config.port || ''}
          onChange={(e) => updateConfig('port', e.target.value)}
          placeholder="8080"
        />
      </div>
    </div>
  );
}
