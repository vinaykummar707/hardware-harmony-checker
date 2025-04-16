
import { useTestStore } from '@/store/testStore';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { CheckCircle, Clock, List, PlayCircle, XCircle } from 'lucide-react';

export function TestStats() {
  const tests = useTestStore((state) => state.tests);
  const results = useTestStore((state) => state.results);
  
  const pendingTests = tests.filter(t => t.status === 'pending').length;
  const runningTests = tests.filter(t => t.status === 'running').length;
  
  return (
    <div className="space-y-4 animate-in">
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
        Test Statistics
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard 
          title="Total Tests" 
          value={tests.length} 
          icon={<List className="h-5 w-5 text-primary/80" />}
        />
        <StatCard 
          title="Pending" 
          value={pendingTests} 
          icon={<Clock className="h-5 w-5 text-muted-foreground" />}
        />
        <StatCard 
          title="Running" 
          value={runningTests} 
          icon={<PlayCircle className="h-5 w-5 text-primary" />}
          isActive={runningTests > 0}
        />
        <StatCard 
          title="Completed" 
          value={results.passed} 
          icon={<CheckCircle className="h-5 w-5 text-success" />}
        />
        <StatCard 
          title="Failed" 
          value={results.failed} 
          icon={<XCircle className="h-5 w-5 text-destructive" />}
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  isActive?: boolean;
}

function StatCard({ title, value, icon, isActive = false }: StatCardProps) {
  return (
    <Card className={`overflow-hidden shadow-none border transition-all ${
      isActive ? 'border-primary/20 bg-primary/5' : ''
    }`}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className={`text-2xl font-bold ${
          isActive ? 'text-primary' : ''
        }`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
