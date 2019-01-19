# react-csv-reader

[![license](https://img.shields.io/github/license/nzambello/react-csv-reader.svg)](https://github.com/nzambello/react-csv-reader/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/react-csv-reader.svg)](https://www.npmjs.com/package/react-csv-reader)
[![npm](https://img.shields.io/npm/dt/react-csv-reader.svg)](https://www.npmjs.com/package/react-csv-reader)

React component that handles csv file input.  
It handles file input and returns its content as a matrix.

You can try it out in a [demo on Codesandbox](https://codesandbox.io/s/5058ln02lx).

[Support me on Patreon!](https://www.patreon.com/bePatron?u=16610795)


## Installation

Install the package with either yarn or npm.

With yarn:

```sh
yarn add react-csv-reader
```

With npm:

```sh
npm install --save react-csv-reader
```

## Usage

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSVReader from 'react-csv-reader'

class App extends Component {
  ...

  render() {
    return (
      <CSVReader
        cssClass="csv-reader-input"
        label="Select CSV with secret Death Star statistics"
        onFileLoaded={this.handleForce}
        onError={this.handleDarkSideForce}
        inputId="ObiWan"
        inputStyle={{color: 'red'}}
      />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Parameters

| Name          | Type            | Default            | Description                                                                      |
| ------------- | --------------- | ------------------ | -------------------------------------------------------------------------------- |
| cssClass      | string          | `csv-reader-input` | A CSS class to be applied to the wrapper element.                                |
| cssInputClass | string          | `csv-input`        | A CSS class to be applied to the `<input>` element.                              |
| label         | string, element |                    | If present, it will be rendered in a `<label>` to describe input aim.            |
| onFileLoaded  | function        |                    | (**_required_**) The function to be called passing loaded results.                     |
| onError       | function        |                    | Error handling function.                                                         |
| parserOptions | object          | `{}`               | [PapaParse configuration](https://www.papaparse.com/docs#config) object override |
| inputId       | string          |                    | An id to be applied to the `<input>` element.                                    |
| inputStyle    | object          | `{}`               | Some style to be applied to the `<input>` element.                               |

### Results

When the file has been loaded, it will be parsed with [PapaParse](https://github.com/mholt/PapaParse) from a CSV formatted text to a matrix.
That matrix is returned to the parent component with `onFileLoaded` function (it will be passed as an argument).
The second argument to `onFileLoaded` will be the filename provided
