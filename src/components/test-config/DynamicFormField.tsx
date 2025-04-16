import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TestParameter } from "@/types/test";
import { UseFormReturn } from "react-hook-form";

interface DynamicFormFieldProps {
  parameter: TestParameter;
  value: any;
  onChange: (value: any) => void;
  form?: UseFormReturn<any>;
}

export function DynamicFormField({ parameter, value, onChange, form }: DynamicFormFieldProps) {
  const { key, label, type, description, options, min, max } = parameter;
  
  return (
    <div className="space-y-2 mb-4">
      <div className="space-y-1">
        <Label htmlFor={key}>{label}</Label>
        
        {/* Text input */}
        {type === 'text' && (
          <Input
            id={key}
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
        )}
        
        {/* Textarea for multiline text */}
        {type === 'textarea' && (
          <Textarea
            id={key}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}`}
            rows={4}
          />
        )}
        
        {/* Number input */}
        {type === 'number' && (
          <Input
            id={key}
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={parameter.step || 1}
          />
        )}
        
        {/* Slider */}
        {type === 'slider' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                id={key}
                type="number"
                className="w-20"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                min={min}
                max={max}
                step={parameter.step || 1}
              />
              <Slider
                value={[value]}
                min={min}
                max={max}
                step={parameter.step || 1}
                onValueChange={(vals) => onChange(vals[0])}
                className="flex-1"
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{min}</span>
              <span>{max}</span>
            </div>
          </div>
        )}
        
        {/* Select dropdown */}
        {type === 'select' && options && (
          <Select 
            value={String(value)} 
            onValueChange={onChange}
          >
            <SelectTrigger id={key}>
              <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {/* Checkbox */}
        {type === 'checkbox' && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={key}
              checked={Boolean(value)}
              onCheckedChange={onChange}
            />
            <Label
              htmlFor={key}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </Label>
          </div>
        )}
        
        {/* Radio group */}
        {type === 'radio' && options && (
          <RadioGroup
            value={String(value)}
            onValueChange={onChange}
            className="flex flex-col space-y-1"
          >
            {options.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`${key}-${option.value}`} />
                <Label htmlFor={`${key}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
        
        {/* Toggle switch */}
        {type === 'switch' && (
          <div className="flex items-center space-x-2">
            <Switch
              id={key}
              checked={Boolean(value)}
              onCheckedChange={onChange}
            />
            <Label htmlFor={key}>{label}</Label>
          </div>
        )}
        
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}