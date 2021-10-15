import React, { useEffect, useState } from 'react';
import FilePreviewFallback from 'src/components/filePreview/filePreviewFallback';
import { previewFile } from 'src/services/file';

import useStyles from './filePreviewTextualStyles';

type FilePreviewTextualProps = {
  file?: any;
  directory?: string;
  podName?: string;
  isQueueItem: boolean;
  isPreviewSidebar?: boolean;
};

const FilePreviewTextual: React.FC<FilePreviewTextualProps> = ({
  file,
  directory,
  podName,
  isQueueItem,
  isPreviewSidebar,
}) => {
  const classes = useStyles();
  const [previewText, setPreviewText] = useState<string>('Loading...');

  const loadPreview = async () => {
    // const imgSrc = window.URL.createObjectURL(
    const data = await previewFile(file.name, directory, podName);
    // );

    if (file.name.endsWith('.html') || file.name.endsWith('.html')) {
      const el = document.createElement('html');
      el.innerHTML = await (data as Blob).text();

      const preview = `${el.querySelector('title')?.text}`;

      return preview;
    }

    return await (data as Blob).slice(1, 20).text();
  };

  useEffect(() => {
    loadPreview().then((preview) => {
      setPreviewText(preview + '...');
    });
  }, []);

  return (
    <div className={classes.videoPreview}>
      <FilePreviewFallback
        file={file}
        isQueueItem={isQueueItem}
        isPreviewSidebar={isPreviewSidebar}
      />
      {!isQueueItem && (
        <>
          <br />
          <br />
          <h1>{previewText}</h1>
        </>
      )}
    </div>
  );
};

export default FilePreviewTextual;
