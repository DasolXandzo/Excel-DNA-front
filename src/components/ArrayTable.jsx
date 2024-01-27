import React, { useState } from 'react';
import cl from './ArrayTable.module.css';

const ArrayTable = ({ treeData }) => {
  const [collapsedRows, setCollapsedRows] = useState([]);


// check parametrs for slice Name
//----------------------------------------------------------
function findBracketPairIndexes(input) {
  let openBracketIndex = -1;
  let closeBracketIndex = -1;
  let bracketSum = 0;

  for (let i = 0; i < input.length; i++) {
      if (input[i] === '(') {
          if (openBracketIndex === -1) {
              openBracketIndex = i;
          }
          bracketSum++;
      } else if (input[i] === ')') {
          bracketSum--;
          if (bracketSum === 0) {
              closeBracketIndex = i;
              break;
          }
      }
  }

  if (openBracketIndex !== -1 && closeBracketIndex !== -1) {
      console.log(openBracketIndex, ',', closeBracketIndex);
      let regexEN = /^-*[A-Z]+\(.+\)$/;
      let regexRU = /^-*[А-Я]+\(.+\)$/;
      if ((regexEN.test(input) || regexRU.test(input)) && openBracketIndex == input.indexOf('(') && closeBracketIndex == input.lastIndexOf(')'))
      {
        //console.log("true");
        return true;
      } else{
        //console.log("false");
        return false;
      }

  } else {
    //console.log("pair doesn't find");
  }
}
//----------------------------------------------------------

  const toggleCollapse = (index) => {
    setCollapsedRows((prevCollapsedRows) => {
      if (prevCollapsedRows.includes(index)) {
        return prevCollapsedRows.filter((i) => i !== index);
      } else {
        return [...prevCollapsedRows, index];
      }
    });
  };

  const handleDivClick = (event) => {
    const divElement = event.target;
    console.log("td")
    // Проверяем, является ли элемент div
    if (divElement.tagName.toLowerCase() === 'td') {
      const rect = divElement.getBoundingClientRect();
      const divInfo = {
        formula: divElement.innerHTML.substring(divElement.innerHTML.lastIndexOf(">") + 1),
        tagName: divElement.tagName,
        id: divElement.id,
        className: divElement.className,
        dimensions: {
          width: rect.width,
          height: rect.height,
        },
        // Другие данные, которые вы хотите отправить
      };
      console.log(divInfo);
      // Отправляем информацию о div в window.chrome.webview
      window.chrome.webview.postMessage(JSON.stringify(divInfo));
    }
  };

  const renderRows = (nodes, parentIndex = '') => {
    return nodes.map((node, index) => (
      <React.Fragment key={parentIndex + '-' + index}>
        <tr onClick={handleDivClick} className={cl.tr_body}>
          <td
            style={{
              paddingLeft: node.Depth * 20,
              display: 'flex',
              alignItems: 'center',
              width: `${604 - node.Depth * 20}px`,
            }}
            //onClick={() => toggleCollapse(parentIndex + '-' + index)}
          >
            {/* если есть дочерние элементы, то добавляем активную кнопку для эффекта коллапса */}
            {node.Childrens.length != 0 && (
              <button
              className={`${"collapse-btn"} ${cl.collapse_btn}`}
              onClick={() => toggleCollapse(parentIndex + '-' + index)}
              >
                {collapsedRows.includes(parentIndex + '-' + index) ? '+' : '-'}
              </button>
            )}

            {/* если нет дочерних элементов, то добавляем ёбанный костыль - кнопку-заглушку, чтобы отступы не ехали */}
            {node.Childrens.length == 0 && (<button className={cl.fake_btn}>+</button>)}
            {findBracketPairIndexes(node.Name) && node.Depth>0 ? node.Name.split('(')[0] : node.Name}
          </td>
          <td style={{ textAlign: 'center' }}>{node.Result}</td>
          <td style={{ textAlign: 'center' }}>{node.Depth}</td>
        </tr>
        {!collapsedRows.includes(parentIndex + '-' + index) &&
          node.Childrens &&
          node.Childrens.length > 0 && (
            renderRows(node.Childrens, parentIndex + '-' + index)
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