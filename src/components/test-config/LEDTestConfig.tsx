
import { TestConfig } from "@/store/testStore";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface LEDTestConfigProps {
  config: TestConfig;
  updateConfig: (key: keyof TestConfig, value: any) => void;
}

export function LEDTestConfig({ config, updateConfig }: LEDTestConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="brightness">Brightness</Label>
        <div className="flex items-center gap-4">
          <Slider
            id="brightness"
            min={0}
            max={100}
            step={1}
            defaultValue={[config.brightness || 50]}
            onValueChange={(values) => updateConfig('brightness', values[0])}
            className="flex-1"
          />
          <span className="text-sm font-medium w-10 text-center">
            {config.brightness || 50}%
          </span>
        </div>
      </div>
    </div>
  );
}
