import React from 'react';

import { FilePreviewInfo } from './types';
import FilePreviewImage from './filePreviewImage';
import FilePreviewFallback from './filePreviewFallback';
import FilePreviewVideo from '../../extensions/etherna/components/filePreviewVideo/filePreviewVideo';

type FilePreviewProps = FilePreviewInfo & {
  contentType: string;
};

function FilePreview({
  contentType,
  filename,
  directory,
  podName,
}: FilePreviewProps): JSX.Element {
  const extensionsTypes = Object.keys(FilePreview.extensions);
  const extensionType = extensionsTypes.find((type) =>
    new RegExp(type).test(contentType)
  );

  if (extensionType) {
    const ExtensionComponent = FilePreview.extensions[
      extensionType
    ] as React.FC<FilePreviewInfo>;

    return (
      <ExtensionComponent
        filename={filename}
        directory={directory}
        podName={podName}
      />
    );
  }

  if (contentType.includes('image')) {
    return (
      <FilePreviewImage
        filename={filename}
        directory={directory}
        podName={podName}
      />
    );
  }

  return <FilePreviewFallback />;
}

// Extensions ------
FilePreview.extensions = {
  'video/*': FilePreviewVideo,
};
// -----------------

export default FilePreview;
