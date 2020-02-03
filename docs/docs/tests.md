---
id: tests
title: Testing
---
## Jest

For people using jest - untill just support es imports (https://github.com/facebook/jest/issues/9430),
you can add to your `package.json` :
```
"jest": {
    "transformIgnorePatterns": ["node_modules/(?!(mobx-easy)/)"]
  }
```
