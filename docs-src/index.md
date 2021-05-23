---
layout: page.11ty.cjs
title: <gx-number-format> ⌲ Home
---

# &lt;gx-number-format>

`<gx-number-format>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<gx-number-format>` is just an HTML element. You can it anywhere you can use HTML!

```html
<gx-number-format></gx-number-format>
```

  </div>
  <div>

<gx-number-format></gx-number-format>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<gx-number-format>` can be configured with attributed in plain HTML.

```html
<gx-number-format name="HTML"></gx-number-format>
```

  </div>
  <div>

<gx-number-format name="HTML"></gx-number-format>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<gx-number-format>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;gx-number-format&gt;</h2>
    <gx-number-format .name=${name}></gx-number-format>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;gx-number-format&gt;</h2>
<gx-number-format name="lit-html"></gx-number-format>

  </div>
</section>
