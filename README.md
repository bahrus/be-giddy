# be-giddy (🤪) [TODO]

Managing uniqueness of DOM is challenging, especially outside any ShadowDOM.  be-giddy auto generates such id's (and other attributes) in a predictable way. This is a userland implementation of [this proposal](https://github.com/whatwg/html/issues/11585).

However, due to the plague of [platform](https://github.com/WICG/webcomponents/issues/809) [paralysis](https://github.com/whatwg/dom/issues/533), there are significant limitations / differences:

- ID's will not be reliably reproducible, and can differ even if the html structure is the same
- Rather than adorning the parent element that contains the scoped elements that need id's generated, for 100% reliability, add the enhancement to the last child of that parent.  
- No support for inherited auto generated id "constants" from higher level tags (since don't know when fragment gets connected the live DOM tree). 



## Basic functionality

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

## Advanced functionality


```html
<fieldset disabled 🤪=foo>
    <label data-for={{foo}}>foo:</label>
    <input 
        class=my-class 
        part=my-part 
        type=checkbox 
        data-id="{{@|%.# foo}}">
    <template defer-be-switched="on when #{{foo}}">
        foo is checked
    </template>
</fieldset>
```

generates:

```html
<fieldset>
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