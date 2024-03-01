# Gulp4HTML

An NPM initializer for HTML, CSS and Vanilla JavaScript projects. Uses with Gulp.js.

`npm create gulp4html`

## Features
* minimifies outer HTML, CSS, JS
* concatenates CSS and JS
* supports SCSS preprocessor
* auto-prefixing for CSS with PostCSS
* converts PNG and JPEG images to WEPB format
* joins SVG icons to sprite
* auto-reloading after HTML/CSS/JS changes

## Commands

* Build and start watching server

`npm start`

* Build

`npm run build`

* Build only graphics including PNG, JPEG, SVG assets

`npm run build:graphics`

## File Structure

```├───fonts
├───images
│   └───sprite
├───js
└───style
```