import React from 'react';

const ArrayTable = ({ dataArray }) => {
    console.log(dataArray);
  const renderRow = (row, index) => (
    <tr key={index}>
      <td style={{paddingLeft: (5 - row.Depth) * 20}}>{row.Name}</td>
      <td style={{textAlign: "center"}}>{row.Depth}</td>
      <td style={{textAlign: "center"}}>{row.Result}</td>
      {/* Добавьте дополнительные столбцы, если необходимо */}
    </tr>
  );

  return (
    <table style={{ width: '100%' }}>
      <colgroup>
        <col span="1" style={{ width: '50%' }}></col>
        <col span="1" style={{ width: '25%' }}></col>
        <col span="1" style={{ width: '25%' }}></col>
        {/* Добавьте дополнительные столбцы, если необходимо */}
      </colgroup>
      <thead>
        <tr>
          <th>Name</th>
          <th>Depth</th>
          <th>Result</th>
          {/* Добавьте заголовки для дополнительных столбцов, если необходимо */}
        </tr>
      </thead>
      <tbody>
        {dataArray.map(renderRow)}
      </tbody>
    </table>
  );
};

export default ArrayTable;
