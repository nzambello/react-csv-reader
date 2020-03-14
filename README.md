# react-csv-reader

[![license](https://img.shields.io/github/license/nzambello/react-csv-reader.svg)](https://github.com/nzambello/react-csv-reader/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/react-csv-reader.svg)](https://www.npmjs.com/package/react-csv-reader)
[![npm](https://img.shields.io/npm/dt/react-csv-reader.svg)](https://www.npmjs.com/package/react-csv-reader)
![Node.js CI](https://github.com/nzambello/react-csv-reader/workflows/Node.js%20CI/badge.svg?branch=master)

React component that handles csv file input.  
It handles file input and returns its content as a matrix.

You can try it out in a [demo on Codesandbox](https://codesandbox.io/s/react-csv-reader-vtull).

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

Basic usage:

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSVReader from 'react-csv-reader'

class App extends Component {
  ...

  render() {
    return (
      <CSVReader onFileLoaded={(data, fileName) => console.log(data, fileName)} />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

More complex example:

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CSVReader from 'react-csv-reader'

class App extends Component {
  ...

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header =>
      header
        .toLowerCase()
        .replace(/\W/g, '_')
  }

  render() {
    return (
      <CSVReader
        cssClass="csv-reader-input"
        label="Select CSV with secret Death Star statistics"
        onFileLoaded={this.handleForce}
        onError={this.handleDarkSideForce}
        parserOptions={papaparseOptions}
        inputId="ObiWan"
        inputStyle={{color: 'red'}}
      />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Parameters

| Name          | Type            | Default                  | Description                                                                      |
| ------------- | --------------- | ------------------------ | -------------------------------------------------------------------------------- |
| accept        | striing         | `.csv, text/csv`         | File type accepted by file input.                                                |
| cssClass      | string          | `csv-reader-input`       | A CSS class to be applied to the wrapper element.                                |
| cssInputClass | string          | `csv-input`              | A CSS class to be applied to the `<input>` element.                              |
| label         | string, element |                          | If present, it will be rendered in a `<label>` to describe input aim.            |
| onFileLoaded  | function        |                          | (**_required_**) The function to be called passing loaded results.               |
| onError       | function        |                          | Error handling function.                                                         |
| parserOptions | object          | `{}`                     | [PapaParse configuration](https://www.papaparse.com/docs#config) object override |
| inputId       | string          | `react-csv-reader-input` | An id to be applied to the `<input>` element.                                    |
| inputStyle    | object          | `{}`                     | Some style to be applied to the `<input>` element.                               |
| fileEncoding  | string          | `UTF-8`                  | Encoding type of the input file.                                                 |
| disabled      | boolean         | `false`                  | Set input disabled attribute.                                                    |

### Results

When the file has been loaded, it will be parsed with [PapaParse](https://github.com/mholt/PapaParse) from a CSV formatted text to a matrix of strings or a list of objects (using `header` option).
That matrix is returned to the parent component with `onFileLoaded` function (it will be passed as an argument).
The second argument to `onFileLoaded` will be the filename provided

## Testing

This packages uses `jest` for unit tests and snapshot testing.

To run the tests:

```sh
yarn test
```

Submitting a PR will trigger GitHub Actions to automatically run the tests.
