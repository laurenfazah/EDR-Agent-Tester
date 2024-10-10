# EDR Agent Tester

This program is designed to simulate various system activities that might occur on a computer, such as creating files, modifying files, and starting processes. These activities are intended to mimic the actions that real applications might take. The goal is to test and validate that the logs from an EDR agent match the logs from this program when run side-by-side.

## Setup

Clone and cd into repository, then run the following:
* Install modules using `npm install`
* Compile TypeScript using `npx tsc`
* Run the simulation using `node dist/index.js <args>`. For example, `node dist/index.js https://example.com`
