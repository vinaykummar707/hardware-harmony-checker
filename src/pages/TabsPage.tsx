import { TestSelection } from '@/components/TestSelection';
import { TestStats } from '@/components/TestStats';
import { TestExecution } from '@/components/TestExecution';
import { TestConfigModal } from '@/components/TestConfig';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
import Index from './Index';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const TabsPAge = () => {
    const BOARD_TYPES = [
        { value: 'FB', label: 'Front Board' },
        { value: 'SB', label: 'Side Board' },
        { value: 'RB', label: 'Rear Board' },
        { value: 'IB', label: 'Internal Board' },
    ];
    return (
        <div className="min-h-screen ">
            <header className="bg-white   border-b sticky top-0 z-10">
                <div className="container max-w-6xl  p-4 flex items-center justify-between">
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
                        <h1 className="text-lg font-bold tracking-tight">
                            Navitronix Hardware Test Utility
                        </h1>
                    </div>
                    {/* <div className="text-sm text-muted-foreground animate-pulse-subtle">
            System ready for testing
          </div> */}
                </div>
            </header>
            <div className="container flex flex-col  max-w-6xl ">

                <div className="text-xs  py-4  uppercase tracking-wider text-muted-foreground font-medium">
                    CHOOSE BOARD TYPE
                </div>

                <Tabs defaultValue="account" className="">
                    <TabsList className="flex  mb-4  ">
                        {BOARD_TYPES.map((board) => (
                            <TabsTrigger
                                key={board.value}
                                value={board.value}
                                className="group flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:border data-[state=active]:shadow-sm"
                            >
                                {board.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <Separator />




                    <TabsContent value="FB" className="">
                        {/* <Separator /> */}


                        <Index />
                    </TabsContent>

                    <TabsContent value="SB" className="">
                        <Separator />

                        <Index />
                    </TabsContent>

                    <TabsContent value="RB" className="">
                        <Separator />

                        <Index />
                    </TabsContent>

                    <TabsContent value="IB" className="">
                        <Separator />

                        <Index />
                    </TabsContent>
                </Tabs>



                <footer className="bg-muted/30 border-t mt-auto">
                    <div className=" py-4 text-center text-sm text-muted-foreground">
                        <p>Hardware Test Suite &copy; {new Date().getFullYear()}</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default TabsPAge;
