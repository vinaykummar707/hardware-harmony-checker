
import { create } from 'zustand';

export type TestStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface TestConfig {
  brightness?: number;
  text?: string;
  duration?: number;
  port?: string;
  address?: string;
  voltage?: number;
  current?: number;
  frequency?: number;
}

export interface Test {
  id: string;
  name: string;
  type: string;
  status: TestStatus;
  config: TestConfig;
  result?: string;
  duration?: number;
  progress?: number;
}

export interface TestResults {
  passed: number;
  failed: number;
  total: number;
}

interface TestStore {
  tests: Test[];
  selectedTest: Test | null;
  results: TestResults;
  isConfigModalOpen: boolean;
  isRunning: boolean;
  addTest: (test: Test) => void;
  removeTest: (id: string) => void;
  clearTests: () => void;
  updateTest: (id: string, updates: Partial<Test>) => void;
  setSelectedTest: (test: Test | null) => void;
  setIsConfigModalOpen: (isOpen: boolean) => void;
  setIsRunning: (isRunning: boolean) => void;
}

// Helper function to get initial test results
const getInitialResults = (): TestResults => ({
  passed: 0,
  failed: 0,
  total: 0,
});

// Create the store
export const useTestStore = create<TestStore>((set) => ({
  tests: [],
  selectedTest: null,
  results: getInitialResults(),
  isConfigModalOpen: false,
  isRunning: false,
  
  addTest: (test) => set((state) => ({
    tests: [...state.tests, test],
    results: {
      ...state.results,
      total: state.results.total + 1
    }
  })),
  
  removeTest: (id) => set((state) => {
    const test = state.tests.find(t => t.id === id);
    const updatedTests = state.tests.filter(t => t.id !== id);
    
    let updatedResults = { ...state.results };
    if (test) {
      updatedResults.total = Math.max(0, state.results.total - 1);
      if (test.status === 'completed') {
        updatedResults.passed = Math.max(0, state.results.passed - 1);
      } else if (test.status === 'failed') {
        updatedResults.failed = Math.max(0, state.results.failed - 1);
      }
    }
    
    return {
      tests: updatedTests,
      results: updatedResults,
      selectedTest: state.selectedTest?.id === id ? null : state.selectedTest
    };
  }),
  
  clearTests: () => set(() => ({
    tests: [],
    results: getInitialResults(),
    selectedTest: null
  })),
  
  updateTest: (id, updates) => set((state) => {
    const updatedTests = state.tests.map(test => {
      if (test.id === id) {
        const updatedTest = { ...test, ...updates };
        return updatedTest;
      }
      return test;
    });
    
    // Update results if status changed
    let updatedResults = { ...state.results };
    if (updates.status) {
      const oldTest = state.tests.find(t => t.id === id);
      if (oldTest) {
        // Remove the old status count if it was completed or failed
        if (oldTest.status === 'completed') {
          updatedResults.passed = Math.max(0, state.results.passed - 1);
        } else if (oldTest.status === 'failed') {
          updatedResults.failed = Math.max(0, state.results.failed - 1);
        }
        
        // Add the new status count
        if (updates.status === 'completed') {
          updatedResults.passed += 1;
        } else if (updates.status === 'failed') {
          updatedResults.failed += 1;
        }
      }
    }
    
    return {
      tests: updatedTests,
      results: updatedResults,
      selectedTest: state.selectedTest?.id === id 
        ? { ...state.selectedTest, ...updates } 
        : state.selectedTest
    };
  }),
  
  setSelectedTest: (test) => set({ selectedTest: test }),
  setIsConfigModalOpen: (isOpen) => set({ isConfigModalOpen: isOpen }),
  setIsRunning: (isRunning) => set({ isRunning })
}));
