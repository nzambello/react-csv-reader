# react-csv-reader

[![license](https://img.shields.io/github/license/nzambello/react-csv-reader.svg)](https://github.com/nzambello/react-csv-reader/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/react-csv-reader.svg)](https://www.npmjs.com/package/react-csv-reader)

React component that handles csv file input.  
It handles file input and returns its content as a matrix.

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
        cssClass="csv-input"
        label="Select CSV with secret Death Star statistics"
        onFileLoaded={this.handleForce}
        onError={this.handleDarkSideForce}
      />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### Parameters

| Name         | Type            | Default     | Description                                                           |
| ------------ | --------------- | ----------- | --------------------------------------------------------------------- |
| cssClass     | string          | `csv-input` | A CSS class to be applied to the `<input>` element.                   |
| label        | string, element |             | If present, it will be rendered in a `<label>` to describe input aim. |
| onFileLoaded | function        |             | (**_required_**) The function to be called passing loaded results.    |
| onError      | function        |             | Error handling function.                                              |

### Results

When the file has been loaded, it will parsed with [PapaParse](https://github.com/mholt/PapaParse) from a CSV formatted text to a matrix.  
That matrix is returned to the parent component with `onFileLoaded` function (it will be passed as an argument).
