
import { TestConfig } from "@/store/testStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DisplayTestConfigProps {
  config: TestConfig;
  updateConfig: (key: keyof TestConfig, value: any) => void;
}

export function DisplayTestConfig({ config, updateConfig }: DisplayTestConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Display Text</Label>
        <Input
          id="text"
          defaultValue={config.text || ''}
          onChange={(e) => updateConfig('text', e.target.value)}
          placeholder="Text to display"
        />
      </div>
    </div>
  );
}
