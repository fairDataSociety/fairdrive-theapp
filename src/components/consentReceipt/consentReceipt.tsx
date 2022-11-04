/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import useStyles from './consentReceiptStyles';
import { ConsentViewer } from '@datafund/consent-viewer';
import ThemeContext from '@context/ThemeContext';
export interface Props {
  data: Blob;
}
function ConsentReceipt(props: Props) {
  const [dataRes, setDataRes] = useState(null);
  const readJSON = async (file: Blob) => {
    const req = await URL.createObjectURL(file);
    const res = await fetch(req);
    setDataRes(JSON.parse(await res.text()));
  };
  useEffect(() => {
    if (props.data) {
      readJSON(props.data);
    }
  }, [props.data, localStorage]);

  return <div>{dataRes && <ConsentViewer data={dataRes}></ConsentViewer>}</div>;
}

export default React.memo(ConsentReceipt);
