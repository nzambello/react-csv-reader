import React from "react"
import { func } from "prop-types"

const CSVReader = ({ onFileLoaded, onError }) => {
  return (
    <div>
      <p>Welcome to CSVReader</p>
    </div>
  )
}

CSVReader.propTypes = {
  onFileLoaded: func,
  onError: func
}

export default CSVReader
