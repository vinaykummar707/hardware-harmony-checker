
// import { Test, TestStatus } from '@/store/testStore';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000/api'; 

// // Update this with your actual API endpoint

// export const testDefinitions: TestDefinition[] = [
//   {
//     id: 'led_sequence',
//     name: 'LED Sequence Test',
//     url: '/ledtest',
//     description: 'Tests LED sequences with configurable patterns and speeds',
//     parameters: [
//       {
//         key: 'pattern',
//         label: 'LED Pattern',
//         type: 'select',
//         description: 'The pattern to display on the LEDs',
//         defaultValue: 'sequence',
//         options: [
//           { value: 'sequence', label: 'Sequential' },
//           { value: 'alternate', label: 'Alternating' },
//           { value: 'random', label: 'Random' },
//           { value: 'pulse', label: 'Pulsing' }
//         ]
//       },
//       {
//         key: 'speed',
//         label: 'Animation Speed (ms)',
//         type: 'number',
//         description: 'The speed at which the pattern should animate',
//         defaultValue: 500,
//         min: 100,
//         max: 2000
//       },
//       {
//         key: 'repeat',
//         label: 'Repeat Count',
//         type: 'number',
//         description: 'How many times to repeat the pattern',
//         defaultValue: 3,
//         min: 1,
//         max: 10
//       }
//     ],
//     defaultPayload: {
//       pattern: 'sequence',
//       speed: 500,
//       repeat: 3
//     }
//   },
//   // Add more test definitions here
// ];

// export const runTest = async (test: Test): Promise<Test> => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/tests/${test.type}`, {
//       config: test.config,
//       testId: test.id
//     });

//     // Assuming the API returns the test result in this format
//     const result = {
//       ...test,
//       status: response.data.status as TestStatus,
//       progress: 100,
//       duration: response.data.duration,
//       result: response.data.message
//     };

//     return result;
//   } catch (error) {
//     // Handle API errors
//     return {
//       ...test,
//       status: 'failed',
//       progress: 100,
//       duration: 0,
//       result: error instanceof Error ? error.message : 'Test failed due to API error'
//     };
//   }
// };

// // ... rest of the existing code remains unchanged ...

// // Mock test execution function
// // export const runTest = async (test: Test): Promise<Test> => {
// //   // Simulate API call with a delay based on test type
// //   const minDelay = 1000;
// //   const maxDelay = 5000;
  
// //   // Different tests take different amounts of time
// //   const delays: Record<string, number> = {
// //     'led': getRandomDelay(minDelay, maxDelay * 0.8),
// //     'display': getRandomDelay(minDelay, maxDelay),
// //     'hardware': getRandomDelay(minDelay * 1.2, maxDelay * 1.2),
// //     'network': getRandomDelay(minDelay * 0.8, maxDelay * 1.5),
// //     'battery': getRandomDelay(minDelay * 1.5, maxDelay * 1.2),
// //     'default': getRandomDelay(minDelay, maxDelay),
// //   };
  
// //   const delay = delays[test.type] || delays.default;
  
// //   // Create a promise that updates progress periodically
// //   return new Promise((resolve) => {
// //     const updateInterval = 100; // Update every 100ms
// //     let elapsed = 0;
    
// //     const interval = setInterval(() => {
// //       elapsed += updateInterval;
// //       const progress = Math.min(Math.floor((elapsed / delay) * 100), 99);
      
// //       // If we're done, clear the interval
// //       if (elapsed >= delay) {
// //         clearInterval(interval);
        
// //         // 85% success rate
// //         const success = Math.random() > 0.15;
// //         const status: TestStatus = success ? 'completed' : 'failed';
        
// //         const result = {
// //           ...test,
// //           status,
// //           progress: 100,
// //           duration: delay / 1000,
// //           result: success 
// //             ? getSuccessMessage(test.type) 
// //             : getFailureMessage(test.type)
// //         };
        
// //         resolve(result);
// //       }
// //     }, updateInterval);
// //   });
// // };

// // Helper function to get a random delay
// const getRandomDelay = (min: number, max: number): number => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// // Helper function to get a success message based on test type
// const getSuccessMessage = (type: string): string => {
//   const messages: Record<string, string[]> = {
//     'led': [
//       'LED brightness optimal',
//       'LED response time within normal range',
//       'Color calibration successful'
//     ],
//     'display': [
//       'Display rendering correctly',
//       'Resolution test passed',
//       'Refresh rate within specifications'
//     ],
//     'hardware': [
//       'All hardware components operational',
//       'Temperature within normal range',
//       'CPU/GPU diagnostics passed'
//     ],
//     'network': [
//       'Network connection stable',
//       'Bandwidth test successful',
//       'Latency within acceptable range'
//     ],
//     'battery': [
//       'Battery health at optimal level',
//       'Charging circuit operational',
//       'Power management test passed'
//     ],
//     'default': [
//       'Test completed successfully',
//       'All parameters within normal range',
//       'No issues detected'
//     ]
//   };
  
//   const typeMessages = messages[type] || messages.default;
//   return typeMessages[Math.floor(Math.random() * typeMessages.length)];
// };

