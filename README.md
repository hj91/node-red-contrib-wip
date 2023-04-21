# node-red-contrib-wip

A Node-RED module designed to track and manage work in progress by monitoring the duration of a process through start and stop times. This module provides two custom nodes, `workInProgress` and `workInProgressDisplay`, with advanced features for precise time management and monitoring.

## Features

- Tracks the process duration by monitoring start and stop times with millisecond precision
- Provides a reset option to clear the data and prepare for the next process cycle
- Outputs data in JSON format, including start time, stop time, and duration
- Converts start and stop times into the format `dd-mm-yyyy` and `hh:mm:ss` for better readability
- Displays the output in a user-friendly message format
- Ideal for monitoring production lines, manufacturing processes, or any task that requires precise time management and tracking

## Installation

Use the following command to install the module:

```
npm install node-red-contrib-work-in-progress
```

## Usage

1. Import the `workInProgress` and `workInProgressDisplay` nodes in your Node-RED flow.
2. Connect the `workInProgress` node to the input nodes that send start_time, stop_time, set, and reset signals.
3. Connect the output of the `workInProgress` node to the `workInProgressDisplay` node.
4. Configure the input nodes to send signals with the appropriate topics (start_time, stop_time, set, reset) and payload values (boolean).
5. Deploy the flow, and the `workInProgressDisplay` node will output a user-friendly message with start time, stop time, and duration of the process in a human-readable format.

## Example Flow

Here is an example Node-RED flow that demonstrates the usage of the `workInProgress` node:

```json
[
    {
        "id": "c2525b09e8138171",
        "type": "tab",
        "label": "WIP",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "8bdc37ee47213adf",
        "type": "inject",
        "z": "c2525b09e8138171",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "start_time",
        "payload": "true",
        "payloadType": "bool",
        "x": 180,
        "y": 120,
        "wires": [
            [
                "8dd08805c5abb1d2"
            ]
        ]
    },
    {
        "id": "95c667e560f17f56",
        "type": "inject",
        "z": "c2525b09e8138171",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "stop_time",
        "payload": "true",
        "payloadType": "bool",
        "x": 190,
        "y": 200,
        "wires": [
            [
                "8dd08805c5abb1d2"
            ]
        ]
    },
    {
        "id": "d2447290d78acae0",
        "type": "inject",
        "z": "c2525b09e8138171",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "set",
        "payload": "true",
        "payloadType": "bool",
        "x": 170,
        "y": 300,
        "wires": [
            [
                "8dd08805c5abb1d2"
            ]
        ]
    },
    {
        "id": "c806bffd58c4e1fa",
        "type": "inject",
        "z": "c2525b09e8138171",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "reset",
        "payload": "true",
        "payloadType": "bool",
        "x": 190,
        "y": 380,
        "wires": [
            [
                "8dd08805c5abb1d2"
            ]
        ]
    },
    {
        "id": "a1abd9822ee56f06",
        "type": "debug",
        "z": "c2525b09e8138171",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": true,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "payload",
        "statusType": "auto",
        "x": 810,
        "y": 220,
        "wires": []
    },
    {
        "id": "8dd08805c5abb1d2",
        "type": "workInProgress",
        "z": "c2525b09e8138171",
        "name": "",
        "topic": "",
        "x": 600,
        "y": 220,
        "wires": [
            [
                "a1abd9822ee56f06",
                "93f125d76af4c5d5"
            ]
        ]
    },
    {
        "id": "f5902b8c0b687600",
        "type": "comment",
        "z": "c2525b09e8138171",
        "name": "Example of node-red-contrib-wip",
        "info": "Here's a simple flow using the workInProgress node to track the duration of a work process:\n\nThe boolean input can be sent with appropriate topics using industrial equipment like PLC\n\nIt is recommended to follow the input sequence of in order of start_time, stop_time, set, reset\n\n\nHarshad Joshi\n",
        "x": 260,
        "y": 60,
        "wires": []
    },
    {
        "id": "93f125d76af4c5d5",
        "type": "function",
        "z": "c2525b09e8138171",
        "name": "readable format",
        "func": "var start_time = msg.payload.start_time\nvar stop_time = msg.payload.stop_time\nvar duration = msg.payload.duration\n\nmsg.payload = \"The process was started at \"+start_time+\" and ended at \"+ stop_time+ \" and total duration of process is is \" + duration\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 320,
        "wires": [
            [
                "be195488a9e2b5f5"
            ]
        ]
    },
    {
        "id": "be195488a9e2b5f5",
        "type": "debug",
        "z": "c2525b09e8138171",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": true,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "payload",
        "statusType": "auto",
        "x": 1070,
        "y": 320,
        "wires": []
    }
]

```

## Author

Harshad Joshi

- Email: [harshad@bufferstack.io](mailto:harshad@bufferstack.io)

## License

This project is licensed under the Apache-2.0 License.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss proposed changes or report bugs.

## Support

For support, please reach out to Harshad Joshi at [harshad@bufferstack.io](mailto:harshad@bufferstack.io).
