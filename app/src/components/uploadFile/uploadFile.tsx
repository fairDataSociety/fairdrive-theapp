import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../store/themeContext/themeContext';
import { StoreContext } from '../../store/store';
import ButtonPill from '../buttonPill/buttonPill';
import useStyles from './uploadFileStyles';
import TextField from '../textField/textField';

export interface Props {
  file: any;
  setUploadRes: any;
}

function ShareFile(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [filename, setFilename] = useState('');

  const classes = useStyles({ ...props, ...theme });
  const handleSetFilename = (e: any) => {
    setFilename(e.target.value);
  };
  function handleSubmit(e: any) {
    if (e.charCode === 13) {
      shareFile();
    }
  }
  useEffect(() => {
    props.setUploadRes(state.fileUploaded);
  }, [props, state.fileUploaded]);

  const shareFile = async () => {
    try {
      // await actions.sendFile({
      //   file: props.file,
      //   filename: filename,
      // });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.dialogBox}>
      <div className={classes.title}>Save file</div>
      <div className={classes.flexer}></div>
      <TextField
        placeholder="File name"
        type="text"
        setProp={setFilename}
        propValue={filename}
        onContinue={shareFile}
      ></TextField>
      <div className={classes.flexer}></div>
      <ButtonPill text={'Save file'} clickFunction={shareFile}></ButtonPill>
    </div>
  );
}

export default React.memo(ShareFile);
