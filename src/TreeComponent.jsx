// TreeComponent.js
import React from 'react';
import TreeNode from './TreeNode';

const TreeComponent = ({ data }) => {
  return (
    <div>
      {data.map((node, index) => (
        <TreeNode key={index} node={node} />
      ))}
    </div>
  );
};

export default TreeComponent;
