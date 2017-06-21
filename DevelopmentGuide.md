# Development Guidelines

## Site Variables

Some variables need to be accessed by the entire site. This is done through a `siteVars` object. Current properties of this object include:

- `view` which page the user is on
- `info` display the info bar

#### Updating Site variables

To update a site variable, adjust the value is `siteVars`.

For it to persist between pages, page must be changed via `setView()`.

`setView()` adjusts the `view` site variable, and then sets the URL query to include _all_ current values of `siteVars`. Changing the URL query automatically triggers a reload (but the page reloads to whatever view is selected, as that is where `siteVars.view` now points).


## Panels

Panels represent main page content. Each view has a panel, the content of which is in it's own `.html` file, which includes:

- `<style>` Style info needed only by this panel<sup>1</sup>
- `<script>` Any JavaScript that only this panel needs
- `<div class='panel-header'>` A header for the panel **(recommended)**
- `<div class='panel-body'>` The panel body
- `<div class='panel-footer'>` A footer for the panel **(optional)**

<sup>1</sup> Note that technically speaking, `<style>` tags are not allowed to be in the `<body>`, but all browsers allow it, and it is common practice
