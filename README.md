# Buckutt-Client

## Installation

Required : node/io.js, npm, bower, gulp, static

```sh
sudo apt-get install node npm
sudo npm install -g gulp bower node-static webpack webpack-dev-server
npm install
bower install
```

### Note about material-design-lite

Add `window.MaterialLayoutTab = MaterialLayoutTab;` after function declaration (
`function MaterialLayoutTab(tab, tabs, panels, layout) {`)

## Building

```sh
npm run build
```

## Starting

Will build+watch the project

```sh
npm run dev
```

Open browser at http://localhost:8080/
