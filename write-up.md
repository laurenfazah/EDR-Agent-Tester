# EDR Agent Tester

This program is a simulation tool designed to mimic common system activities, allowing testers to compare logs from this simulation with those recorded by an EDR (Endpoint Detection and Response) agent. The tool runs in Node.js and simulates various actions (such as file creation, modification, deletion, process starts and network connections), to produce activity data that an EDR agent would detect.

The program works by:
1. **Simulating System Activities**: It supports activities like starting processes, creating and modifying files, and establishing network connections, logging the process details of each action.
2. **Logging Activity Details**: Each activity logs information like the username, process name, process ID, and the command line to be used for comparison with EDR logs.
3. **Platform Compatibility**: By leveraging Node.js’s `fs`, `child_process`, and `net` modules, the program is designed to be compatible with both macOS and Linux environments.

## Approach

While I considered using Go for this project, I opted for TypeScript given my comfort and familiarity with it. If I had more time, I would have loved to build this in Go as that seems like a nice fit for this type of low-level simulation.

I began by breaking down the assignment into key activities, creating types for each one, and using Node.js’s platform-agnostic modules to maintain cross-platform compatibility. I then scaffolded placeholder functions for the required activities and implemented a simple logging system using Node.js’s `fs` module. Once the components were built, I integrated them in the `index.ts` file to run the simulation, logging each action’s details in JSON format.

I spent most of my time fleshing out the `startProcess` and `establishNetworkConnection` functions, as they involved more intricate behavior compared to the CRUD-like file operations. For the file-related functions, I focused on simplicity and practical implementation.

## Check-In and Reflections

After getting my first draft of the assignment in place, I reached out to the engineers at Red Canary for feedback. Levi's feedback and clarity were monumentally helpful, as they allowed me to gain a better understanding of the overall intention of this project, something I hadn't realized I was lacking. I had initially jumped into the assignment without fully seeing the bigger picture, thinking it would fall into place as I worked through tasks. This feedback led to major refactors and helped me land my program in a place I'm feeling good about.

## Overall

I thoroughly enjoyed this project and found it to be a well-rounded assessment. It gave me an opportunity to learn more about Red Canary’s software domain and dive deeper into low-level system concepts, which was very rewarding.
