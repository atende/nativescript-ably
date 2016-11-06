# NativeScript Ably Plugin

A wrapper around ably.io libraries for Android and IOS

## Strategy

To goal is to separate API from implementation:

* **api** folder is used to common and API declarations
* **impl** folder is used to the implementation
* **ably.android.ts and ably.ios.ts** initialize the appropriated implementation for the platform
* **ably.d.ts** provide typescript definition derived from the API.

The application just need to import **nativescript-ably** module.
Example:

   import {AblyRealtime, Message, ConnectionStateChange, ConnectionState} from "nativescript-ably"

It will import the ably.js file that is generated from ably.android.ts, or ably.ios.ts. Depending on the platform

You should not:

    Import the API folder, unless you are exposing the API in a implementation
    Import the implementation folder, unless you know what you are doing :-)

**Android implemetation will be added first, while learning the API, after tests IOS will be added**

### Demo

[https://github.com/atende/nativescript-ably-demo](https://github.com/atende/nativescript-ably-demo)

### Typical development workflow:

    git clone https://github.com/atende/nativescript-ably
    git clone https://github.com/atende/nativescript-ably-demo
    cd nativescript-ably
    tsc --watch
    cd ../nativescript-ably-demo
    

1. Make changes to plugin files
2. Make changes in `demo` that would test those changes out
3. `npm run live.android` or `npm run live.ios`  **(must be run from the demo directory)**

Those `demo` tasks are just general helpers. You may want to have more granular control on the device and/or emulator you want to run. For that, you can just run things the manual way:

```
cd demo

// when developing, to ensure the latest code is built into the demo, it's a gaurantee to remove the plugin and add it back
tns plugin remove nativescript-ably // replace with your plugin name
tns plugin add ../nativescript-ably

// manual platform adds
tns platform add ios
// and/or
tns platform add android
```

Then use any of the available options from the `tns` command line:

* [Emulate your project](https://github.com/NativeScript/nativescript-cli#emulate-your-project)
* [Run your project](https://github.com/NativeScript/nativescript-cli#run-your-project)
* [Full list of commands](https://github.com/NativeScript/nativescript-cli#the-commands)
