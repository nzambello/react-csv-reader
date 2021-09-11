# react-csv-reader

[![npm version](https://img.shields.io/github/package-json/v/nzambello/react-csv-reader)](https://www.npmjs.com/package/react-csv-reader)
[![npm](https://img.shields.io/npm/dm/react-csv-reader)](https://www.npmjs.com/package/react-csv-reader)
![Node.js CI](https://github.com/nzambello/react-csv-reader/workflows/Node.js%20CI/badge.svg?branch=master)
![a11y axe](https://img.shields.io/badge/a11y-tested-brightgreen)
![TypeScript Support](https://img.shields.io/badge/TypeScript-Support-blue)

React component that handles csv file input.
It handles file input and returns its content as a matrix.

Docs: [nzambello.github.io/react-csv-reader](https://nzambello.github.io/react-csv-reader/)

You can try it out in the playground in the [docs](https://nzambello.github.io/react-csv-reader/usage#playground) or in the [demo on Codesandbox](https://codesandbox.io/s/react-csv-reader-vtull).

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
      <CSVReader onFileLoaded={(data, fileInfo, originalFile) => console.dir(data, fileInfo, originalFile)} />
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
        inputName="ObiWan"
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
| accept        | string          | `.csv, text/csv`         | File type accepted by file input.                                                |
| cssClass      | string          | `csv-reader-input`       | A CSS class to be applied to the wrapper element.                                |
| cssInputClass | string          | `csv-input`              | A CSS class to be applied to the `<input>` element.                              |
| cssLabelClass | string          | `csv-label`              | A CSS class to be applied to the `<label>` element.                              |
| label         | string, element |                          | If present, it will be rendered in a `<label>` to describe input aim.            |
| onFileLoaded  | function        |                          | (**_required_**) The function to be called passing loaded results, see below.    |
| onError       | function        |                          | Error handling function.                                                         |
| parserOptions | object          | `{}`                     | [PapaParse configuration](https://www.papaparse.com/docs#config) object override |
| inputId       | string          | `react-csv-reader-input` | An id to be applied to the `<input>` element.                                    |
| inputName     | string          | `react-csv-reader-input` | A name attribute to be applied to the `<input>` element.                         |
| inputStyle    | object          | `{}`                     | Some style to be applied to the `<input>` element.                               |
| fileEncoding  | string          | `UTF-8`                  | Encoding type of the input file.                                                 |
| disabled      | boolean         | `false`                  | Set input disabled attribute.                                                    |
| strict        | boolean         | `false`                  | Throws error on `onError` if file type is different from `accept`.               |

### onFileLoaded

When the file has been loaded, it will be parsed with [PapaParse](https://github.com/mholt/PapaParse) from a CSV formatted text to a matrix of strings or a list of objects (using `header` option).
That parsed data is returned to the parent component with `onFileLoaded` function (it will be passed as an argument).
The second argument to `onFileLoaded` will be an object with infos about loaded file.

```typescript
// data: PapaParse.ParseResult.data
// fileInfo: IFileInfo
onFileLoaded: (data: Array<any>, fileInfo: IFileInfo, originalFile: File) => any
```

For type definitions, see [here](src/index.tsx#L20).

## Testing

This packages uses `jest` for unit tests and snapshot testing.

To run the tests:

```sh
yarn test
```

Automated accessibility tests are run with `jest-axe`.

## Contributions

Please follow our [convention](COMMITLINT.md) on commits format.
