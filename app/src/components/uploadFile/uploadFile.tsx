import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../store/themeContext/themeContext';
import { StoreContext } from '../../store/store';
import ButtonPill from '../buttonPill/buttonPill';
import useStyles from './uploadFileStyles';
import TextField from '../textField/textField';

export interface Props {
  file: FileList;
  setUploadRes: (data: boolean) => void;
}

function ShareFile(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [filename, setFilename] = useState('');

  const classes = useStyles({ ...props, ...theme });
  const handleSetFilename = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value);
  };
  function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
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
