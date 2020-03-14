import React from 'react'
import { object, string, bool, func, element, oneOfType } from 'prop-types'
import PapaParse from 'papaparse'

const CSVReader = ({
  accept = '.csv, text/csv',
  cssClass = 'csv-reader-input',
  cssInputClass = 'csv-input',
  fileEncoding = 'UTF-8',
  inputId = 'react-csv-reader-input',
  inputStyle = {},
  label,
  onError,
  onFileLoaded,
  parserOptions = {},
  disabled = false,
}) => {
  const handleChangeFile = e => {
    let reader = new FileReader()
    if (e.target.files.length > 0) {
      const filename = e.target.files[0].name

      reader.onload = event => {
        const csvData = PapaParse.parse(
          event.target.result,
          Object.assign(parserOptions, {
            error: onError,
            encoding: fileEncoding,
          }),
        )
        onFileLoaded(csvData.data, filename)
      }

      reader.readAsText(e.target.files[0], fileEncoding)
    }
  }

  return (
    <div className={cssClass}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        className={cssInputClass}
        type="file"
        id={inputId}
        style={inputStyle}
        accept={accept}
        onChange={e => handleChangeFile(e)}
        disabled={disabled}
      />
    </div>
  )
}

CSVReader.propTypes = {
  accept: string,
  cssClass: string,
  cssInputClass: string,
  fileEncoding: string,
  inputId: string,
  inputStyle: object,
  label: oneOfType([string, element]),
  onError: func,
  onFileLoaded: func.isRequired,
  parserOptions: object,
  disabled: bool,
}

export default CSVReader
