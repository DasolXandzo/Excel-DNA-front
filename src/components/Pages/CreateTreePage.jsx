import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import cl from './CreateTreePage.module.css';
import ArrayTable from '../ArrayTable';
import * as signalR from '@microsoft/signalr';

export default function CreateTreePage(props) {
  const [array, setArray] = useState([]);
  const [formulas, setFormulas] = useState();

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7108/chat", { transport: signalR.HttpTransportType.WebSockets, skipNegotiation: true })
      .build();
    console.log(hubConnection)
    hubConnection.on("Receive", async (message, username) => {
      console.log("as");
      console.log(message)
      const formulasObjectsArray = JSON.parse(message.replace(/\@/g, "#"));
      console.log(formulasObjectsArray);
      setArray([formulasObjectsArray]);
      console.log(array);
      setFormulas(formulasObjectsArray.Childrens[0].Name)
    });

    hubConnection.start()
      .then(() => {
        console.log("Connection started");
      })
      .catch((err) => {
        console.error("Error while establishing connection:", err);
      });
  }, []);


  //---------------------------------------------------------- props.lettersFormula.replace(/\ /g, "+")

  return (
    <div className={cl.treeFormBodyStyle}>
      <div className={cl.block}>
        <ArrayTable treeData={array} />
      </div>
      <div className={cl.footer_block}>
        <div className={cl.block}>
          <div className={cl.hedlineStyle}>Выбранная формула:</div>
          <div className={cl.scrollBlock}>{formulas}</div>
        </div>
      </div>
    </div>
  );
}
