// import { useEffect } from 'react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/select';
// import { Button } from '@/components/ui/button';
// import { useTestStore } from '@/store/testStore';
// import { TEST_TYPES, createDefaultTest } from '@/utils/testUtils';
// import { Plus } from 'lucide-react';

// export function TestSelection() {
//   const selectedType = useTestStore(state => state.selectedTestType);
//   const setSelectedTestType = useTestStore(state => state.setSelectedTestType);
//   const addTest = useTestStore((state) => state.addTest);
//   const isRunning = useTestStore((state) => state.isRunning);
//   const setIsConfigModalOpen = useTestStore((state) => state.setIsConfigModalOpen);
//   const setSelectedTest = useTestStore((state) => state.setSelectedTest);

//   // Open config modal when a test type is selected
//   useEffect(() => {
//     if (selectedType) {
//       const testType = TEST_TYPES.find(t => t.id === selectedType);
//       if (testType) {
//         const newTest = createDefaultTest(testType.id, testType.name);
//         setSelectedTest(newTest);
//         setIsConfigModalOpen(true);
//       }
//     }
//   }, [selectedType, setSelectedTest, setIsConfigModalOpen]);

//   const handleAddTest = () => {
//     const testType = TEST_TYPES.find(t => t.id === selectedType);
//     if (testType) {
//       const newTest = createDefaultTest(testType.id, testType.name);
//       addTest(newTest);
//     }
//   };

//   return (
//     <div className="space-y-4  animate-in">
//       <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
//         Test Selection
//       </div>

//       <div className="flex gap-3 items-center">
//         <Select
//           value={selectedType || ""}
//           onValueChange={setSelectedTestType}
//           disabled={isRunning}
//         >
//           <SelectTrigger className="w-[220px] bg-white shadow-sm">
//             <SelectValue placeholder="Select test type" />
//           </SelectTrigger>
//           <SelectContent>
//             {TEST_TYPES.map(type => (
//               <SelectItem
//                 key={type.id}
//                 value={type.id}
//                 className="cursor-pointer"
//               >
//                 {type.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         <Button
//           onClick={handleAddTest}
//           disabled={isRunning || !selectedType}
//           className="transition-all duration-300 hover:bg-primary/90"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Add Test
//         </Button>
//       </div>
//     </div>
//   );
// }
import { useEffect } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useTestStore } from '@/store/testStore';
import { testDefinitions, createDefaultTest } from '@/utils/testUtils';
import { Plus } from 'lucide-react';

type BoardType = string | 'FB' | 'SB' | 'RB' | 'IB';

interface IndexProps {
	selectedBoard: BoardType;
}

export function TestSelection({ selectedBoard }: IndexProps) {
	const selectedType = useTestStore((state) => state.selectedTestType);
	const setSelectedTestType = useTestStore(
		(state) => state.setSelectedTestType
	);
	const addTest = useTestStore((state) => state.addTest);
	const isRunning = useTestStore((state) => state.isRunning);
	const setIsConfigModalOpen = useTestStore(
		(state) => state.setIsConfigModalOpen
	);
	const setSelectedTest = useTestStore((state) => state.setSelectedTest);

	// Open config modal when a test type is selected
	useEffect(() => {
		if (selectedType) {
			const testDef = testDefinitions.find((t) => t.id === selectedType);
			if (testDef) {
				const newTest = createDefaultTest(testDef.id, testDef.name);
				setSelectedTest(newTest);
				setIsConfigModalOpen(true);
			}
		}
	}, [selectedType, setSelectedTest, setIsConfigModalOpen]);

	const handleAddTest = () => {
		const testDef = testDefinitions.find((t) => t.id === selectedType);
		if (testDef) {
			const newTest = createDefaultTest(testDef.id, testDef.name);
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
					value={selectedType || ''}
					onValueChange={(val) => {
						if (val === '__all__') {
							// Optional: add all tests immediately on select
							testDefinitions.forEach((def) => {
								const newTest = createDefaultTest(def.id, def.name);
								addTest(newTest);
							});

							// Clear selection after adding all (optional UX decision)
							setSelectedTestType(null);
						} else {
							setSelectedTestType(val);
						}
					}}
					disabled={isRunning}
				>
					<SelectTrigger className="w-[220px] bg-white shadow-sm">
						<SelectValue placeholder="Select test type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="__all__" className="font-semibold text-primary">
							Select All
						</SelectItem>
						{testDefinitions
							.filter((testDef) => testDef.boardType === selectedBoard)
							.map((testDef) => (
								<SelectItem
									key={testDef.id}
									value={testDef.id}
									className="cursor-pointer"
								>
									{testDef.name}
								</SelectItem>
							))}
					</SelectContent>
				</Select>

				{/* <Button
          onClick={handleAddTest}
          disabled={isRunning || !selectedType}
          className="transition-all duration-300 hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Test
        </Button> */}
			</div>
		</div>
	);
}
