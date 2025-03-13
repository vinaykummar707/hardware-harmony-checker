
import { TestConfig as TestConfigType } from "@/store/testStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LEDTestConfig } from "./LEDTestConfig";
import { DisplayTestConfig } from "./DisplayTestConfig";
import { HardwareTestConfig } from "./HardwareTestConfig";
import { NetworkTestConfig } from "./NetworkTestConfig";
import { BatteryTestConfig } from "./BatteryTestConfig";
import { AdvancedConfig } from "./AdvancedConfig";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface TestConfigFormProps {
  testType: string;
  config: TestConfigType;
  updateConfig: (key: keyof TestConfigType, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function TestConfigForm({ 
  testType, 
  config, 
  updateConfig, 
  onSubmit, 
  onCancel 
}: TestConfigFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 py-4">
      <ScrollArea className="max-h-[400px] pr-4">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic Settings</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6">
            {testType === 'led' && (
              <LEDTestConfig config={config} updateConfig={updateConfig} />
            )}
            
            {testType === 'display' && (
              <DisplayTestConfig config={config} updateConfig={updateConfig} />
            )}
            
            {testType === 'hardware' && (
              <HardwareTestConfig config={config} updateConfig={updateConfig} />
            )}
            
            {testType === 'network' && (
              <NetworkTestConfig config={config} updateConfig={updateConfig} />
            )}
            
            {testType === 'battery' && (
              <BatteryTestConfig config={config} updateConfig={updateConfig} />
            )}
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <AdvancedConfig 
              testType={testType} 
              config={config} 
              updateConfig={updateConfig} 
            />
          </TabsContent>
        </Tabs>
      </ScrollArea>
      
      <DialogFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">
          Add Test
        </Button>
      </DialogFooter>
    </form>
  );
}
