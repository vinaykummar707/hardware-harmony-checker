
// import { useTestStore, Test } from '@/store/testStore';
// import { Button } from '@/components/ui/button';
// import { TestItem } from '@/components/TestItem';
// import { useMutation } from '@/hooks/useMutation';
// import { runTest } from '@/utils/testUtils';
// import { useToast } from '@/hooks/use-toast';
// import { 
//   Play,
//   XCircle,
//   Trash2,
//   AlertCircle,
// } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { TestSelection } from './TestSelection';

// export function TestExecution() {
//   const { 
//     tests, 
//     setSelectedTest, 
//     setIsConfigModalOpen, 
//     removeTest, 
//     clearTests, 
//     updateTest,
//     isRunning,
//     setIsRunning 
//   } = useTestStore();
  
//   const { toast } = useToast();
  
//   // Handle test configuration
//   const handleConfigureTest = (test: Test) => {
//     setSelectedTest(test);
//     setIsConfigModalOpen(true);
//   };
  
//   // Handle removing a test
//   const handleRemoveTest = (id: string) => {
//     removeTest(id);
//   };
  
//   // Run a single test
//   const runSingleTest = useMutation({
//     mutationFn: async (test: Test) => {
//       // Mark test as running
//       updateTest(test.id, { status: 'running', progress: 0 });
      
//       // Run the test
//       const result = await runTest(test);
      
//       // Update test with results
//       updateTest(test.id, {
//         status: result.status,
//         result: result.result,
//         progress: result.progress,
//         duration: result.duration
//       });
      
//       return result;
//     },
//     onSuccess: (result) => {
//       if (result.status === 'completed') {
//         toast({
//           title: 'Test Completed',
//           description: `${result.name} completed successfully`,
//         });
//       } else {
//         toast({
//           title: 'Test Failed',
//           description: `${result.name} failed: ${result.result}`,
//           variant: 'destructive',
//         });
//       }
//     }
//   });
  
//   // Run all tests sequentially
//   const runAllTests = useMutation({
//     mutationFn: async () => {
//       setIsRunning(true);
      
//       try {
//         // Filter only pending tests
//         const pendingTests = tests.filter(t => t.status === 'pending');
        
//         // Run tests sequentially
//         for (const test of pendingTests) {
//           await runSingleTest.mutateAsync(test);
//         }
        
//         return { success: true };
//       } finally {
//         setIsRunning(false);
//       }
//     },
//     onSuccess: () => {
//       toast({
//         title: 'All Tests Completed',
//         description: `${tests.filter(t => t.status === 'completed').length} tests completed, ${tests.filter(t => t.status === 'failed').length} tests failed`,
//       });
//     }
//   });
  
//   const handleRunAllTests = () => {
//     if (tests.filter(t => t.status === 'pending').length === 0) {
//       toast({
//         title: 'No Tests to Run',
//         description: 'Add some tests before running',
//         variant: 'destructive',
//       });
//       return;
//     }
    
//     runAllTests.mutate({});
//   };
  
//   return (
//     <div className="space-y-6 animate-in">
//       <div className="flex justify-between items-center">
//         {/* <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
//           Test Queue
//         </div> */}
//             <TestSelection />

//         <div className="flex items-center space-x-2">
//           <Button 
//             variant="outline" 
//             size="sm" 
//             onClick={clearTests}
//             disabled={isRunning || tests.length === 0}
//             className="text-xs h-8"
//           >
//             <Trash2 className="h-3.5 w-3.5 mr-1" />
//             Clear All
//           </Button>
//           <Button 
//             onClick={handleRunAllTests}
//             disabled={isRunning || tests.filter(t => t.status === 'pending').length === 0}
//             size="sm"
//             className="text-xs h-8"
//           >
//             <Play className="h-3.5 w-3.5 mr-1" />
//             Run All Tests
//           </Button>
//         </div>
//       </div>
      
//       {tests.length === 0 ? (
//         <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-lg bg-muted/5">
//           <AlertCircle className="h-10 w-10 text-muted-foreground mb-2 opacity-40" />
//           <h3 className="text-lg font-medium text-muted-foreground">No tests added</h3>
//           <p className="text-sm text-muted-foreground max-w-md mt-1">
//             Select a test type from the dropdown above and click "Add Test" to begin.
//           </p>
//         </div>
//       ) : (
//         <ScrollArea className="h-[420px] pr-4">
//           <div className="space-y-3">
//             {tests.map(test => (
//               <TestItem
//                 key={test.id}
//                 test={test}
//                 onConfigure={handleConfigureTest}
//                 onRemove={handleRemoveTest}
//                 disabled={isRunning}
//               />
//             ))}
//           </div>
//         </ScrollArea>
//       )}
      
