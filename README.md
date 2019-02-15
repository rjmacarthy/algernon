**Algernon**

Algernon is a library for generating Typescript interfaces from solc compiled solidity abi definitions.


```
npm install algernon
```



**Usage**

```

Usage: algernon -p <path>

Options:
  -p, --path  The pwd to the abi files                                [required]
  --version   Show version number                                      [boolean]
  --help      Show help                                                [boolean]

```

To use algernon you must first compile you `.sol` files using solc compiler...

```
  solcjs *.sol --abi -o ../abis
```

This will create an `abi` dir with `.abi` files inside for use with algernon.

Once solc has compiled the abi files you can run algernon on them.

```
algernon -p ./abis
```

This will create a folder named `algernon` in your current directory with the interfaces inside.

**Programatically**

You can also use algernon programatically

```
npm install algernon
```

```
//index.js

var Algernon = require('algernon')

let a = new Algernon({
  path : './abis'
}).parse()

```

