# ToDo List web application

## Table of Contents

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Installation](#installation)
-   [Technologies Used](#technologies-used)
-   [Technical Details](#technical-details)
-   [How to use the app](#how-to-use-the-app)

## Project Overview

This project is a ToDo List web application developed as part of [TechPro Academy](https://www.techproacademy.gr/). The purpose of this application is to allow users to create, edit, and remove to-do notes. The project implements various technologies and concepts taught during the bootcamp.

## Features

-   **Fetch and display to-do notes:** Retrieves and shows a list of to-do items.
-   **Client-side filtering:** Filter displayed to-do notes based on search input and dropdown filter (all/complete/incomplete).
-   **Mark to-do as completed:** Toggle the completion status of a to-do item.
-   **Create a to-do:** Add a new to-do item.
-   **Edit a to-do:** Edit an existing one to-do item.
-   **Delete a to-do:** Remove a to-do item from the to-do list.
-   **Toggle dark/light scheme:** Switch between light and dark themes.
-   **Pop-up dialogue window:** Uses react-modal for dialog interactions.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/dkarakop/to-do-list
    cd to-do-list
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start **both** JSON server and React application
    ```bash
    npm run start-all
    ```

### To start them separately

JSON server:

```bash
npx json-server --watch db.json --port 3001
```

React application:

```bash
npm start
```

### Configuration

If you want to access the app from another address than `localhost` you will have to set the `REACT_APP_API_URL` environment variable accordingly.

## Technologies Used

-   Javascript/React
-   HTML
-   CSS/BEM
-   Responsive Design
-   JSON Server (for local backend)
-   CSS variables
-   Concurrently (to run multiple commands concurrently)

## Technical Details

-   **Modal Window**: The app includes a pop-up dialogue window implemented using the `react-modal` package.
-   **Local JSON Server**: For network request interactions, a local JSON server is set up using the `json-server` package. The JSON file is configured based on the app's requirements.
-   **State Management**: The following React hooks are used for state management and functionality:
    -   `useReducer`: Manages complex state logic.
    -   `useRef`: Accesses DOM elements directly.
    -   `useEffect`: Handles side effects such as data fetching.
-   **BEM Naming Convention**: CSS is written using the [BEM](https://getbem.com/) (Block Element Modifier) naming convention for better organization and readability.
-   **CSS Variables**: CSS variables are used to maintain consistency in styling and to support the dark/light themes.
-   **Concurrently**: The app uses the `concurrently` package to run `json-server` and `npm-start` commands simultaneously with a single command.

## How to use the app

-   **Search and filter:** Use the search bar to filter to-do items by text. Use the dropdown menu to filter by completion status (all/complete/incomplete).
-   **Add a to-do:** Enter text in the input field and press Enter to add a new to-do item.
-   **Edit a to-do:** Click on a to-do item to open the modal, edit the text, and save changes.
-   **Delete a to-do:** Click the delete button to remove a to-do item.
-   **Mark as completed:** Click the checkbox to toggle the completion status of a to-do item.
-   **Toggle theme:** Click the theme switch button to toggle between light and dark modes.