//       {runSingleTest.isError && (
//         <Alert variant="destructive">
//           <XCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>
//             There was an error running the test. Please try again.
//           </AlertDescription>
//         </Alert>
//       )}
//     </div>
//   );
// }
import { useTestStore, Test } from '@/store/testStore';
import { Button } from '@/components/ui/button';
import { TestItem } from '@/components/TestItem';
import { useMutation } from '@/hooks/useMutation';
import { runTest } from '@/utils/testUtils';
import { useToast } from '@/hooks/use-toast';
import { 
  Play,
  XCircle,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';

export function TestExecution() {
  const { 
    tests, 
    setSelectedTest, 
    setIsConfigModalOpen, 
    removeTest, 
    clearTests, 
    updateTest,
    isRunning,
    setIsRunning 
  } = useTestStore();
  
  const { toast } = useToast();
  
  // Handle test configuration
  const handleConfigureTest = (test: Test) => {
    setSelectedTest(test);
    setIsConfigModalOpen(true);
  };
  
  // Handle removing a test
  const handleRemoveTest = (id: string) => {
    removeTest(id);
  };
  
  // Run a single test
  const runSingleTest = useMutation({
    mutationFn: async (test: Test) => {
      // Mark test as running
      updateTest(test.id, { status: 'running', progress: 0 });
      
      // Run the test
      const result = await runTest(test);
      
      // Update test with results
      updateTest(test.id, {
        status: result.status,
        result: result.result,
        progress: result.progress,
        duration: result.duration
      });
      
      return result;
    },
    onSuccess: (result) => {
      if (result.status === 'completed') {
        toast({
          title: 'Test Completed',
          description: `${result.name} completed successfully`,
        });
      } else {
        toast({
          title: 'Test Failed',
          description: `${result.name} failed: ${result.result}`,
          variant: 'destructive',
        });
      }
    }
  });
  
  // Run all tests sequentially
  const runAllTests = useMutation({
    mutationFn: async () => {
      setIsRunning(true);
      
      try {
        // Filter only pending tests
        const pendingTests = tests.filter(t => t.status === 'pending');
        
        // Run tests sequentially
        for (const test of pendingTests) {
          await runSingleTest.mutateAsync(test);
        }
        
        return { success: true };
      } finally {
        setIsRunning(false);
      }
    },
    onSuccess: () => {
      toast({
        title: 'All Tests Completed',
        description: `${tests.filter(t => t.status === 'completed').length} tests completed, ${tests.filter(t => t.status === 'failed').length} tests failed`,
      });
    }
  });
  
  const handleRunAllTests = () => {
    if (tests.filter(t => t.status === 'pending').length === 0) {
      toast({
        title: 'No Tests to Run',
        description: 'Add some tests before running',
        variant: 'destructive',
      });
      return;
    }
    
    runAllTests.mutate({});
  };
  
  return (
    <div className="space-y-6 animate-in">
      <div className="flex justify-between items-center">
        <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          Test Queue
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearTests}
            disabled={isRunning || tests.length === 0}
            className="text-xs h-8"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" />
            Clear All
          </Button>
          <Button 
            onClick={handleRunAllTests}
            disabled={isRunning || tests.filter(t => t.status === 'pending').length === 0}
            size="sm"
            className="text-xs h-8"
          >
            <Play className="h-3.5 w-3.5 mr-1" />
            Run All Tests
          </Button>
        </div>
      </div>
      
      {tests.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-lg bg-muted/5">
          <AlertCircle className="h-10 w-10 text-muted-foreground mb-2 opacity-40" />
          <h3 className="text-lg font-medium text-muted-foreground">No tests added</h3>
          <p className="text-sm text-muted-foreground max-w-md mt-1">
            Select a test type from the dropdown above and click "Add Test" to begin.
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[420px] pr-4">
          <div className="space-y-3">
            {tests.map(test => (
              <TestItem
                key={test.id}
                test={test}
                onConfigure={handleConfigureTest}
                onRemove={handleRemoveTest}
                onRun={(test) => runSingleTest.mutate(test)}
                disabled={isRunning}
              />
            ))}
          </div>
        </ScrollArea>
      )}
      
      {runSingleTest.isError && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error running the test. Please try again.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}