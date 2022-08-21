# benchttp desktop

## About

The Benchttp desktop app is a GUI for [benchttp/engine](https://github.com/benchttp/engine#readme).

## Installation

Download from release (when it is ready).

Or build from source (see below).

## Development

### Prerequisites

Node.js, Rust and Tauri. Follow [this guide](https://tauri.app/v1/guides/getting-started/prerequisites/) to set up Tauri environment.

Install dependencies.

```sh
npm install
```

The app requires `benchttp/engine` embedded as a [sidecar](https://tauri.app/v1/guides/building/sidecar).

Build `benchttp/engine` as a server (package `cmd/server`) and move the binary targeting the correct platform inside `./src-tauri/bin` under the name `benchttp-server`:

```sh
GOOS=<target_os> GOARCH=<target_arch> go build -o ./desktop/src-tauri/bin/benchttp-server ./engine/cmd/server
```

Tauri asks for the binary to be suffixed with the `-$TARGET_TRIPLE` for the platform. Rename the binary according to your platform:

```sh
npm run sidecar:mv
# src-tauri/bin/benhttp-server -> src-tauri/bin/benhttp-server-x86_64-apple-darwin
```

Note: `npm run sidecar:mv` is run via scripts `predev` and `prebuild`.

### Serve the app

```sh
npm run dev
```

### Serve for the browser

When running in the browser (i.e. not in the Tauri app window), Tauri APIs are not available. API `@tauri-apps/api/shell` cannot be used to interact with a sidecar program. Instead, run the engine on a local server.

```sh
# start the dev server
npm run web:dev
```

```sh
# start the engine in another terminal
npm run sidecar:exec
```

### Build

```sh
npm run build
```

Bundles are available at `./src-tauri/target/release/bundle`.
