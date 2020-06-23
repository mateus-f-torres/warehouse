# Warehouse Project Notes

cypress commands.js
specs naming/wording
createMuiTheme & ThemeProvider

use jest to test Dialog and Validation Constraints  
make cypress only test the main features  

`#saveCurrentOrder` could be used by sw notifications

## Learning
### Reducer Organization
I finally get the ducks pattern
It mainly focus on keeping the reducer and actions type|creators in the same file
So maybe I can keep the initialState and action handlers in another file

But should every file and function have a unique name (quite hard)
Or maybe adopt a generalized approuch that depends on the folder context
e.g.
 // file naming
 store/todos/reducer.js
 store/todos/handlers.js
 
 // same basic structure (even name)
 function reducer(state = initialState, action) {}

 // function naming, same name for type|handler|creator|dispatcher
 // action type
 const ADD_TODO = 'app/todos/ADD_TODO'
 // action handler
 case ADD_TODO:
   return handle.addTodo(action.payload)
 // action creator
 dispatch(addTodo(todo))
 // action dispatcher
 <form onSubmit={addTodo}>


### Web Fonts
https://fonts.google.com/
https://google-webfonts-helper.herokuapp.com/fonts
https://caniuse.com/

@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: optional;
  src: local('Roboto'), local('Roboto-Regular'),
       url('~./assets/fonts/roboto-v20-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('~./assets/fonts/roboto-v20-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

- Change file type to `.woff2` with `.woff` as fallback
- Use `rel="preload"` with `font-display: swap;` for better UX  
- Dont _hash_ font files (better caching)
- ~~Instead of `file-loader` use `copy-webpack-plugin`~~
- ~~Instruct `css-loader` **not** to import `url()` files during bundle~~


- [x] ~~**Compress** fonts~~
  - https://en.wikipedia.org/wiki/Zopfli
  - https://github.com/webpack-contrib/compression-webpack-plugin
- [x] See that there are no **synthetic faces**
  - https://www.w3.org/TR/css-fonts-4/#font-synthesis-intro
  - https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis
- [x] Study the desired **font-display** strategy
  - https://drafts.csswg.org/css-fonts-4/#font-display-desc
  - https://www.w3.org/TR/css-font-loading/

When using a custom web font is good to remeber:

1. Better to serve `.woff2` or `.woff` formats
    - `.woff2` is already **brotli** compressed
    - `.woff` is already **gzip** compressed
2. If possible and necessary try to `rel="preload"` the main fonts
    - browsers must make a [**CORS** fetch](https://www.w3.org/TR/css-fonts-4/#font-fetching-requirements) for font loading
3. When writing `@font-family` always be careful with [`font-display`](https://www.w3.org/TR/css-fonts-4/#font-display-desc) and [`font properties`](https://www.w3.org/TR/css-fonts-4/#font-prop-desc)
    - `font-display` is responsible for **FOIT**, **FOUT** and **FOFT**
    - `font properties` is responsible for **synthesized font faces**
4. Remember to declare some web safe fallback fonts



TrueType Fonts (TTF)
TrueType is a font standard developed in the late 1980s, by Apple and Microsoft. TrueType is the most common font format for both the Mac OS and Microsoft Windows operating systems.

OpenType Fonts (OTF)
OpenType is a format for scalable computer fonts. It was built on TrueType, and is a registered trademark of Microsoft. OpenType fonts are used commonly today on the major computer platforms.

The Web Open Font Format (WOFF)
WOFF is a font format for use in web pages. It was developed in 2009, and is now a W3C Recommendation.
WOFF is essentially OpenType or TrueType with compression and additional metadata. The goal is to support font distribution from a server to a client over a network with bandwidth constraints.

The Web Open Font Format (WOFF 2.0)
TrueType/OpenType font that provides better compression than WOFF 1.0.

SVG Fonts/Shapes
SVG fonts allow SVG to be used as glyphs when displaying text.
The SVG 1.1 specification define a font module that allows the creation of fonts within an SVG document.
You can also apply CSS to SVG documents, and the @font-face rule can be applied to text in SVG documents.

Embedded OpenType Fonts (EOT)
EOT fonts are a compact form of OpenType fonts designed by Microsoft for use as embedded fonts on web pages.

### Mobile Keyboard
When a `<input>` is given _focus_ a virtual keyboard takes a chunk of the viewport  
How can we lower it after the user has acted ?  

We could watch for each keypress but that is unnecessary;
By placing inside a form we use onSubmit and watch for that;
On mobile devices the virtual keyboard responds to focus/blur events;
So we can programmatically lower the keyboard this way;

This is somewhat strange when on devices with a dedicated keyboard;
But to think of a more sophisticated approach would take time;

One such approach could be to know the viewport height;
If during input focus that value drops = virtual keyboard;

### Controlled Layout
Is it always bad to use pixel measures in layouts ?  
Even if we know how many pixels a element will take on small or larger screens ?  
If we know how the content behaves at the viewport breaks I belive its quite possible  
Of course this approach is NOT RESPONSIVE if the content can change  
So we are talking about a very specific case

Another case for pixel meaures is to be more future-friendly  
Its common place to design layouts with a mobile-first approuch and then define breaks  
But what if your app is displayed on an ever larger screen ?  
Is there a point where the travel distance for the eyes is tiresome ?  
I argue that you should always contraint yourself within a minimun and maximun screen size  
Otherwise designers and developers with waste time defining layouts to viewports that arent even used by your customers

### Functional Trap
```
const promisify = (fn) => new Promise(fn)

function fakeAPI(fn) {
  return async function (...args) {
    await promisify(randomDelay)
    await promisify(randomError)

    return fn.apply(null, args)
  }
}
```
