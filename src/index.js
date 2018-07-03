import React from 'react';
import { string, func, element, oneOfType } from 'prop-types';
import './styles.css';
const PapaParse = require('papaparse/papaparse.min.js');

const CSVReader = ({
  cssClass = 'csv-reader',
  proxyButtonCssClass = 'csv-reader-proxy-button',
  proxyContainerCssClass = 'csv-reader-proxy-container',
  proxyInputCssClass = 'csv-reader-proxy-input',
  label,
  onFileLoaded,
  onError,
  inputId = null
}) => {
  let fileContent = undefined;
  let fileInputRef = null;

  const handleChangeFile = e => {
    handleImportFiles(e.target.files);
  };

  const handleImportFiles = files => {
    let reader = new FileReader();
    const filename = files[0].name;
    reader.onload = event => {
      const csvData = PapaParse.parse(event.target.result, {
        error: onError
      });
      onFileLoaded(csvData.data, filename);
    };

    reader.readAsText(files[0]);
  };

  const handleClick = e => {
    fileInputRef.click();
  };

  const handleFileDrop = e => {
    e.preventDefault();
    handleImportFiles(e.dataTransfer.files);
  };

  const handleDragStart = e => {
    e.preventDefault();
  };

  return (
    <div style={proxyContainerCssClass} className={cssClass}>
      <button
        style={proxyButtonCssClass}
        className="proxy-input"
        type="button"
        onClick={handleClick}
        onDrop={handleFileDrop}
        onDragOver={handleDragStart}
      />
      {label && <label for={inputId}>{label}</label>}
      <input
        style={proxyInputCssClass}
        className="csv-input"
        type="file"
        id={inputId}
        accept="text/csv"
        ref={ref => (fileInputRef = ref)}
        onChange={e => handleChangeFile(e)}
      />
    </div>
  );
};

CSVReader.propTypes = {
  cssClass: string,
  proxyButtonCssClass: string,
  proxyContainerCssClass: string,
  proxyInputCssClass: string,
  label: oneOfType([string, element]),
  onFileLoaded: func,
  onError: func,
  inputId: string
};

export default CSVReader;
