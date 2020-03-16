import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { cleanup, render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

import CSVReader from './index'

expect.extend(toHaveNoViolations)
afterEach(cleanup)

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: (header: string) => header.toLowerCase().replace(/\W/g, '_'),
}

const csvReader = (
  <CSVReader
    accept=".csv, text/csv, .tsv, test/tsv"
    cssClass="custom-csv-reader"
    cssInputClass="custom-csv-input"
    fileEncoding="iso-8859-1"
    inputId="react-csv-reader"
    inputStyle={{ color: 'red' }}
    label="CSV input label text"
    onError={e => console.error(e)}
    onFileLoaded={(data, fileInfo) => console.dir(data, fileInfo)}
    parserOptions={papaparseOptions}
    disabled
  />
)

test('CSVReader is being rendered', () => {
  const component = renderer.create(csvReader)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('CSVReader is accessible', async () => {
  const { container } = render(csvReader)
  const results = await axe(container)

  expect(results).toHaveNoViolations()
})

describe('Testing CSVReader props:', () => {
  test('has accept prop set', () => {
    const accept = '.csv, text/csv, .tsv, test/tsv'
    const { getByLabelText } = render(csvReader)
    const inputNode = getByLabelText('CSV input label text')

    expect(inputNode.getAttribute('accept')).toBe(accept)
  })

  test('has cssInputClass prop set', () => {
    const cssInputClass = 'custom-csv-input'
    const { getByLabelText } = render(csvReader)
    const inputNode = getByLabelText('CSV input label text')

    expect([...inputNode.classList]).toEqual(expect.arrayContaining([cssInputClass]))
  })

  test('has inputId prop set', () => {
    const inputId = 'react-csv-reader'
    const { getByLabelText } = render(csvReader)
    const inputNode = getByLabelText('CSV input label text')

    expect(inputNode.getAttribute('id')).toBe(inputId)
  })

  test('has label prop set', () => {
    const { getByLabelText } = render(csvReader)
    const inputNode = getByLabelText('CSV input label text')

    expect(inputNode).toBeDefined()
  })

  test('has disabled prop set', () => {
    const { getByLabelText } = render(csvReader)
    const inputNode = getByLabelText('CSV input label text')

    expect(inputNode.getAttribute('disabled')).toBeDefined()
  })
})
