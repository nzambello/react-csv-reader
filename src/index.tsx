import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as PapaParse from 'papaparse'

export interface IFileInfo {
  name: string
  size: number
  type: string
}

export interface CSVReaderProps {
  accept?: string
  cssClass?: string
  cssInputClass?: string
  fileEncoding?: string
  inputId?: string
  inputStyle?: object
  label?: string | React.ReactNode
  onError?: (error: Error) => void
  onFileLoaded: (data: Array<any>, fileInfo: IFileInfo) => any
  parserOptions?: object
  disabled?: boolean
}

const CSVReader: React.FC<CSVReaderProps> = ({
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
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader: FileReader = new FileReader()
    const files: FileList = e.target.files
    if (files.length > 0) {
      const fileInfo: IFileInfo = {
        name: files[0].name,
        size: files[0].size,
        type: files[0].type,
      }

      reader.onload = (event: Event) => {
        const csvData = PapaParse.parse(
          reader.result as string,
          Object.assign(parserOptions, {
            error: onError,
            encoding: fileEncoding,
          }),
        )
        onFileLoaded(csvData.data, fileInfo)
      }

      reader.readAsText(files[0], fileEncoding)
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
  accept: PropTypes.string,
  cssClass: PropTypes.string,
  cssInputClass: PropTypes.string,
  fileEncoding: PropTypes.string,
  inputId: PropTypes.string,
  inputStyle: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onError: PropTypes.func,
  onFileLoaded: PropTypes.func.isRequired,
  parserOptions: PropTypes.object,
  disabled: PropTypes.bool,
}

export default CSVReader
