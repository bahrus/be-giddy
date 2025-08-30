# be-giddy (🤪)
Auto generate id's and other attributes

```html
<fieldset defer-be-switched disabled 🤪>
    <label data-for="{{foo}}">foo:</label>
    <input 
        class=my-class 
        part=my-part 
        type=checkbox 
        data-id="{{@|%.# foo}}">
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
</fieldset>
```