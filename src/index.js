import React from 'react';
import { string, func, element, oneOfType } from 'prop-types';
const PapaParse = require('papaparse/papaparse.min.js');

const CSVReader = ({
  cssClass = 'csv-reader-input',
  cssInputClass = 'csv-input',
  label,
  onFileLoaded,
  onError,
  inputId = null,
  inputStyle = {},
  parserOptions = {}
}) => {
  let fileContent = undefined;

  const handleChangeFile = e => {
    let reader = new FileReader();
    const filename = e.target.files[0].name;

    reader.onload = event => {
      const csvData = PapaParse.parse(
        event.target.result,
        Object.assign(parserOptions, {
          error: onError
        })
      );
      onFileLoaded(csvData.data, filename);
    };

    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className={cssClass}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        className={cssInputClass}
        type="file"
        id={inputId}
        style={inputStyle}
        accept=".csv, text/csv"
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
