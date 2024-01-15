import React, { useState } from 'react';
import cl from './ArrayTable.module.css';

const ArrayTable = ({ treeData }) => {
  const [collapsedRows, setCollapsedRows] = useState([]);

  const toggleCollapse = (index) => {
    setCollapsedRows((prevCollapsedRows) => {
      if (prevCollapsedRows.includes(index)) {
        return prevCollapsedRows.filter((i) => i !== index);
      } else {
        return [...prevCollapsedRows, index];
      }
    });
  };

  const renderRows = (nodes, parentIndex = '') => {
    return nodes.map((node, index) => (
      <React.Fragment key={parentIndex + '-' + index}>
        <tr className={cl.tr_body}>
          <td
            style={{
              paddingLeft: node.depth * 20,
              display: 'flex',
              alignItems: 'center',
              width: `${604 - node.depth * 20}px`,
            }}
            //onClick={() => toggleCollapse(parentIndex + '-' + index)}
          >
            {/* если есть дочерние элементы, то добавляем активную кнопку для эффекта коллапса */}
            {node.children.length != 0 && (
              <button
              className={`${"collapse-btn"} ${cl.collapse_btn}`}
              onClick={() => toggleCollapse(parentIndex + '-' + index)}
              >
                {collapsedRows.includes(parentIndex + '-' + index) ? '+' : '-'}
              </button>
            )}

            {/* если нет дочерних элементов, то добавляем ёбанный костыль - кнопку-заглушку, чтобы отступы не ехали */}
            {node.children.length == 0 && (<button className={cl.fake_btn}>+</button>)}
            {node.name}
          </td>
          <td style={{ textAlign: 'center' }}>{node.result}</td>
          <td style={{ textAlign: 'center' }}>{node.depth}</td>
        </tr>
        {!collapsedRows.includes(parentIndex + '-' + index) &&
          node.children &&
          node.children.length > 0 && (
            renderRows(node.children, parentIndex + '-' + index)
          )}
      </React.Fragment>
    ));
  };

  return (
    <table className="table table-sm table-hover" style={{ width: '100%' }}>
      <colgroup>
        <col span="1" style={{ width: '64%' }}></col>
        <col span="1" style={{ width: '13%' }}></col>
        <col span="1" style={{ width: '13%' }}></col>
      </colgroup>
      <thead
        style={{
          backgroundColor: '#000000',
          color: '#ffffff',
        }}
      >
        <tr>
          <th>Name</th>
          <th>Result</th>
          <th>Depth</th>
        </tr>
      </thead>
      <tbody>{renderRows(treeData)}</tbody>
    </table>
  );
};

export default ArrayTable;