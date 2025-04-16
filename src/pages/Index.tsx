
import { TestSelection } from '@/components/TestSelection';
import { TestStats } from '@/components/TestStats';
import { TestExecution } from '@/components/TestExecution';
import { TestConfigModal } from '@/components/TestConfig';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="min-h-screen">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-5 w-5 text-white"
              >
                <path d="M7 22H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" />
                <path d="M7 10V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6" />
                <path d="M12 16v3" />
                <path d="M8 22V19" />
                <path d="M16 22v-5" />
                <path d="M8 16h8" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold tracking-tight">Hardware Test Suite</h1>
          </div>
          <div className="text-sm text-muted-foreground animate-pulse-subtle">
            System ready for testing
          </div>
        </div>
      </header>
      
      <main className="container w-full py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="col-span-12 space-y-4">
          
            <TestStats />
            <Separator />
            <TestSelection />
            <Separator />
            <TestExecution />
          </div>
          <div>
          </div>
        </div>
      </main>
      
      <TestConfigModal />
      
      <footer className="bg-muted/30 border-t mt-auto">
        <div className="container py-4 text-center text-sm text-muted-foreground">
          <p>Hardware Test Suite &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
