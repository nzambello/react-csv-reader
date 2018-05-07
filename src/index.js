import React from 'react';
import { string, func, element, oneOfType } from 'prop-types';
import PapaParse from 'papaparse/papaparse.min';

const CSVReader = ({ cssClass = 'csv-reader-input', label, onFileLoaded, onError }) => {
  const handleChangeFile = e => {
    handleFileContents(e.target.files[0]);
  };

  const handleFileDrop = e => {
    handleFileContents(e.dataTransfer.files[0]);
  };

  const handleFileContents = file => {
    const reader = new FileReader();
    const filename = file.name;

    reader.onload = event => {
      const csvData = PapaParse.parse(event.target.result, {
        error: onError
      });
      onFileLoaded(csvData.data, filename);
    };

    reader.readAsText(file);
  };

  return (
    <div className={cssClass}>
      {label && <label>{label}</label>}
      <input className="csv-input" type="file" accept="text/csv" onChange={handleChangeFile} onDrop={handleFileDrop} />
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
