import React from 'react'
import renderer from 'react-test-renderer'
import CSVReader from './index'

test('Renders basic CSVReader', () => {
  const component = renderer.create(<CSVReader onFileLoaded={() => {}} />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Renders CSVReader with all custom props', () => {
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, '_'),
  }

  const component = renderer.create(
    <CSVReader
      accept=".csv, text/csv, .tsv, test/tsv"
      cssClass="custom-csv-reader"
      cssInputClass="custom-csv-input"
      fileEncoding="iso-8859-1"
      inputId="react-csv-reader"
      inputStyle={{ color: 'red' }}
      label="Select CSV with secret Death Star statistics"
      onError={e => console.error(e)}
      onFileLoaded={(data, fileName) => console.log(data, fileName)}
      parserOptions={papaparseOptions}
    />,
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
