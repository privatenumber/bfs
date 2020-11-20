# bfs [![Latest version](https://badgen.net/npm/v/bfs)](https://npm.im/bfs) [![Monthly downloads](https://badgen.net/npm/dm/bfs)](https://npm.im/bfs) [![Install size](https://packagephobia.now.sh/badge?p=bfs)](https://packagephobia.now.sh/result?p=bfs) [![Bundle size](https://badgen.net/bundlephobia/minzip/bfs)](https://bundlephobia.com/result?p=bfs)

Find the path of a value in a complex JavaScript object.

This module is BFS ([Breadth-first Search](https://en.wikipedia.org/wiki/Breadth-first_search)) as a debugging tool to help with quickly understanding the relationships within an object tree/graph.

<sub>If you like this project, please star it & [follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## 🚦 Quick Setup

### In a local project

```sh
npm i --no-save bfs
```

```js
import BFS from 'bfs';

// Search the global scope for all properties that have the MAX_SAFE_INTEGER value
BFS(global, Number.MAX_SAFE_INTEGER);
```

### In browser dev-tools

```js
const { default: BFS } = await import('//unpkg.com/bfs/dist/bfs.esm.js');

// Search the global scope for all properties that have the MAX_SAFE_INTEGER value
BFS(global, Math.max);
```

### In non ESM environments
```js
(function (cb) {
    var s = document.createElement('script')
    s.src = '//unpkg.com/bfs'
    s.onload = cb
    document.head.appendChild(s)
})(function () {

	// Search the global scope for all properties that have the MAX_SAFE_INTEGER value
    BFS(global, Number.MAX_SAFE_INTEGER);
})
```

## ⚙️ Options
- timeout (`10000`)
- maxFinds (`100`)
- silenceErrors (`true`)
