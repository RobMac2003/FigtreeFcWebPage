Figtree Fc Website Documentation
```markdown
# FigtreeFcWebsite
## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

```bash
git clone  https://github.com/RobMac2003/FigtreeFcWebPage.git
```

2. Install dependencies:

```bash
cd FigtreeFcWebsite
npm install
```

3. Start the development server:

```bash
npm start
```

This will open the app in your default browser at `http://localhost:3000`.

## Project Structure

The project structure follows the standard React structure created by `create-react-app`:

```
your-repo/
├── node_modules/
│   ├── documentation.md
├── node_modules/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   └── FilterBar.js
│   │   └── ScrollableList.css
│   │   └── DisplayData.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── dataFetch.js
│   ├── index.js
│   ├── index.css
│   ├── webReportVitals.js
│   └── setupTests.js
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── yarn.lock
```

- `public/` contains the HTML file that serves as the entry point for the application.
- `src/` contains the main React components and other source files.
- `components/` is where we are keeping custom React components.
- - `FilterBar.js/` This is where the backend for the filterbar happens  we make api calls to get filters and call the datafecth funtion from datafetch.js file.
- `App.js/` is where we are loading the scrollable list and filterbar.
- `index.html/` This is the html for the frontpage.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Contributing

This is a closed source project.

## License


```

Thank you.