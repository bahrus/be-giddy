# be-giddy (🤪) 

[![Playwright Tests](https://github.com/bahrus/be-giddy/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-giddy/actions/workflows/CI.yml)
[![NPM version](https://badge.fury.io/js/be-giddy.png)](http://badge.fury.io/js/be-giddy)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-giddy?style=for-the-badge)](https://bundlephobia.com/result?p=be-giddy)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-giddy?compression=gzip">

Managing uniqueness of DOM id's is challenging, especially outside any ShadowDOM.  be-giddy auto generates such id's (and other attributes) in a predictable way. This is a userland implementation of [this proposal](https://github.com/whatwg/html/issues/11585).

However, due to the plague of [platform](https://github.com/WICG/webcomponents/issues/809) [paralysis](https://github.com/whatwg/dom/issues/533), there are significant limitations / differences:

- ID's will not be reliably reproducible, and can differ even if the html structure is the same
- Rather than adorning the parent element that contains the scoped elements that need id's generated, for 100% reliability, add the enhancement to the last child of that parent.  
- No support for inherited auto generated id "constants" from higher level tags (since don't know when fragment gets connected the live DOM tree). 

## Basic functionality

Using the canonical name:

```html
<fieldset disabled>
    <label data-for={{isHappy}}>Is Happy:</label>
    <input data-id={{isHappy}}>
    <label data-for={{isGiddy}}>Is Giddy:</label>
    <input data-id={{isGiddy}}  be-giddy>
</fieldset>
```

or in less formal environments, by referencing 🤪.js:

```html
<fieldset disabled>
    <label data-for={{isHappy}}>Is Happy:</label>
    <input data-id={{isHappy}}>
    <label data-for={{isGiddy}}>Is Giddy:</label>
    <input data-id={{isGiddy}}  🤪>
</fieldset>
```


the HTML gets modified to the following:

```html
<fieldset>
    <label for=unique-id-1>Is Happy:</label>
    <input id=unique-id-1>
    <label for=unique-id-2>Is Giddy:</label>
    <input id=unique-id-2>
</fieldset>
```

To find the 🤪 on windows, type flying window + . and search for zany.

## Advanced functionality


```html
<fieldset disabled  data-id={{bar}}>
    <label data-for={{foo}}>foo:</label>
    <input 
        class=my-class 
        part=my-part 
        type=checkbox 
        data-id="{{@|%.# foo}}">
    <template defer-be-switched be-switched="on when #{{foo}}" 🤪>
        foo is checked
    </template>
</fieldset>
```

generates:

```html
<fieldset data-id=bar id="some-other-unique-id">
    <label for="some-unique-id">foo:</label>
    <input 
        name=foo 
        itemprop=foo 
        class="my-class foo" 
        part="my-part foo"  
        type=checkbox 
        data-id=foo
        id="some-unique-id">
    <template be-switched="on when #some-unique-id">
        foo is checked
    </template>
</fieldset>
```

## Super advanced functionality

If a tag name is unique within the scope of a be-giddy id generation, then it can be used to reference by name as follows:

```html
<fieldset disabled>
    <label data-for={{input}}>foo:</label>
    <input # type=checkbox>
    <template defer-be-switched be-switched="on when #{{input}}" 🤪>
        foo is checked
    </template>
</fieldset>
```

generates:

```html
<fieldset>
    <label data-for=my-unique-id>foo:</label>
    <input id=my-unique-id data-id=input>
    <template defer-be-switched be-switched="on when #my-unique-id" 🤪>
        foo is checked
    </template>
</fieldset>
```

## Super duper advanced functionality

```html
<fieldset disabled>
    <label data-for={{input}}>foo:</label>
    <input #=@|.% type=checkbox>
    <template defer-be-switched be-switched="on when #{{input}}" 🤪>
        foo is checked
    </template>
</fieldset>
```

generates:

```html
<fieldset>
    <label data-for=my-unique-id>foo:</label>
    <input id=my-unique-id data-id=input name=input class=input part=input type=checkbox>
    <template defer-be-switched be-switched="on when #my-unique-id" 🤪>
        foo is checked
    </template>
</fieldset>
```

## Viewing Locally

Any web server that serves static files (html, css, js) will do but...

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Install Python 3 or later
5.  Open command window to folder where you cloned this repo.
6.  > npm install
7.  > npm run serve
8.  Open http://localhost:8000/demo in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-giddy/be-giddy.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-giddy';
</script>
```
