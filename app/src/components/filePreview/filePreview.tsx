import React from "react";

import { FilePreviewInfo } from "./types";
import FilePreviewImage from "./filePreviewImage";
import FilePreviewFallback from "./filePreviewFallback";
import FilePreviewVideo from "../../extensions/etherna/components/filePreviewVideo/filePreviewVideo";
import FilePreviewTextual from "src/extensions/etherna/components/filePreviewTextual/filePreviewTextual";

type FilePreviewProps = FilePreviewInfo & {
  contentType: string;
  file: any;
};

function FilePreview({
  contentType,
  filename,
  directory,
  podName,
  file,
}: FilePreviewProps) {
  const extensionsTypes = Object.keys(FilePreview.extensions);
  const extensionType = extensionsTypes.find((type) =>
    new RegExp(type).test(contentType)
  );

  if (file.name.endsWith(".txt") || file.name.endsWith(".log") || file.name.endsWith(".html")) {
    return (
      <FilePreviewTextual file={file} directory={directory} podName={podName} />
    );
  }

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

  return <FilePreviewFallback file={file} />;
}

// Extensions ------
FilePreview.extensions = {
  "video/*": FilePreviewVideo,
};
// -----------------

export default FilePreview;
