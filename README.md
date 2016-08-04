# Pokemon GO Protocol Wrapper 
Pokemon GO protocol buffer, running by protobufjs, so no <a href="https://github.com/google/protobuf">google/protobuf</a> conflicts.

Same architecture as <a href="https://github.com/rastapasta/pokemon-go-protobuf-node">rastapasta/pokemon-go-protobuf-node</a>.

## Install

```
$ npm install --save pkmngo-proto
```


## Usage
```js
var proto = require('pkmngo-proto');
console.log(proto.info());

// get a buffer somewhere
var data = proto.parse(buffer, "POGOProtos.Networking.Envelopes.ResponseEnvelope");

// Do stuff with data
```