import React from "react";
import { useLocation } from "react-router-dom";

const MakeAPlaylist4 = () => {
  const location = useLocation();
  const { responseData } = location.state || {};

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    background: "#004c8c",
    color: "#ffffff",
    padding: "10px",
    textAlign: "left",
  };

  const tdStyle = {
    border: "1px solid #dddddd",
    padding: "8px",
    textAlign: "left",
  };

  return (
    <div className="styled-container">
      <h2 className="instruction-text">Data Received</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Position</th>
            <th style={thStyle}>SongName</th>
            <th style={thStyle}>Artist</th>
            <th style={thStyle}>Rankscore</th>
          </tr>
        </thead>
        <tbody>
          {responseData.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, valueIndex) => (
                <td style={tdStyle} key={valueIndex}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MakeAPlaylist4;
