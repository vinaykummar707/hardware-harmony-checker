
import { TestConfig } from "@/store/testStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BatteryTestConfig } from "./BatteryTestConfig";

interface AdvancedConfigProps {
  testType: string;
  config: TestConfig;
  updateConfig: (key: keyof TestConfig, value: any) => void;
}

export function AdvancedConfig({ testType, config, updateConfig }: AdvancedConfigProps) {
  return (
    <div className="space-y-6">
      {testType === 'battery' && (
        <BatteryTestConfig 
          config={config} 
          updateConfig={updateConfig} 
          isAdvanced={true} 
        />
      )}
      
      {/* Default advanced settings for any test type */}
      <div className="space-y-2">
        <Label htmlFor="notes">Test Notes</Label>
        <Input
          id="notes"
          placeholder="Additional notes for this test"
          defaultValue={config.notes || ''}
          onChange={(e) => updateConfig('notes', e.target.value)}
        />
      </div>
    </div>
  );
}
