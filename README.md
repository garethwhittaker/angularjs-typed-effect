# AngularJS Typed Effect

This easy-to-use directive applies a (customisable) typed effect to text within an HTML element.

## Installation

1. Install with <a href="https://bower.io/" target="_blank">Bower</a> using `bower install angularjs-typed-effect --save` or clone this repository.

2. Include **dist/typed-effect.min.js** and **dist/typed-effect.min.css** in your application.

3. Add `angularJSTypedEffect` as a dependency for your AngularJS module:

```javascript
angular.module('yourAppModule', ['angularJSTypedEffect']);
```

## Usage

Insert the `typed-effect` and `text` attributes in to the required HTML element(s):

```html
<p typed-effect text="'hi there, I use a typed effect ...'"></p>
```

#### Customisation

You also have the option of setting:

- **delay** ( default: 0 ) - apply a time delay (in milliseconds) before typing begins.
- **speed** ( default: 100 ) - set the typing speed (in milliseconds).
- **cursor** ( default: | ) - choose the cursor to use.
- **blink** ( default: true ) - specify if the cursor should remain and continue to blink after typing has finished.
- **callback** ( default: n/a ) - provide a callback function to be triggered after typing has finished.

```html
<p typed-effect text="'hi there'" delay="500" speed="50" cursor="&blk14;" blink="false" callback="vm.typed()"></p>
```

## Demo

Take a look at this <a href="https://jsfiddle.net/garethwhittaker/s4phrpx2/" target="_blank">demo</a> of the typed effect and optional settings.
