import { TestSelection } from '@/components/TestSelection';
import { TestStats } from '@/components/TestStats';
import { TestExecution } from '@/components/TestExecution';
import { TestConfigModal } from '@/components/TestConfig';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Index = () => {
	return (
		<main className="  py-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
				<div className="col-span-12 space-y-4">
					
					<div className="inline-flex bg-white p-4 w-full rounded-lg border items-end space-x-1.5 ">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="framework">Address</Label>
							<Input type="text" className='bg-white' placeholder="Address" />
						</div>
						<div className="flex flex-col space-y-1.5  ">
							<Label htmlFor="framework">Serial Number</Label>
							<Input type="text" className='bg-white' placeholder="Address" />
						</div>
						<Button variant='secondary' className='border'>Write</Button>
						<Button variant='secondary' className='border'>Read</Button>
					</div>
					<Separator />
					<TestStats />
					<Separator />
					<TestSelection />
					<Separator />
					<TestExecution />
				</div>
				<div></div>
			</div>
			<TestConfigModal />
		</main>
	);
};

export default Index;
