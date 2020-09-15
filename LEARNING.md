# Warehouse Learning Notes

## The Cost of a UI Framework
Let's say you want to create a quick project, maybe to try out a library or for the coding part of a work application. The UI is not a core aspect of this project but just something that needs to look good and should be easy/quick to build. No need to create everything from scratch, just pick up some UI framework and code away, after all, they are short-lived projects, and you know it.  

Every library or framework has a cost that you must pay at some point. The problem with UI frameworks is that only feel the cost **after the first release**. Maybe you want to change some utility library, improve the build process or add a new feature to the application, but the longer you stay away from that code the longer it takes to recall how that framework functions and that for me is the real cost.  

I can write CSS, LESS , SCSS, Stylus or Styled-Components. I can write SMACSS, BEM, ITCSS, ABEM or Functional CSS. I can build a UI from the top-down or from the bottom-up, but none of that matters when there is a UI framework in the project, because I must follow the framework's guidelines. You can't easily transfer you existing knowledge to this codebase, and you also can't easily transfer your knowledge of this framework to other codebase.

> It's easy to see the benefits of an idea, but it's very hard to measure subtle negatives chained to it
>
> -- <cite>Jonathan Blow</cite>

## State Management
[**Redux**](https://redux.js.org) is an awesome library for state management, you can actually produce predictable state and write complex applications with it, however, it's not all sunshine and roses. **Redux** comes with a lot of boilerplate code and if you follow the intended organization you could end up with different files for **action constants**, **action creators**, **initial state**, **reducers**, **handlers**, **connectors**, etc, and, even then these files could all be separated by domain inside a folder or maybe all allocated inside a type specific folder. All of this is overkill for most projects, and most likely will ramp up the cognitive load inside the codebase.  

While working in this project I read a lot about state management organization and like most things in programming...there is no clear right or wrong answer. My suggestion is to **K.I.S.S.** your state management and experiment with different approaches while you try to find the one you and your team agrees that is just right for the codebase, that sweet spot between the being organized enough, so I know where to find stuff and flexible enough, so I can change it at an acceptable cost if needed. 

For **Warehouse** I chose the following structure because it felt right at the time:
- with the challenge of not using any extra library
- inspired by different versions of the **Redux Ducks** pattern
- knowing that naming things is very hard 
- employing context awareness and co-location
    
```
├── hooks
│   ├── useAuthentication
│   │   ├── handler.js
│   │   ├── reducer.js
│   │   └── useAuthentication.js
│   ├── useNotifications
│   │   ├── handler.js
│   │   ├── reducer.js
│   │   └── useNotifications.js
│   └── useProductsList
│       ├── handler.js
│       ├── reducer.js
│       ├── useProductsList.js
```

As you can see, this structure always has at least 3 files for each major domain of the application. Minor local state should just stay inside the relative component and be kept as simple as possible. You may be asking yourself: "why not use `index.js` as the name for the `useCustomHook.js` file ?". Firstly, because it makes it easier to know just by reading the name that the default export is a _custom hook_, secondly, because **I hate naming more than one file `index.js`**, as this name has no meaning whatsoever when diluted across the codebase, at least with `handler.js` or `reducer.js` I know what to expect from that file even if I am still dependent on the directory context. My only `index.js` is the main entry point for `webpack.config.js`.

```javascript
/* ========= handler.js ========= */
const initialState = {}

export function addTodo(state, newTodo) {
    return // new modified state
}

export default initialState

/* ========= reducer.js ========= */
import * as handle from './handler.js'

const ADD_TODO = 'warehouse/todos/ADD_TODO'

function reducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return handle.addTodo(state, action.payload)

    default:
        return state
  }
}

export function addTodo(newTodo) {
  return {
    type: ADD_TODO,
    payload: newTodo,
  }
}

export default reducer

/* ========= useTodos.js ========= */
import React from 'react'

import reducer, * as actions from './reducer'
import initialState from './handler'

function useTodos() {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const dispatchAddTodo = (newTodo) => dispatch(actions.addTodo(newTodo))

  /* some React.useEffect or React.useLayoutEffect, if needed */

  function addTodo(newTodo) {
    /* call an endpoint or do someother side-effect, if needed */

    dispatchAddTodo(newTodo)
  }

  return [state.todos, {addTodo}]
}

export default useTodos
```

Depending on how complex your reducer is you may not need the third dedicated `useCustomHook.js` file, after all, in this project I need it as a way to separate React code from the pure reducer code, think of it as the `connect` in **React-Redux**. It may also seem strange to name everything the same, though the alternative would be to add a suffix to everyone of those cases: `addTodoHandler`, `ADD_TODO_ACTION`, `addTodoActionCreator`, `addTodoActionDispatcher` and so forth. I don't really see this as a problem as long as the file context is respected, and it sure helps not to have to think of a different name for each context, plus, you can follow along the whole process by grepping for just this one name.

> There are only two hard things in Computer Science: cache invalidation and naming things.
> 
> -- <cite>Phil Karlton</cite>


## Browser Storage
Most of the usage will be centered around `Cookies`, `Web Storage`, `IndexedDB` and `Cache`. They all share the same global/group storage quota and default to temporary data, that is evicted by LRU policy¹ when limits are reached. Most of the time users choose to explicitly clear cookies and data, very rarely is data automatically cleared by the browsers.

Some APIs are better for small short-lived data, while others are excellent for caching full files. A **tl;dr** approach would be `Cache` for files, `IndexedDB` for most data and `Web Storage` for very small strings, although `IndexedDB` is pretty low-level for most projects, so I suggest using a library.

- [idb](https://npmjs.com/package/idb/), IndexedDB with improved usability
- [Dexie](https://dexie.org/), a Minimalistic Wrapper for IndexedDB
- [PouchDB](https://pouchdb.com/), Apache CouchDB inspired wrapper
- [Lovefield](https://google.github.io/lovefield/), relational database for web apps

¹. Least Recently Used **origin**

## Web Fonts
Use only `.woff2` and `.woff` formats, as they are compressed by default, with **brotli** and **gzip** respectively, and supported by all current browsers. Whenever possible use `rel="preload"` with `font-display: swap` for better UX, but beware that you must make a [**CORS** fetch](https://www.w3.org/TR/css-fonts-4/#font-fetching-requirements) for font loading. Pay attention to [`font-display`](https://www.w3.org/TR/css-fonts-4/#font-display-desc) and [`font properties`](https://www.w3.org/TR/css-fonts-4/#font-prop-desc) when writing `@font-family`, as `font-display` is responsible for **FOIT**¹, **FOUT**² and **FOFT**³, and `font properties` is responsible for **synthesized font faces**. Font files are possibly one of the more static assets inside a project, therefore, for better caching, you probably shouldn't _hash_ them as most will already be versioned.  

https://fonts.google.com/  
https://google-webfonts-helper.herokuapp.com/fonts  

¹. Flash of Invisible Text  
². Flash of Unstyled Text  
³. Flash of Faux Text

## Controlled Layout
Is it always bad to use pixel measures in layouts? Even if we know how many pixels an element will take on small or larger screens? If we know how the content behaves as the viewport breaks I believe it's not a bad practice. Of course this approach is NOT RESPONSIVE if the content is dynamic and, therefore, can change, so we are talking about specific cases where the copy doesn't change nor does the font-size, like a brand name.

Another case for pixel measures, and controlled layouts by extension, is to be more future-friendly. It's common place to design layouts with a mobile-first approach and then define breaks as the screen grows. But what if your app is displayed on an ever larger screen? Is there a point where the travel distance for the eyes is tiresome? I argue that you should always constraint yourself within a minimum and maximum screen size, otherwise, designers and developers with waste time defining layouts to viewports that aren't even used by your customers.

## Mobile Keyboard
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

Last `<input/>` inside a form will dispatch a `ENTER` _keypress_ on mobile devices  
We can't just prevent submission on `ENTER` because it will make for a worse UX on desktop  
Maybe we could add an invisible extra `<input/>` that will _blur_ `onfocus` just for mobile.


## Functional Trap
```javascript
const promisify = (fn) => new Promise(fn)

function fakeAPI(fn) {
  return async function (...args) {
    await promisify(randomDelay)
    await promisify(randomError)

    return fn.apply(null, args)
  }
}
```
specs naming/wording

use jest to test Dialog and Validation Constraints  
make cypress only test the main features  

`#saveCurrentOrder` could be used by sw notifications
