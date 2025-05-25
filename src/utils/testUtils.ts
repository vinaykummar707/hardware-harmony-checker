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
		"id": "WRITEFBADDRESS",
		"name": "WRITE FB ADDRESS",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "write address",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "write address",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "20"
			},
			{
				"key": "width",
				"label": "width",
				"type": "text",
				"description": "Description",
				"defaultValue": "90"
			},
			{
				"key": "board_type",
				"label": "board type",
				"type": "text",
				"description": "board_type",
				"defaultValue": "F"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "Width",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITERBADDRESS",
		"name": "WRITE RB ADDRESS",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "write address",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "20"
			},
			{
				"key": "width",
				"label": "width",
				"type": "text",
				"description": "Description",
				"defaultValue": "90"
			},
			{
				"key": "board_type",
				"label": "board type",
				"type": "text",
				"description": "board_type",
				"defaultValue": "R"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "Width",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITESBADDRESS",
		"name": "WRITE SB ADDRESS",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "write address",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "20"
			},
			{
				"key": "width",
				"label": "width",
				"type": "text",
				"description": "Description",
				"defaultValue": "90"
			},
			{
				"key": "board_type",
				"label": "board type",
				"type": "text",
				"description": "board_type",
				"defaultValue": "S"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "Width",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITEIBADDRESS",
		"name": "WRITE IB ADDRESS",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "write address",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "20"
			},
			{
				"key": "width",
				"label": "width",
				"type": "text",
				"description": "Description",
				"defaultValue": "90"
			},
			{
				"key": "board_type",
				"label": "board type",
				"type": "text",
				"description": "board_type",
				"defaultValue": "I"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "Width",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "READFBADDRESS",
		"name": "READ FB ADDRESS",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "read address",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "10"
			},
			{
				"key": "board_type",
				"label": "board type",
				"type": "text",
				"description": "board_type",
				"defaultValue": "F"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "READRBADDRESS",
		"name": "READ RB ADDRESS",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "read address",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "10"
			},
			{
				"key": "board_type",
				"label": "board type",
				"type": "text",
				"description": "board_type",
				"defaultValue": "R"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "READSBADDRESS",
		"name": "READ SB ADDRESS",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "read address",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "10"
			},
			{
				"key": "board_type",
				"label": "board type",
				"type": "text",
				"description": "board_type",
				"defaultValue": "S"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "READIBADDRESS",
		"name": "READ IB ADDRESS",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "read address",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "10"
			},
			{
				"key": "board_type",
				"label": "board type",
				"type": "text",
				"description": "board_type",
				"defaultValue": "I"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITEFBAUTOINTENSITY",
		"name": "WRITE FB AUTO INTENSITY ",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "write auto intensity",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "80"
			},
			{
				"key": "mode",
				"label": "mode",
				"type": "text",
				"description": "Description",
				"defaultValue": "A"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITERBAUTOINTENSITY",
		"name": "WRITE RB ADDRESS",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "write auto intensity",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "80"
			},
			{
				"key": "mode",
				"label": "mode",
				"type": "text",
				"description": "Description",
				"defaultValue": "A"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITESBAUTOINTENSITY",
		"name": "WRITE SB AUTO INTENSITY ",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "write auto intensity",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "80"
			},
			{
				"key": "mode",
				"label": "mode",
				"type": "text",
				"description": "Description",
				"defaultValue": "A"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITEIBAUTOINTENSITY",
		"name": "WRITE IB AUTO INTENSITY ",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "write auto intensity",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "80"
			},
			{
				"key": "mode",
				"label": "mode",
				"type": "text",
				"description": "Description",
				"defaultValue": "A"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITEFBMANUALINTENSITY",
		"name": "WRITE FB MANUAL INTENSITY ",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "write manual intensity",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "80"
			},
			{
				"key": "mode",
				"label": "mode",
				"type": "text",
				"description": "Description",
				"defaultValue": "M"
			},
			{
				"key": "value",
				"label": "value",
				"type": "text",
				"description": "Description",
				"defaultValue": "80"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITERBMANUALINTENSITY",
		"name": "WRITE RB MANUAL INTENSITY ",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "write manual intensity",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "80"
			},
			{
				"key": "mode",
				"label": "mode",
				"type": "text",
				"description": "Description",
				"defaultValue": "M"
			},
			{
				"key": "value",
				"label": "value",
				"type": "text",
				"description": "Description",
				"defaultValue": "10"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITESBMANUALINTENSITY",
		"name": "WRITE SB MANUAL INTENSITY ",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "write manual intensity",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "80"
			},
			{
				"key": "mode",
				"label": "mode",
				"type": "text",
				"description": "Description",
				"defaultValue": "M"
			},
			{
				"key": "value",
				"label": "value",
				"type": "text",
				"description": "Description",
				"defaultValue": "30"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITEIBMANUALINTENSITY",
		"name": "WRITE IB MANUAL INTENSITY ",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "write manual intensity",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "80"
			},
			{
				"key": "mode",
				"label": "mode",
				"type": "text",
				"description": "Description",
				"defaultValue": "M"
			},
			{
				"key": "value",
				"label": "value",
				"type": "text",
				"description": "Description",
				"defaultValue": "80"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "READFBINTENSITY",
		"name": "READ FB ADDRESS",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "read intensity",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "81"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "READRBINTENSITY",
		"name": "READ RB ADDRESS",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "read intensity",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "81"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "READSBINTENSITY",
		"name": "READ SB ADDRESS",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "read intensity",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "81"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "READIBINTENSITY",
		"name": "READ IB ADDRESS",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "read intensity",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "81"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "FRONTBOARDLINKCHECK",
		"name": "FRONT BOARD LINK CHECK",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "link check",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "70"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "REARBOARDLINKCHECK",
		"name": "REAR BOARD LINK CHECK",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "link check",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "70"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "SIDEBOARDLINKCHECK",
		"name": "SIDE BOARD LINK CHECK",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "link check",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "70"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "INTERNALBOARDLINKCHECK",
		"name": "INTERNAL BOARD LINK CHECK",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "link check",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "70"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "FRONTBOARDRESET",
		"name": "FRONT BOARD RESET",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "reset",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "30"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "REARBOARDRESET",
		"name": "REAR BOARD RESET",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "reset",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "30"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "SIDEBOARDRESET",
		"name": "SIDE BOARD RESET",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "reset",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "30"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "INTERNALBOARDRESET",
		"name": "INTERNAL BOARD RESET",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "reset",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "30"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "FRONTBOARDDELETE",
		"name": "FRONT BOARD DELETE",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "delete",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "90"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "REARBOARDDELETE",
		"name": "REAR BOARD DELETE",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "delete",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "90"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "SIDEBOARDDELETE",
		"name": "SIDE BOARD DELETE",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "delete",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "90"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "INTERNALBOARDDELETE",
		"name": "INTERNAL BOARD DELETE",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "delete",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "90"
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITEFRONTBOARDROUTEDATA",
		"name": "WRITE FRONT BOARD ROUTE DATA ",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "route data",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "60 "
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITEREARBOARDROUTEDATA",
		"name": "WRITE REAR BOARD ROUTE DATA ",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "route data",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "60 "
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITESIDEBOARDROUTEDATA",
		"name": "WRITE SIDE BOARD ROUTE DATA ",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "route data",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "60 "
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "WRITEINTERNALBOARDROUTEDATA",
		"name": "WRITE INTERNAL BOARD ROUTE DATA ",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "route data",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "60 "
			},
			{

				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "FRONTBOARDCOLUMNTEST",
		"name": " FRONT BOARD COLUMN TEST ",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "45"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "REARBOARDCOLUMNTEST",
		"name": " REAR BOARD COLUMN TEST ",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "45"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "SIDEBOARDCOLUMNTEST",
		"name": " SIDE BOARD COLUMN TEST ",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "45"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "INTERNALBOARDCOLUMNTEST",
		"name": " INTERNAL BOARD COLUMN TEST ",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "45"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "FRONTBOARDROWWISETEST",
		"name": " FRONT BOARD ROW WISE TEST ",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "46"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "REARBOARDROWWISETEST",
		"name": " REAR BOARD ROW WISE TEST ",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "46"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "SIDEBOARDROWWISETEST",
		"name": " SIDE BOARD ROW WISE TEST ",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "46"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "INTERNALBOARDROWWISETEST",
		"name": " INTERNAL BOARD ROW WISE TEST ",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "46"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "FRONTBOARDFLASHINGIC",
		"name": " FRONT BOARD FLASHING IC ",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "47"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "REARBOARDFLASHINGIC",
		"name": " REAR BOARD FLASHING IC ",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "47"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "SIDEBOARDFLASHINGIC",
		"name": " SIDE BOARD FLASHING IC ",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "45"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "INTERNALBOARDFLASHINGIC",
		"name": " INTERNAL BOARD FLASHING IC ",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "45"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "FRONTBOARDFLASHINGBOARD",
		"name": " FRONT BOARD FLASHING BOARD ",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "48"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "REARBOARDFLASHINGBOARD",
		"name": " REAR BOARD FLASHING BOARD ",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "48"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "SIDEBOARDFLASHINGBOARD",
		"name": " SIDE BOARD FLASHING BOARD ",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "48"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "INTERNALBOARDFLASHINGBOARD",
		"name": " INTERNAL BOARD FLASHING BOARD ",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "48"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "FRONTBOARDFLASHINGENTIREBOARD",
		"name": " FRONT BOARD FLASHING ENTIRE BOARD ",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "49"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "REARBOARDFLASHINGENTIREBOARD",
		"name": " REAR BOARD FLASHING ENTIRE BOARD ",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "49"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "SIDEBOARDFLASHINGENTIREBOARD",
		"name": " SIDE BOARD FLASHING ENTIRE BOARD ",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "49"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "INTERNALBOARDFLASHINGENTIREBOARD",
		"name": " INTERNAL BOARD FLASHING ENTIRE BOARD ",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "49"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "FRONTBOARDTESTALL",
		"name": " FRONT BOARD TEST ALL ",
		"boardType": "FB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "41"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "50"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "REARBOARDTESTALL",
		"name": " REAR BOARD TEST ALL ",
		"boardType": "RB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "42"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "50"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "SIDEBOARDTESTALL",
		"name": " SIDE BOARD TEST ALL ",
		"boardType": "SB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "43"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "50"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}, {
		"id": "INTERNALBOARDTESTALL",
		"name": " INTERNAL BOARD TEST ALL ",
		"boardType": "IB",
		"url": "/deviceControl",
		"description": "test",
		"parameters": [
			{
				"key": "address",
				"label": "Address of the Board",
				"type": "text",
				"description": "",
				"defaultValue": "44"
			},
			{
				"key": "command",
				"label": "Command",
				"type": "text",
				"description": "",
				"defaultValue": "40"
			},
			{
				"key": "test_command",
				"label": "Test Command",
				"type": "text",
				"description": "",
				"defaultValue": "50"
			},
			{
				"key": "test_type",
				"label": "Test Type",
				"type": "text",
				"description": "",
				"defaultValue": "pcb"
			},
			{
				"key": "serial_number",
				"label": "Serial Number",
				"type": "text",
				"description": "serial number",
				"defaultValue": "12345"
			}
		],
		"defaultPayload": {
		}
	}
];

