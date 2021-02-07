import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import styles from "styles.module.css";
import createAccount from "../account-create.module.css";
import PropTypes from "prop-types";

export interface Props {
  avatar: any;
  setAvatar: any;
  exitStage: any;
}
function ChooseAvatar(props: Props) {
  let editor: any;
  const [avatarState, setAvatarState] = useState({
    image: props.avatar,
    allowZoomOut: false,
    position: {
      x: 0.5,
      y: 0.5,
    },
    scale: 1,
    rotate: 0,
    borderRadius: 200,
    preview: {},
    width: 128,
    height: 128,
  });

  const handleSave = (data: any) => {
    const img = editor.getImageScaledToCanvas().toDataURL();
    const rect = editor.getCroppingRect();
    avatarState.preview = {
      img,
      rect,
      scale: avatarState.scale,
      width: avatarState.width,
      height: avatarState.height,
      borderRadius: avatarState.borderRadius,
    };
  };

  const handleScale = (e: any) => {
    const scale = parseFloat(e.target.value);
    avatarState.scale = scale;
    setAvatarState(avatarState);
  };

  const handleNewImage = (e: any) => {
    avatarState.image = e.target.files[0];
    setAvatarState(avatarState);
  };

  const rotateRight = (e: any) => {
    e.preventDefault();
    avatarState.rotate = avatarState.rotate + 90;
    setAvatarState(avatarState);
  };

  const handlePositionChange = (position: any) => {
    avatarState.position = position;
    setAvatarState(avatarState);
  };

  const onClickSave = () => {
    if (editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = editor.getImageScaledToCanvas();
      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      // const canvasScaled = editor.getImageScaledToCanvas();
      const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
      console.log(dataUrl);
      props.setAvatar(canvas.toDataURL("image/jpeg", 0.82));
      props.exitStage();
    }
  };

  const setEditorRef = (_editor: any) => (editor = _editor);

  return (
    <div className={createAccount.formcontainer}>
      <div className={createAccount.avatareditor}>
        <div className={styles.rotateicon} onClick={rotateRight} />
        <AvatarEditor
          ref={setEditorRef}
          scale={Number(avatarState.scale)}
          width={avatarState.width}
          height={avatarState.height}
          position={avatarState.position}
          onPositionChange={handlePositionChange}
          rotate={Number(avatarState.rotate)}
          borderRadius={avatarState.borderRadius}
          image={avatarState.image}
        />
      </div>
      <div className={createAccount.sliderbox}>
        <input
          name="scale"
          type="range"
          onChange={handleScale}
          min={"1"}
          max="3"
          step="0.01"
          defaultValue="1.2"
        />
      </div>
      <div className={createAccount.subtitle}>
        scroll to zoom - drag to move
      </div>
      <label className={createAccount.link} onClick={setEditorRef}>
        choose another file
      </label>
      <input
        hidden={true}
        name="newImage"
        id="newFile"
        accept=".jpg, .jpeg, .png, .gif"
        type="file"
        onChange={handleNewImage}
        className={createAccount.fileinput}
      />
      <div className={styles.button} onClick={onClickSave}>
        <div>
          <div className={styles.buttontext}>set avatar</div>
        </div>
      </div>
      <div className={createAccount.flexer}></div>
      <div className={createAccount.link}>Cancel</div>
    </div>
  );
}
export default React.memo(ChooseAvatar);
