import React, { useState, useRef, useEffect } from 'react';
import queryString from 'query-string';
import cl from './CreateTreePage.module.css';
import ArrayTable from '../ArrayTable';

export default function CreateTreePage(props) {

  const [array,SetArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8888/connection/');

        console.log(response)
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        SetArray(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


// convert array to tree
//----------------------------------------------------------
  class Node {
    constructor(name, result, depth) {
      this.name = name;
      this.result = result;
      this.depth = depth;
      this.children = [];
    }
  }
  
  function buildTree(inputArray) {
    const root = new Node("Root", 0, -1);
    const stack = [root];
  
    for (const item of inputArray) {
      const node = new Node(item.name, item.result, item.depth);
  
      while (stack.length > 1 && stack[stack.length - 1].depth >= node.depth) {
        stack.pop();
      }
  
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    }
  
    return root.children;
  }

  const inputArray = []
  for(var i=0; i<array.length; i++){
    inputArray.push({name: array[i].Name, result: array[i].Result, depth: array[i].Depth, children: []})
  }

  console.log(inputArray);

  const tree = buildTree(inputArray);

  console.log(tree);
//----------------------------------------------------------





  return (
    <div className={cl.treeFormBodyStyle}>

      <div className={cl.block}>
        <ArrayTable treeData={tree} />
      </div>

      <div className={cl.footer_block}>
        <div className={cl.block}>
          <div className={cl.hedlineStyle}>Выбранная формула:</div>
          <div>={props.lettersFormula.replace(/\ /g, "+")}</div>
        </div>
      </div>

    </div>
  )
}