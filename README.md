# Algorithm Efficiency Analyzer Tool
Sorting Algorithm Visualization

## Project Setup

The directory structure looks like this:

```
src/
  ├── ui/               // view renderer
  │   └── package.json  // npm packaging configuration
  │   └── scripts/
  │   │   └── postbuild.js
  │   └── src/
  │       └── App.js
  │       └── index.js
  │       └── MetricsVisualization.js
  │       └── SortedArray.js
  │       └── Sorter.js
  │       └── theme.js
  ├── common/           // python common code
  │   └── common.py
  └── algo/             // implemented sortingalgorithms
      └── all.py
app.py                  // flask server
requirements.txt        // python project dependencies
static/                 // static build served from root
```

## Running the Project in dev Mode

```bash
cd src/ui 
npm install
npm start
```

Open the site at [http://localhost:3000](http://localhost:3000)

## Statically Generate and Preview the Site

```bash
cd src/ui 
npm install
npm run build
npm run server
```

Open the site at [http://127.0.0.1:5000](http://127.0.0.1:5000)