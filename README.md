[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/mateus-f-torres/barefoot/blob/master/LICENSE)

# Warehouse
A practice project focused on **React** and **Web Storage**.  
Main practice points:
- [**React Hooks**](https://reactjs.org/docs/hooks-intro.html), new API for better React development 
- [**IndexedDB**](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API), low-level Web API for client-side storage.
- [**Constraint Validation**](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation), HTML5 feature for simple form validation.

PS: since I'm from Brazil the expected currency format is the Brazilian real

## Features

#### Auto-Login
Use **LocalStorage** to read/write current user  
Share that information with React **useContext** hook  
If user was already logged, redirect to App, else show Login  

#### Local Database
Whenever a user adds/edits/deletes a product that change is saved in the **IndexedDB**  
To fake a external API interaction theses actions are wrapped inside a `setTimeout`  
The same database will be used for the same company, even if the username is different  

#### Super-Custom-Hook-Reducer
It would be a lot easier to just use **Redux** and call it a day  
But this is a practice project so no state management library is used  
Combine **useState**, **useEffect** and **useReducer** to create a **Custom Hook**

#### Controlled-Components... why ?
While learning to use the **Constraint Validation** interface I came upon this question  
Using the [`SubmitEvent`](https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent) we can access the input values by the `name` property  
There is no need to control the input _value_ since the validation will occur before submission

## License
[MIT License](./LICENSE)
Made by [Mateus F Torres](https://github.com/mateus-f-torres)    
Initial structure from [barefoot](https://github.com/mateus-f-torres/barefoot) template  