// // Helper function to get a failure message based on test type
// const getFailureMessage = (type: string): string => {
//   const messages: Record<string, string[]> = {
//     'led': [
//       'LED brightness below threshold',
//       'Inconsistent LED response time',
//       'Color calibration failed'
//     ],
//     'display': [
//       'Display rendering artifacts detected',
//       'Resolution test failed',
//       'Refresh rate below specifications'
//     ],
//     'hardware': [
//       'Hardware component failure detected',
//       'Temperature exceeds normal range',
//       'CPU/GPU diagnostic failure'
//     ],
//     'network': [
//       'Network connection unstable',
//       'Bandwidth below minimum threshold',
//       'Latency exceeds acceptable range'
//     ],
//     'battery': [
//       'Battery health below acceptable level',
//       'Charging circuit malfunction',
//       'Power management test failed'
//     ],
//     'default': [
//       'Test failed',
//       'Parameters outside normal range',
//       'Issues detected during testing'
//     ]
//   };
  
//   const typeMessages = messages[type] || messages.default;
//   return typeMessages[Math.floor(Math.random() * typeMessages.length)];
// };

// // Test types
// export const TEST_TYPES = [
//   { id: 'led', name: 'LED Test' },
//   { id: 'display', name: 'Display Test' },
//   { id: 'hardware', name: 'Hardware Health' },
//   { id: 'network', name: 'Network Test' },
//   { id: 'battery', name: 'Battery Test' }
// ];

// // Function to generate a unique ID
// export const generateId = (): string => {
//   return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
// };

// // Function to generate a new test with default configuration
// export const createDefaultTest = (type: string, name: string): Test => {
//   // Default configurations for different test types
//   const configs: Record<string, any> = {
//     'led': { brightness: 80 },
//     'display': { text: 'Hello World' },
//     'hardware': { duration: 30 },
//     'network': { address: '192.168.1.1', port: '8080' },
//     'battery': { voltage: 3.7, current: 500, frequency: 60 },
//     'default': {}
//   };
  
//   return {
//     id: generateId(),
//     type,
//     name,
//     status: 'pending',
//     config: configs[type] || configs.default,
//     progress: 0
//   };
// };
import { Test, TestStatus } from '@/store/testStore';
import axios from 'axios';
import { TestDefinition } from '@/types/test';

const API_BASE_URL = 'http://127.0.0.1:5000';

export const testDefinitions: TestDefinition[] = [
  {
    id: 'device_control',
    name: 'Device Control Test',
    url: '/ledtest',
    description: 'Tests Device Control',
    parameters: [
      // {
      //   key: 'address',
      //   label: 'Address of the Board',
      //   type: 'select',
      //   description: 'The pattern to display on the LEDs',
      //   defaultValue: 'sequence',
      //   options: [
      //     { value: 'sequence', label: 'Sequential' },
      //     { value: 'alternate', label: 'Alternating' },
      //     { value: 'random', label: 'Random' },
      //     { value: 'pulse', label: 'Pulsing' }
      //   ]
      // },
      {
        key: 'address',
        label: 'Address of the Board',
        type: 'text',
        description: '',
        defaultValue: '41',
  
      },
      {
        key: 'board_type',
        label: 'Board Type',
        type: 'text',
        description: '',
        defaultValue: 'F',
  
      },
      {
        key: 'command',
        label: 'Command',
        type: 'text',
        description: 'Description',
        defaultValue: '20',
       
      },
      {
        key: 'serial_number',
        label: 'Serial Number',
        type: 'text',
        description: 'Serial Number',
        defaultValue: '1234567890',
       
      },
      {
        key: 'width',
        label: 'Width',
        type: 'text',
        description: 'Width',
        defaultValue: '90',
       
      },
    ],
    defaultPayload: {
      pattern: 'sequence',
      speed: 500,
      repeat: 3
    }
  },
  // Add more test definitions here
];

export const runTest = async (test: Test): Promise<Test> => {
  try {
    const testDef = testDefinitions.find(def => def.id === test.type);
    if (!testDef) {
      throw new Error('Invalid test type');
    }

    // Send the form values directly without wrapping in config object
    const response = await axios.post(`${API_BASE_URL}${testDef.url}`, {
      ...test.config  // Spread the config values directly
    });

    return {
      ...test,
      status: response.data.status as TestStatus,
      progress: 100,
      duration: response.data.duration,
      result: response.data.message
    };
  } catch (error) {
    return {
      ...test,
      status: 'failed',
      progress: 100,
      duration: 0,
      result: error instanceof Error ? error.message : 'Test failed due to API error'
    };
  }
};

// Function to generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Function to generate a new test with default configuration
export const createDefaultTest = (type: string, name: string): Test => {
  const testDef = testDefinitions.find(def => def.id === type);
  
  // Create a config object from the parameters' default values
  const config: Record<string, any> = {};
  
  if (testDef) {
    testDef.parameters.forEach(param => {
      config[param.key] = param.defaultValue;
    });
  }
  
  return {
    id: generateId(),
    type,
    name,
    status: 'pending',
    config: config, // Use the properly initialized config
    progress: 0
  };
};

// Export test types based on definitions
export const TEST_TYPES = testDefinitions.map(def => ({
  id: def.id,
  name: def.name
}));