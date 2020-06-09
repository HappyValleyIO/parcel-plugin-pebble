# parcel-plugin-pebble
A basic parcel plugin to fix issues with building pebble templates

## Install

Simple install the plugin and parcel will do the rest:

```bash
npm i -D @happyvalleyio/parcel-plugin-pebble
```

## What it does

This is a stupidly simple plugin currently. It treats any `.peb` files as HTML *but* does not attempt to process any 
url that contains pebble syntax. As an example,

```html
<a href="/secure/{{ resource.resourceId }}">Go to resource</a>
``` 

This would normally fail to build due to parcel attempting to resolve `secure/{{ resource.resourceId }}` as a dependency. 
We ignore any url that contains `{{ something }}` and allow parcel to happily treat the rest of the doc as HTML.

## Future work

![What do now](https://newfastuff.com/wp-content/uploads/2019/10/43-hFEuVqC.png)

We want to add some configuration:

* allow custom file extensions (for jinja or twig templates for instance) ([issue](https://github.com/HappyValleyIO/parcel-plugin-pebble/issues/1))
* allow processing other resource types than HTML ([issue](https://github.com/HappyValleyIO/parcel-plugin-pebble/issues/2))
* any other problems we run into while trying to build pebble templates with parcel

## Contributing
Feel free to open a pull request. We use this project in production so should be fairly quick to respond.

