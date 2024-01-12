// TreeNode.js
import React from 'react';

const TreeNode = ({ node }) => {
  return (
    <div>
      <div>Name: {node.Name}</div>
      <div>Depth: {node.Depth}</div>
      <div>Result: {node.Result}</div>
      {node.children && (
        <div style={{ marginLeft: '20px' }}>
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
