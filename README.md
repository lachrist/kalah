# kalah
Remote references based on Melf

Demonstration by running in two separate terminals:

```sh
rm usage/boxdir/* ; node usage/fantasio.js
```

```sh
node usage/spriou.js
```

## `kalah = require("kalah")(melf, sync)`

* `melf :: melf.Melf`
* `sync :: boolean`
* `kalah :: object`
  * `alias = ownerof(value)`
    * `value :: *`
    * `alias :: string`
  * `value = import(json, type)`
    * `json :: json`
    * `type :: json`
    * `value :: *`
  * `json = export(value, type)`
    * `value :: *`
    * `type :: json`
    * `json :: json`
