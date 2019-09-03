import React from 'react';
import { string, func, element, oneOfType } from 'prop-types';
const PapaParse = require('papaparse/papaparse.min.js');

const CSVReader = ({
  accept = '.csv, text/csv',
  cssClass = 'csv-reader-input',
  cssInputClass = 'csv-input',
  label,
  onFileLoaded,
  onError,
  inputId = null,
  inputStyle = {},
  fileEncoding = 'UTF-8',
  parserOptions = {}
}) => {
  let fileContent = undefined;

  const handleChangeFile = e => {
    let reader = new FileReader();
    if (e.target.files.length > 0) {
      const filename = e.target.files[0].name;

      reader.onload = event => {
        const csvData = PapaParse.parse(
          event.target.result,
          Object.assign(parserOptions, {
            error: onError,
            encoding: fileEncoding
          })
        );
        onFileLoaded(csvData.data, filename);
      };

      reader.readAsText(e.target.files[0], fileEncoding);
    }
  };

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
      />
    </div>
  );
};

CSVReader.propTypes = {
  cssClass: string,
  cssInputClass: string,
  label: oneOfType([string, element]),
  onFileLoaded: func.isRequired,
  onError: func,
  inputId: string
};

export default CSVReader;
