
import { useEffect } from 'react';
import { useTestStore, TestConfig } from '@/store/testStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export function TestConfigModal() {
  const selectedTest = useTestStore((state) => state.selectedTest);
  const isOpen = useTestStore((state) => state.isConfigModalOpen);
  const setIsOpen = useTestStore((state) => state.setIsConfigModalOpen);
  const updateTest = useTestStore((state) => state.updateTest);
  const addTest = useTestStore((state) => state.addTest);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTest) {
      addTest(selectedTest);
      toast.success(`Added ${selectedTest.name} test`);
      setIsOpen(false);
    }
  };
  
  // Update configuration values
  const updateConfig = (key: keyof TestConfig, value: any) => {
    if (selectedTest) {
      const updatedConfig = { ...selectedTest.config, [key]: value };
      useTestStore.setState({
        selectedTest: { ...selectedTest, config: updatedConfig }
      });
    }
  };
  
  // Reset when dialog closes
  useEffect(() => {
    if (!isOpen) {
      useTestStore.setState({ 
        selectedTest: null,
        selectedTestType: null 
      });
    }
  }, [isOpen]);
  
  if (!selectedTest) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Configure Test</DialogTitle>
          <DialogDescription>
            Adjust the parameters for the {selectedTest.name} test.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <ScrollArea className="max-h-[400px] pr-4">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-6">
                {selectedTest.type === 'led' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="brightness">Brightness</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="brightness"
                          min={0}
                          max={100}
                          step={1}
                          defaultValue={[selectedTest.config.brightness || 50]}
                          onValueChange={(values) => updateConfig('brightness', values[0])}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium w-10 text-center">
                          {selectedTest.config.brightness || 50}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedTest.type === 'display' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="text">Display Text</Label>
                      <Input
                        id="text"
                        defaultValue={selectedTest.config.text || ''}
                        onChange={(e) => updateConfig('text', e.target.value)}
                        placeholder="Text to display"
                      />
                    </div>
                  </div>
                )}
                
                {selectedTest.type === 'hardware' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Test Duration (seconds)</Label>
                      <Input
                        id="duration"
                        type="number"
                        min={1}
                        max={300}
                        defaultValue={selectedTest.config.duration || 30}
                        onChange={(e) => updateConfig('duration', Number(e.target.value))}
                      />
                    </div>
                  </div>
                )}
                
                {selectedTest.type === 'network' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Network Address</Label>
                      <Input
                        id="address"
                        defaultValue={selectedTest.config.address || ''}
                        onChange={(e) => updateConfig('address', e.target.value)}
                        placeholder="192.168.1.1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="port">Port</Label>
                      <Input
                        id="port"
                        defaultValue={selectedTest.config.port || ''}
                        onChange={(e) => updateConfig('port', e.target.value)}
                        placeholder="8080"
                      />
                    </div>
                  </div>
                )}
                
                {selectedTest.type === 'battery' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="voltage">Voltage (V)</Label>
                      <Input
                        id="voltage"
                        type="number"
                        step="0.1"
                        min={0}
                        defaultValue={selectedTest.config.voltage || 3.7}
                        onChange={(e) => updateConfig('voltage', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current">Current (mA)</Label>
                      <Input
                        id="current"
                        type="number"
                        min={0}
                        defaultValue={selectedTest.config.current || 500}
                        onChange={(e) => updateConfig('current', Number(e.target.value))}
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-6">
                {selectedTest.type === 'battery' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency (Hz)</Label>
                      <Input
                        id="frequency"
                        type="number"
                        min={0}
                        defaultValue={selectedTest.config.frequency || 60}
                        onChange={(e) => updateConfig('frequency', Number(e.target.value))}
                      />
                    </div>
                  </div>
                )}
                
                {/* Default advanced settings for any test type */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Test Notes</Label>
                  <Input
                    id="notes"
                    placeholder="Additional notes for this test"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </ScrollArea>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Add Test
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
