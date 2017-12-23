import React from 'react';
import { string, func } from 'prop-types';
const PapaParse = require('papaparse/papaparse.min.js');

const CSVReader = ({ cssClass, onFileLoaded, onError }) => {
  let fileContent = undefined;

  const handleChangeFile = e => {
    let reader = new FileReader();

    reader.onload = event => {
      const csvData = PapaParse.parse(event.target.result, {
        error: onError
      });
      onFileLoaded(csvData.data);
    };

    reader.readAsText(e.target.files[0]);
  };

  return (
    <input
      className={cssClass ? cssClass : ''}
      type="file"
      id="fileElem"
      accept="text/csv"
      onChange={e => handleChangeFile(e)}
    />
  );
};

CSVReader.propTypes = {
  cssClass: string,
  onFileLoaded: func,
  onError: func
};

export default CSVReader;
