
import { TestConfig } from "@/store/testStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface HardwareTestConfigProps {
  config: TestConfig;
  updateConfig: (key: keyof TestConfig, value: any) => void;
}

export function HardwareTestConfig({ config, updateConfig }: HardwareTestConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="duration">Test Duration (seconds)</Label>
        <Input
          id="duration"
          type="number"
          min={1}
          max={300}
          defaultValue={config.duration || 30}
          onChange={(e) => updateConfig('duration', Number(e.target.value))}
        />
      </div>
    </div>
  );
}
