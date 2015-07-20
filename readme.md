# AngularJS Arduino generator

> Yeoman generator for creating AngularJS web applications with Arduino - lets you quickly set up a project and upload it to your Arduino.

Forked from [AngularJS Full-Stack generator](https://github.com/DaftMonk/generator-angular-fullstack)

## Example project

Source code: https://github.com/lasselukkari/angular-arduino-demo

## Usage

First, you'll need to install `yo` and other required tools:
```
npm install -g yo bower grunt-cli
```

Install `generator-angular-arduino`:
```
npm install -g generator-angular-arduino
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo angular-arduino`, optionally passing an app name:
```
yo angular-arduino [app-name]
```

Run `grunt` for building + uploading, `grunt serve` for ui preview. See generated grunt file for more available tasks.

## Prerequisites

* Arduino IDE 1.6.5 or later
* aWOT - Download [aWOT](https://github.com/lasselukkari/aWOT) either to your Arduino libraries folder or copy the .h and .cpp files to the server directory.

## Supported Configurations

**Client**

* Scripts: `JavaScript`, `CoffeeScript`, `Babel`
* Markup:  `HTML`, `Jade`
* Stylesheets: `CSS`, `Stylus`, `Sass`, `Less`,
* Angular Routers: `ngRoute`, `ui-router`

**Server**

* Platform presets: `Uno`, `Mega`, `Due`, `ESP8266`

Custom platform options can be set manually.

Also tested on Teensy 3.1 with the WIZ820io but the project has to be uploaded manually using the IDE.

Àrduino Uno is barely usable. On Uno the example project consumes almost all available memory resources. Remove Serial lib to free some space.

## Injection

A grunt task looks for new files in your `client/app` and `client/components` folder and automatically injects them in the appropriate places based on an injection block.

* `less` files into `client/app.less`
* `scss` files into `client/app.scss`
* `stylus` files into `client/app.styl`
* `css` files into `client/index.html`
* `js` files into `client/index.html`
* `coffeescript` temp `js` files into `client/index.html`
* `babel` temp `js` files into `client/index.html`

## Generators

Available generators:

* App
    - [angular-arduino](#app) (aka [angular-arduino:app](#app))
* Server Side
    - [angular-arduino:endpoint](#endpoint)
* Client Side
    - [angular-arduino:route](#route)
    - [angular-arduino:controller](#controller)
    - [angular-arduino:filter](#filter)
    - [angular-arduino:directive](#directive)
    - [angular-arduino:service](#service)
    - [angular-arduino:provider](#service)
    - [angular-arduino:factory](#service)
    - [angular-arduino:decorator](#decorator)

### App
Sets up a new AngularJS + aWOT app, generating all the boilerplate you need to get started.

Example:
```bash
yo angular-arduino
```

### Endpoint
Generates a new API endpoint.


Example:
```bash
yo angular-arduino:endpoint message
[?] What will the url of your endpoint be? /api/messages
```

Produces:

    server/message.router.js
    server/message.controller.js

### Route
Generates a new route.

Example:
```bash
yo angular-arduino:route myroute
[?] Where would you like to create this route? client/app/
[?] What will the url of your route be? /myroute
```

Produces:

    client/app/myroute/myroute.js
    client/app/myroute/myroute.controller.js
    client/app/myroute/myroute.controller.spec.js
    client/app/myroute/myroute.html
    client/app/myroute/myroute.scss


### Controller
Generates a controller.

Example:
```bash
yo angular-arduino:controller user
[?] Where would you like to create this controller? client/app/
```

Produces:

    client/app/user/user.controller.js
    client/app/user/user.controller.spec.js

### Directive
Generates a directive.

Example:
```bash
yo angular-arduino:directive myDirective
[?] Where would you like to create this directive? client/app/
[?] Does this directive need an external html file? Yes
```

Produces:

    client/app/myDirective/myDirective.directive.js
    client/app/myDirective/myDirective.directive.spec.js
    client/app/myDirective/myDirective.html
    client/app/myDirective/myDirective.scss

**Simple directive without an html file**

Example:
```bash
yo angular-arduino:directive simple
[?] Where would you like to create this directive? client/app/
[?] Does this directive need an external html file? No
```

Produces:

    client/app/simple/simple.directive.js
    client/app/simple/simple.directive.spec.js

### Filter
Generates a filter.

Example:
```bash
yo angular-arduino:filter myFilter
[?] Where would you like to create this filter? client/app/
```

Produces:

    client/app/myFilter/myFilter.filter.js
    client/app/myFilter/myFilter.filter.spec.js

### Service
Generates an AngularJS service.

Example:
```bash
yo angular-arduino:service myService
[?] Where would you like to create this service? client/app/
```

Produces:

    client/app/myService/myService.service.js
    client/app/myService/myService.service.spec.js


You can also do `yo angular-arduino:factory` and `yo angular-arduino:provider` for other types of services.

### Decorator
Generates an AngularJS service decorator.

Example:
```bash
yo angular-arduino:decorator serviceName
[?] Where would you like to create this decorator? client/app/
```

Produces

    client/app/serviceName/serviceName.decorator.js

## Bower Components

The following packages are always installed by the [app](#app) generator:

* angular
* angular-mocks
* angular-resource
* angular-sanitize
* angular-scenario
* jquery

These packages are installed optionally depending on your configuration:

* angular-route
* angular-ui-router
* angular-bootstrap
* bootstrap

In index.html all dependencies are linked from CDN. Bower components are installed locally as a dev dependencies for running tests.

You can install bower components as normal dependencies but this will consume lots of valuable software memory.

## Configuration
Yeoman generated projects can be further tweaked according to your needs by modifying project files appropriately.

A `.yo-rc` file is generated for helping you copy configuration across projects, and to allow you to keep track of your settings. You can change this as you see fit.

## Testing

Running `grunt test` will run the client tests with karma and mocha.

## Project Structure

Overview

    ├── client
    │   ├── app                 - All of our app specific components go in here
    │   ├── assets              - Custom assets: fonts, images, etc…
    │   └── components          - Our reusable components, non-specific to to our app
    │
    └── server
        └── server.ino          - Our main server Arduino sketch

An example client component in `client/app`

    main
    ├── main.js                 - Routes
    ├── main.controller.js      - Controller for our main route
    ├── main.controller.spec.js - Test
    ├── main.html               - View
    └── main.less               - Styles

An example server component in `server`

    ├── thing.route.ino         - Routes
    └── thing.controller.ino    - Controller for our `thing` endpoint

## Contribute

See the [contributing docs](https://github.com/lasselukkari/generator-angular-arduino/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

When submitting a PR, make sure that the commit messages match the [AngularJS conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/).

When submitting a bugfix, try to write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.

See the `travis.yml` for configuration required to run tests.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
