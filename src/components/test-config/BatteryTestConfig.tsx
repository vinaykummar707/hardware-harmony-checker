
import { TestConfig } from "@/store/testStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BatteryTestConfigProps {
  config: TestConfig;
  updateConfig: (key: keyof TestConfig, value: any) => void;
  isAdvanced?: boolean;
}

export function BatteryTestConfig({ config, updateConfig, isAdvanced = false }: BatteryTestConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="voltage">Voltage (V)</Label>
        <Input
          id="voltage"
          type="number"
          step="0.1"
          min={0}
          defaultValue={config.voltage || 3.7}
          onChange={(e) => updateConfig('voltage', Number(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="current">Current (mA)</Label>
        <Input
          id="current"
          type="number"
          min={0}
          defaultValue={config.current || 500}
          onChange={(e) => updateConfig('current', Number(e.target.value))}
        />
      </div>
      
      {isAdvanced && (
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency (Hz)</Label>
          <Input
            id="frequency"
            type="number"
            min={0}
            defaultValue={config.frequency || 60}
            onChange={(e) => updateConfig('frequency', Number(e.target.value))}
          />
        </div>
      )}
    </div>
  );
}
