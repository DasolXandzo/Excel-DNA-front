import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import TreeComponent from './TreeComponent';
import TreeViewTable from './TreeViewTable';
import ArrayTable from './ArrayTable';

export default function DialigWindow(props) {

  // add some styles for Dialog window
  const bodyStyle = {fontSize: "16px"};
  const block = {marginBottom: "15px"};
  const hedlineStyle = {fontSize: "120%", fontWeight: "bold"};
  const treeHedlineStyle = {fontSize: "140%", fontWeight: "bold"};

  const [array,SetArray] = useState([]);

  useEffect(() => {
    // Получение параметра jsonString из URL
    console.log(props);
    const { jsonString } = queryString.parse(window.location.search);
    console.log(jsonString)

    if (jsonString) {
      // Преобразование JSON-строки в массив и установка состояния
      const formulasObjectsArray = JSON.parse(jsonString.replace(/\@/g, "+"));
      SetArray(formulasObjectsArray);
      console.log(formulasObjectsArray);
    }
  }, []);

  return (
    <div style={bodyStyle}>

      <div style={block}>
        <div style={hedlineStyle}>Выбранная формула:</div>
        <div>{props.lettersFormula.replace(/\@/g, "+")}</div>
      </div>

      <div style={block}>
        <div style={hedlineStyle}>Формула с подставленными значениями:</div>
        <div>{props.valuesFormula}</div>
      </div>

      <div style={block}>
        <div style={treeHedlineStyle}>Дерево функции</div>
        <TreeComponent data={array} />
        <ArrayTable dataArray={array} />
        {/*<Tree tree={array} />*/}
      </div>

    </div>
  )
}