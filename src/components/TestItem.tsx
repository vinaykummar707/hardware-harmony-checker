
import { useState } from 'react';
import { Test } from '@/store/testStore';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Settings, Trash, XCircle, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  
  const getStatusIcon = () => {
    switch (test.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'running':
        return (
          <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        );
      default:
        return null;
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
        "glass-card p-4 rounded-lg transition-all relative",
        getStatusClass()
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{test.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {test.result || `Type: ${test.type}`}
          </p>
        </div>
        <div className="flex items-center">
          {getStatusIcon()}
        </div>
      </div>
      
      {test.status === 'running' && (
        <Progress value={test.progress} className="h-1.5 mt-3" />
      )}
      
      {(test.status === 'pending' || isHovering) && (
        <div className={`mt-3 flex items-center space-x-2 transition-opacity duration-200 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}>
          {test.status === 'pending' && onRun && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRun(test)}
              disabled={disabled || test.status === 'running'}
              className="h-8 text-xs"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              Run Test
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onConfigure(test)}
            disabled={disabled || test.status === 'running'}
            className="h-8 text-xs"
          >
            <Settings className="h-3.5 w-3.5 mr-1" />
            Configure
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRemove(test.id)}
            disabled={disabled || test.status === 'running'}
            className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash className="h-3.5 w-3.5 mr-1" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
