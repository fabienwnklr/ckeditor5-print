# @fabwcie/ckeditor5-print

Add button for print ckeditor content.

This package was created by the [ckeditor5-package-generator](https://www.npmjs.com/package/ckeditor5-package-generator) package.

## Table of contents

* [Install plugin](#install)
* [Use plugin](#use)

## Install

```bash
npm install @fabwcie/ckeditor5-print
```

## Available options

| option         | type      | default   | description                         |
|--------------  |---------  |---------  |-----------------------------------  |
| injectCkeCSS   | boolean   | true      | Inject the ckeditor css for print   |
| contentCSS     | string    | undefined | Inject custom css for print         |
| srcCSS         | string    | undefined | Inject custom css file for print    |

## Use

Using module import

```typescript
import { Print } from '@fabwcie/ckeditor5-print';

ClassicEditor
  .create( document.querySelector( '#editor' ), {
    plugins: [
      Print,
      // ... other plugins
    ]
  })
  .catch( error => {
      console.error( error );
  } );
```

You can also use as simple script

Download js file here

```html
<script src="path/to/print.js"></script>

<!-- Or with CDN -->
<script src="https://cdn/@fabwcie/ckeditor5-print/print.js"></script>
```

and that all, print button appear automaticaly !
