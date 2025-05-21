
import { useState } from 'react';
import { Test } from '@/store/testStore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, CheckCircle, CheckCircle2, CheckIcon, Play, Settings, Trash, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TestItemProps {
  test: Test;
  onConfigure: (test: Test) => void;
  onRemove: (id: string) => void;
  onRun?: (test: Test) => void;
  disabled?: boolean;
}

export function TestItem({ 
  test, 
  onConfigure, 
  onRemove, 
  onRun,
  disabled = false 
}: TestItemProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  const getStatusBadge = () => {
    switch (test.status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-success/10 text-success border-success/20 flex items-center gap-1">
            <CheckIcon className="h-3 w-3" />
            Passed
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
      case 'running':
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1">
            <div className="h-3 w-3 rounded-full border-[1.5px] border-primary border-t-transparent animate-spin mr-1" />
            Running
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="">
            Pending
          </Badge>
        );
    }
  };
  
  const getStatusClass = () => {
    switch (test.status) {
      case 'completed':
        return 'border-success/20 bg-success/5';
      case 'failed':
        return 'border-destructive/20 bg-destructive/5';
      case 'running':
        return 'border-primary/20 bg-primary/5';
      default:
        return '';
    }
  };

  return (
    <div 
      className={cn(
        "glass-card p-4 flex justify-between items-center rounded-lg border border-stone-200 w-full transition-all relative",
        getStatusClass()
      )}
    >
      <div className="flex w-full justify-between items-center gap-2">
        <div>
        
        <h3 className="font-bold text-md text-foreground">{test.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {test.result }
        </p>

        <div className="flex justify-between items-start mt-2">
          {getStatusBadge()}
        </div>
        </div>
     

      <div>
      {(test.status === 'pending' || test.status === 'completed' || test.status === 'failed') && 
          <div className="mt-3 flex items-center space-x-2 transition-opacity duration-200">
            {onRun && (test.status === 'pending' || test.status === 'completed' || test.status === 'failed') && (
              <Button
                variant="outline"
                onClick={() => onRun(test)}
                disabled={disabled || test.status === 'running'}
              >
                <Play className="" />
                Run
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => onConfigure(test)}
              disabled={disabled || test.status === 'running'}
            >
              <Settings className="" />
              Settings
            </Button>
            <Button
              variant="outline"
              onClick={() => onRemove(test.id)}
              disabled={disabled || test.status === 'running'}
            >
              <Trash className="" />
              Delete
            </Button>
          </div>
        }
      </div>
      
       
      </div>
    </div>
  );
}
