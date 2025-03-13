
import { useEffect } from 'react';
import { useTestStore, TestConfig } from '@/store/testStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { TestConfigForm } from './test-config/TestConfigForm';

export function TestConfigModal() {
  const selectedTest = useTestStore((state) => state.selectedTest);
  const isOpen = useTestStore((state) => state.isConfigModalOpen);
  const setIsOpen = useTestStore((state) => state.setIsConfigModalOpen);
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
        
        <TestConfigForm
          testType={selectedTest.type}
          config={selectedTest.config}
          updateConfig={updateConfig}
          onSubmit={handleSubmit}
          onCancel={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
