# benchttp desktop

## About

The Benchttp desktop app is a GUI for [benchttp/engine](https://github.com/benchttp/engine#readme).

## Installation

Download from release (when it is ready).

Or build from source (see below).

## Development

### IDE Configuration

For an optimal developping experience, [use the workspace version of Typescript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript). This allows typescript-plugin-css-modules to autocomplete SCSS class names.

### Prerequisites

Node.js, Rust and Tauri. Follow [this guide](https://tauri.app/v1/guides/getting-started/prerequisites/) to set up Tauri environment.

Install dependencies.

```sh
npm install
```

The app requires `benchttp/engine` embedded as a [sidecar](https://tauri.app/v1/guides/building/sidecar).
The dependency is vendored in this repository (`vendor/engine`) as a [git submodule](https://github.blog/2016-02-01-working-with-submodules/), so you don't need to install it separately.

Make sure you have the submodule initialized before proceeding.

```sh
# If you cloned the repository without the --recursive flag
git submodule update --init
# Or if you're cloning for the first time
git clone --recursive https://github.com/benchttp/desktop.git
```

Build `benchttp/engine` as a server (package `cmd/server`):

```sh
npm run sidecar:build
# build output is in src-tauri/bin/benchttp-server
```

Note: script `sidecar:build` is run inside scripts `predev` and `prebuild`.

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
npm run sidecar:run
```

### Build

```sh
npm run build
```

Bundles are available at `./src-tauri/target/release/bundle`.

### Update `vendor/engine` submodule

To keep `benchttp/engine` updated, run:

```sh
npm run sidecar:update
```

This will update `vendor/engine` submodule to the latest version of the default branch.

Commit the changes if needed:

```sh
git add vendor/engine
git commit -m "ci: update engine submodule"
```
