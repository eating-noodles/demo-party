* First, start an express server to make index.html(./browser dir) accessiable.
``` bash
node ./node/html-server.js
```

* then run the puppeteer server to screenshot.
``` bash
node ./node/puppeteer-server.js
```
* at last, dont forget to `npm install` in the root dir.