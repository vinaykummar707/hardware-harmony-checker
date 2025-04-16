
import { TestConfig as TestConfigType } from "@/store/testStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { testDefinitions } from "@/utils/testUtils";
import { DynamicFormField } from "./DynamicFormField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface TestConfigFormProps {
  testType: string;
  config: TestConfigType;
  updateConfig: (key: keyof TestConfigType, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEditing?: boolean; // Add this to determine if we're editing an existing test
}

export function TestConfigForm({ 
  testType, 
  config, 
  updateConfig, 
  onSubmit, 
  onCancel,
  isEditing = false
}: TestConfigFormProps) {
  // Find the test definition for the current test type
  const testDefinition = testDefinitions.find(def => def.id === testType);
  
  // Create a dynamic schema based on the test parameters
  const formSchema = z.object({
    ...Object.fromEntries(
      testDefinition?.parameters.map(param => [
        param.key, 
        z.any()
      ]) || []
    )
  });

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: config || {},
  });

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Update each config value
    Object.entries(values).forEach(([key, value]) => {
      updateConfig(key as keyof TestConfigType, value);
    });
    
    // Call the original onSubmit
    onSubmit(new Event('submit') as unknown as React.FormEvent);
  };
  
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
      <ScrollArea className="h-[350px] pr-4 overflow-y-auto">
        {testDefinition ? (
          <div className="space-y-4 pr-2">
            <p className="text-sm text-muted-foreground mb-4">{testDefinition.description}</p>
            
            {testDefinition.parameters.map((param) => (
              <DynamicFormField
                key={param.key}
                parameter={param}
                value={config[param.key] !== undefined ? config[param.key] : param.defaultValue}
                onChange={(value) => {
                  updateConfig(param.key as keyof TestConfigType, value);
                  form.setValue(param.key, value);
                }}
                form={form}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No configuration available for this test type
          </div>
        )}
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
          {isEditing ? "Update Test" : "Add Test"}
        </Button>
      </DialogFooter>
    </form>
  );
}