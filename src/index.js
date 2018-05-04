import React from 'react';
import { string, func, element, oneOfType } from 'prop-types';
const PapaParse = require('papaparse/papaparse.min.js');

const CSVReader = ({ cssClass = 'csv-reader-input', label, onFileLoaded, onError }) => {
  let fileContent = undefined;

  const handleChangeFile = e => {
    let reader = new FileReader();
    const filename = e.target.files[0].name;

    reader.onload = event => {
      const csvData = PapaParse.parse(event.target.result, {
        error: onError
      });
      onFileLoaded(csvData.data, filename);
    };

    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className={cssClass}>
      {label && <label>{label}</label>}
      <input className="csv-input" type="file" accept="text/csv" onChange={e => handleChangeFile(e)} />
    </div>
  );
};

CSVReader.propTypes = {
  cssClass: string,
  label: oneOfType([string, element]),
  onFileLoaded: func,
  onError: func
};

export default CSVReader;
