# Angular 2 + Webpack + SASS + i18n

Angular 2 boilerplate using Webpack, SASS and Angular's i18n package, created following Angular [Webpack introduction guide](https://angular.io/docs/ts/latest/guide/webpack.html) and the [Internationalization Guide](https://angular.io/docs/ts/latest/cookbook/i18n.html) adjusted to work with webpack instead of SystemJS.

## Setup
```BASH
yarn          # Install dependencies
yarn start    # Run development server
yarn i18n     # Creates the translation source file messages.xlf
```

## Build
```
yarn build
```

## Testing

```BASH
yarn test # Run tests with karma.
```

### Image paths
I added a path preset in both the html and sass loaders in the webpack configuration so that all the template and style files use the same absolute path no matter where they may be located inside the application structure.

Examples:
```HTML
<img src="/images/image.png" alt="My image" />
<!-- Avoding the use of a path with the form ../../../assets/images/image.png
-->
```

```CSS
/* SASS or CSS file */
.my-class {
  background-image: url('/images/background.png');
}
```