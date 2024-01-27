import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import cl from './CreateTreePage.module.css';
import ArrayTable from '../ArrayTable';
import * as signalR from '@microsoft/signalr';

export default function CreateTreePage(props) {
  const [array, setArray] = useState([]);
  const [user, setUser] = useState()

  useEffect(() => {
    const { userName } = queryString.parse(window.location.search);
    console.log(userName)
    setUser(userName)
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7108/chat", { transport: signalR.HttpTransportType.WebSockets, skipNegotiation: true })
      .build();
    console.log(hubConnection)
    hubConnection.on("Receive", async (message, username) => {
      if(username != user){
        console.log("error user")
        return;
      }
      console.log("as");
      console.log(message)
      const formulasObjectsArray = JSON.parse(message.replace(/\@/g, "#"));
      console.log(formulasObjectsArray);
      setArray(formulasObjectsArray);
    });
    hubConnection.on("ReceivePrivateMessage", async (username, message) => {
      console.log("private");
    });

    hubConnection.start()
      .then(() => {
        console.log("Connection started");
      })
      .catch((err) => {
        console.error("Error while establishing connection:", err);
      });
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

  function buildTree(array) {
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

  const inputArray = array.map((item) => ({
    name: item.Name,
    result: item.Result,
    depth: item.Depth,
    children: [],
  }));

  const tree = buildTree(inputArray);

  //----------------------------------------------------------

  return (
    <div className={cl.treeFormBodyStyle}>
      <div className={cl.block}>
        <ArrayTable treeData={tree} />
      </div>
      <div className={cl.footer_block}>
        <div className={cl.block}>
          <div className={cl.hedlineStyle}>Выбранная формула:</div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