export const runTest = async (test: Test): Promise<Test> => {
	try {
		const testDef = testDefinitions.find((def) => def.id === test.type);
		if (!testDef) {
			throw new Error('Invalid test type');
		}

		const response = await axios.post(`${API_BASE_URL}${testDef.url}`, {
			...test.config,
		});

		return {
			...test,
			status: response.data.status ? 'completed' : ('failed' as TestStatus),
			progress: 100,
			duration: 0,
			result: response.data.output,
		};
	} catch (error) {
		return {
			...test,
			status: 'failed',
			progress: 100,
			duration: 0,
			result:
				error instanceof Error ? error.message : 'Test failed due to API error',
		};
	}
};

// Function to generate a unique ID
export const generateId = (): string => {
	return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// Function to generate a new test with default configuration
export const createDefaultTest = (type: string, name: string): Test => {
	const testDef = testDefinitions.find((def) => def.id === type);

	// Create a config object from the parameters' default values
	const config: Record<string, any> = {};

	if (testDef) {
		testDef.parameters.forEach((param) => {
			config[param.key] = param.defaultValue;
		});
	}

	return {
		id: generateId(),
		type,
		name,
		status: 'pending',
		config: config, // Use the properly initialized config
		progress: 0,
	};
};

// Export test types based on definitions
export const TEST_TYPES = testDefinitions.map((def) => ({
	id: def.id,
	name: def.name,
}));
