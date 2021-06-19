# lit-number-format

web component to format number in an input or as a text

### Features

1. Prefix, suffix and thousand separator.
2. Custom format pattern.
3. Masking.
4. Custom formatting handler.
5. Format number in an input or format as a simple text.

### Install

Through npm
`npm install react-number-format --save`

Or get compiled development and production version from ./dist

### Usage

ES6

```js
import NumberFormat from 'react-number-format';
```

Typescript

```js
import NumberFormat from 'react-number-format';
//or
import {default as NumberFormat} from 'react-number-format';
```

In typescript you also have to enable `"esModuleInterop": true` in your tsconfig.json (https://www.typescriptlang.org/docs/handbook/compiler-options.html).

#### values object

values object is on following format

```js
{
  formattedValue: '$23,234,235.56', //value after applying formatting
  value: '23234235.56', //non formatted value as numeric string 23234235.56, if you are setting this value to state make sure to pass isNumericString prop to true
  floatValue: 23234235.56 //floating point representation. For big numbers it can have exponential syntax
}
```

Its recommended to use formattedValue / value / floatValue based on the initial state (it should be same as the initial state format) which you are passing as value prop. If you are saving the `value` key on state make sure to pass isNumericString prop to true.

### Examples

[Documentation and examples](https://anatolybur.github.io/lit-number-format/index.html)

### Notes and quirks

1. Value can be passed as string or number, but if it is passed as string it should be either formatted value or if it is a numeric string, you have to set isNumericString props to true.

2. Value as prop will be rounded to given decimal scale if format option is not provided.

3. If you want to block floating number set decimalScale to 0.

4. Use type as tel when you are providing format prop. This will change the mobile keyboard layout to have only numbers. In other case use type as text, so user can type decimal separator.

5. onChange no longer gets values object. You need to use onValueChange instead. onChange/onFocus/onBlur and other input events will be directly passed to the input.

6. Its recommended to use formattedValue / value / floatValue based on the initial state (it should be same as the initial state format) which you are passing as value prop. If you are saving the `value` key on state make sure to pass isNumericString prop to true.

7. onValueChange is not same as onChange. It gets called on whenever there is change in value which can be caused by any event like change or blur event or by a prop change. It no longer receives event object as second parameter.

## Development

### Setup

Install dependencies:

```bash
npm i
```

### Build

This sample uses the TypeScript compiler to produce JavaScript that runs in modern browsers.

To build the JavaScript version of your component:

```bash
npm run build
```

To watch files and rebuild when the files are modified, run the following command in a separate shell:

```bash
npm run build:watch
```

Both the TypeScript compiler and lit-analyzer are configured to be very strict. You may want to change `tsconfig.json` to make them less strict.

### Testing

This sample modern-web.dev's
[@web/test-runner](https://www.npmjs.com/package/@web/test-runner) along with
Mocha, Chai, and some related helpers for testing. See the
[modern-web.dev testing documentation](https://modern-web.dev/docs/test-runner/overview) for
more information.

Tests can be run with the `test` script:

```bash
npm test
```

### Dev Server

This sample uses modern-web.dev's [@web/dev-server](https://www.npmjs.com/package/@web/dev-server) for previewing the project without additional build steps. Web Dev Server handles resolving Node-style "bare" import specifiers, which aren't supported in browsers. It also automatically transpiles JavaScript and adds polyfills to support older browsers. See [modern-web.dev's Web Dev Server documentation](https://modern-web.dev/docs/dev-server/overview/) for more information.

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

There is a development HTML file located at `/dev/index.html` that you can view at http://localhost:8000/dev/index.html.

### Editing

If you use VS Code, we highly reccomend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates:

- Syntax highlighting
- Type-checking
- Code completion
- Hover-over docs
- Jump to definition
- Linting
- Quick Fixes

The project is setup to reccomend lit-plugin to VS Code users if they don't already have it installed.

### Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json` and `tsconfig.json`.

To lint the project run:

```bash
npm run lint
```

### Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Polymer Project's style. You can change this in `.prettierrc.json`.

Prettier has not been configured to run when commiting files, but this can be added with Husky and and `pretty-quick`. See the [prettier.io](https://prettier.io/) site for instructions.

### Static Site

This project includes a simple website generated with the [eleventy](11ty.dev) static site generator and the templates and pages in `/docs-src`. The site is generated to `/docs` and intended to be checked in so that GitHub pages can serve the site [from `/docs` on the master branch](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

To enable the site go to the GitHub settings and change the GitHub Pages &quot;Source&quot; setting to &quot;master branch /docs folder&quot;.</p>

To build the site, run:

```bash
npm run docs
```

To serve the site locally, run:

```bash
npm run docs:serve
```

To watch the site files, and re-build automatically, run:

```bash
npm run docs:watch
```

The site will usually be served at http://localhost:8000.

### Bundling and minification

This starter project doesn't include any build-time optimizations like bundling or minification. We recommend publishing components as unoptimized JavaScript modules, and performing build-time optimizations at the application level. This gives build tools the best chance to deduplicate code, remove dead code, and so on.

For information on building application projects that include LitElement components, see [Build for production](https://lit-element.polymer-project.org/guide/build) on the LitElement site.

### More information

See [Get started](https://lit-element.polymer-project.org/guide/start) on the LitElement site for more information.
