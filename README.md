[![Netlify Status](https://api.netlify.com/api/v1/badges/4fca18c0-b448-4c4b-95dd-8678d635d4ea/deploy-status)](https://app.netlify.com/sites/warehouse-mft/deploys)
[![Build Status](https://travis-ci.org/mateus-f-torres/warehouse.svg?branch=master)](https://travis-ci.org/mateus-f-torres/warehouse)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/mateus-f-torres/barefoot/blob/master/LICENSE)

# Warehouse
A practice project focused on **React** and **Web Storage**.  
Main practice points:
- [**React Hooks**](https://reactjs.org/docs/hooks-intro.html), new API for better React development 
- [**IndexedDB**](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), low-level Web API for client-side storage.
- [**Constraint Validation**](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation), native HTML5 feature for form validation.

If you would like to read more about what I learned with this project please see the [Learning](https://github.com/mateus-f-torres/warehouse/blob/master/LEARNING.md) document.  

PS: since I'm from Brazil the expected currency format is the Brazilian real

## Features

#### Auto-Login
Use **LocalStorage** to read/write current user  
Share that information with React **useContext** hook  
Redirect logged users to main app, else show login page

#### Local Database
Whenever a user adds/edits/deletes a product, save that change in the **IndexedDB**  
Fake an external API interaction by placing these actions inside a delay/error trap  
Use the same database for the same company, even if the username is different  

#### Super-Custom-Hook-Reducer
Instead of using a state management library, do it yourself to feel the pain  
Combine **useState**, **useEffect** and **useReducer** to create a dedicated **Custom Hook**  
Realize the different types of state that are needed on an application

#### Controlled-Components... why ?
While learning to use the **Constraint Validation** interface I came upon this question  
Using the [`SubmitEvent`](https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent) we can access the input values by the `name` property  
There is no need to control the input _value_ since the validation will occur before submission

## License
[MIT License](./LICENSE)  
Made by [Mateus F Torres](https://github.com/mateus-f-torres)    
Initial structure from [barefoot](https://github.com/mateus-f-torres/barefoot) template  
