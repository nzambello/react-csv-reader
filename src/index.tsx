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
  cssLabelClass?: string
  fileEncoding?: string
  inputId?: string
  inputName?: string
  inputStyle?: object
  label?: string | React.ReactNode
  onError?: (error: Error) => void
  onFileLoaded: (data: Array<any>, fileInfo: IFileInfo, originalFile?: File) => any
  parserOptions?: PapaParse.ParseConfig
  disabled?: boolean
  strict?: boolean
}

const CSVReader = React.forwardRef<HTMLInputElement, CSVReaderProps>(
  (
    {
      accept = '.csv, text/csv',
      cssClass = 'csv-reader-input',
      cssInputClass = 'csv-input',
      cssLabelClass = 'csv-label',
      fileEncoding = 'UTF-8',
      inputId = 'react-csv-reader-input',
      inputName = 'react-csv-reader-input',
      inputStyle = {},
      label,
      onError = () => {},
      onFileLoaded,
      parserOptions = {} as PapaParse.ParseConfig,
      disabled = false,
      strict = false,
    },
    inputRef,
  ) => {
    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      let reader: FileReader = new FileReader()
      const files: FileList = e.target.files!

      if (files.length > 0) {
        const fileInfo: IFileInfo = {
          name: files[0].name,
          size: files[0].size,
          type: files[0].type,
        }

        if (strict && accept.indexOf(fileInfo.type) <= 0) {
          onError(new Error(`[strict mode] Accept type not respected: got '${fileInfo.type}' but not in '${accept}'`))
          return
        }

        reader.onload = (_event: Event) => {
          const csvData = PapaParse.parse(
            reader.result as string,
            Object.assign(parserOptions, {
              error: onError,
              encoding: fileEncoding,
            }),
          )
          onFileLoaded(csvData?.data ?? [], fileInfo, files[0])
        }

        reader.readAsText(files[0], fileEncoding)
      }
    }

    return (
      <div className={cssClass}>
        {label && (
          <label className={cssLabelClass} htmlFor={inputId}>
            {label}
          </label>
        )}
        <input
          className={cssInputClass}
          type="file"
          id={inputId}
          name={inputName}
          style={inputStyle}
          accept={accept}
          onChange={handleChangeFile}
          disabled={disabled}
          ref={inputRef}
        />
      </div>
    )
  },
)

CSVReader.propTypes = {
  accept: PropTypes.string,
  cssClass: PropTypes.string,
  cssInputClass: PropTypes.string,
  cssLabelClass: PropTypes.string,
  fileEncoding: PropTypes.string,
  inputId: PropTypes.string,
  inputName: PropTypes.string,
  inputStyle: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onError: PropTypes.func,
  onFileLoaded: PropTypes.func.isRequired,
  parserOptions: PropTypes.object,
  disabled: PropTypes.bool,
  strict: PropTypes.bool,
}

export default CSVReader
