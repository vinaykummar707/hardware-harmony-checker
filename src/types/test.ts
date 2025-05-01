export interface TestParameter {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'slider' | 'select' | 'checkbox' | 'radio' | 'switch';
  description: string;
  defaultValue: any;
  options?: Array<{ value: string; label: string }>;
  min?: number;
  max?: number;
  step?: number;
}

export interface TestDefinition {
  id: string;
  name: string;
  boardType: string;
  url: string;
  description: string;
  parameters: TestParameter[];
  defaultPayload: Record<string, any>;
}