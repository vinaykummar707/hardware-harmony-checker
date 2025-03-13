
import { useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useTestStore } from '@/store/testStore';
import { TEST_TYPES, createDefaultTest } from '@/utils/testUtils';
import { Plus } from 'lucide-react';

export function TestSelection() {
  const [selectedType, setSelectedType] = useState<string>(TEST_TYPES[0].id);
  const addTest = useTestStore((state) => state.addTest);
  const isRunning = useTestStore((state) => state.isRunning);
  
  const handleAddTest = () => {
    const testType = TEST_TYPES.find(t => t.id === selectedType);
    if (testType) {
      const newTest = createDefaultTest(testType.id, testType.name);
      addTest(newTest);
    }
  };
  
  return (
    <div className="space-y-4 animate-in">
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
        Test Selection
      </div>
      
      <div className="flex gap-3 items-center">
        <Select 
          value={selectedType}
          onValueChange={setSelectedType}
          disabled={isRunning}
        >
          <SelectTrigger className="w-[220px] bg-white shadow-sm">
            <SelectValue placeholder="Select test type" />
          </SelectTrigger>
          <SelectContent>
            {TEST_TYPES.map(type => (
              <SelectItem 
                key={type.id} 
                value={type.id}
                className="cursor-pointer"
              >
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button
          onClick={handleAddTest}
          disabled={isRunning}
          className="transition-all duration-300 hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Test
        </Button>
      </div>
    </div>
  );
}
