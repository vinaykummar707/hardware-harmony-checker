
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTestStore } from "@/store/testStore";
import { TestConfigForm } from "@/components/test-config/TestConfigForm";

export function TestConfigModal() {
  const { 
    isConfigModalOpen, 
    setIsConfigModalOpen, 
    selectedTest, 
    updateTest,
    addTest,
    setSelectedTestType,
    tests
  } = useTestStore();
  
  // Check if we're editing an existing test by seeing if it already exists in the tests array
  const isEditing = selectedTest ? tests.some(test => test.id === selectedTest.id) : false;
  
  const handleClose = () => {
    setIsConfigModalOpen(false);
    setSelectedTestType(null);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedTest) {
      if (isEditing) {
        // Update existing test
        updateTest(selectedTest.id, selectedTest);
      } else {
        // Add new test
        addTest(selectedTest);
      }
      
      handleClose();
    }
  };
  
  const handleUpdateConfig = (key: string, value: any) => {
    if (selectedTest) {
      updateTest(selectedTest.id, { 
        ...selectedTest,
        config: {
          ...selectedTest.config,
          [key]: value
        }
      });
    }
  };
  
  return (
    <Dialog open={isConfigModalOpen} onOpenChange={setIsConfigModalOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Test Configuration" : "Add New Test"}
          </DialogTitle>
        </DialogHeader>
        
        {selectedTest && (
          <TestConfigForm
            testType={selectedTest.type}
            config={selectedTest.config}
            updateConfig={handleUpdateConfig}
            onSubmit={handleSubmit}
            onCancel={handleClose}
            isEditing={isEditing}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
