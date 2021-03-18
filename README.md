# Generate PDFs from MDX (feat Razzle)

### How to use

1. First you'll need to install [PrinceXML](https://www.princexml.com/download/):

```sh
$ brew tap caius/prince
$ brew install prince
```

1. `yarn start` to spin up the server
2. edit `src/example.mdx`
3. `output.pdf` gets generated on save

[➤ Preview output.pdf](https://github.com/skillrecordings/mdx-to-pdf/blob/main/output.pdf)

### Styling PDF

This example is using Tailwind. Format pages in PDF, add pagination, control page spreads, margins, background, etc. in `src/pdf-styles.css` with [Prince's Paged Media CSS rules](https://www.princexml.com/doc/paged/).


#### Example

This code will display page counter on bottom of every page and add start a new page on every H1 encounter.

```css
/* src/pdf-styles.css */
@page {
  size: A4;
  @bottom {
    content: counter(page);
  }
}

h1 {
  break-before: page;
}
```
