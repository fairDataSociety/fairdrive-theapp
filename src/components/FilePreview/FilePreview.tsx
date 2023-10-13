import { Button } from '@components/Buttons';
import ConsentViewer from '@components/ConsentViewer/ConsentViewer';
import { useLocales } from '@context/LocalesContext';
import { FileItem } from '@fairdatasociety/fdp-storage';
import { FC, useEffect, useState } from 'react';

interface FilePreviewProps {
  file: FileItem;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
  pod: string;
  directory: string;
  onError: () => void;
}

const MAX_TEXT_PREVIEW_LENGTH = 500;

enum PreviewType {
  Consent,
  Text,
  Video,
  Image,
  Unknown,
}

const TEXT_FILE_EXTENSIONS = [
  '.txt',
  '.srt',
  '.log',
  '.csv',
  '.sub',
  '.md',
  '.json',
];

const IMAGE_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.svg', '.gif', '.bmp'];

const VIDEO_FILE_EXTENSIONS = [
  '.mpg',
  '.mp2',
  '.mpeg',
  '.mpe',
  '.mpv',
  '.ogg',
  '.webm',
  '.mp4',
  '.m4p',
  '.m4v',
  '.avi',
  '.wmv',
  '.mov',
  '.qt',
  '.flv',
  '.swf',
];

export function isFilePreviewSupported(fileName: string): boolean {
  return isTextFile(fileName) || isFileImage(fileName) || isFileVideo(fileName);
}

function isString(data: unknown): boolean {
  return typeof data === 'string';
}

function checkFileExtension(fileName: string, extensions: string[]): boolean {
  const lowercaseFileName = fileName.toLowerCase();
  return extensions.some((extension) => lowercaseFileName.endsWith(extension));
}

function isTextFile(fileName: string): boolean {
  return checkFileExtension(fileName, TEXT_FILE_EXTENSIONS);
}

function isFileImage(fileName: string): boolean {
  return checkFileExtension(fileName, IMAGE_FILE_EXTENSIONS);
}

function isFileVideo(fileName: string): boolean {
  return checkFileExtension(fileName, VIDEO_FILE_EXTENSIONS);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFileConsent(data: any): boolean {
  return (
    typeof data === 'object' &&
    typeof data.data_controller === 'object' &&
    Array.isArray(data.purpose) &&
    Array.isArray(data.sensitive) &&
    isString(data.jurisdiction) &&
    isString(data.moc) &&
    isString(data.sub) &&
    isString(data.notice) &&
    isString(data.policy_uri) &&
    isString(data.scopes) &&
    isString(data.iss) &&
    isString(data.jti)
  );
}

const FilePreview: FC<FilePreviewProps> = ({
  file,
  pod,
  directory,
  source,
  onError,
}) => {
  const { intl } = useLocales();
  const [type, setType] = useState<PreviewType | null>(null);
  const [content, setContent] = useState<unknown>(source);

  const preparePreview = async () => {
    try {
      const fileName = file.name;

      if (isFileVideo(fileName)) {
        setContent(window.URL.createObjectURL(source));
        return setType(PreviewType.Video);
      }

      if (isFileImage(fileName)) {
        setContent(window.URL.createObjectURL(source));
        return setType(PreviewType.Image);
      }

      if (isTextFile(fileName)) {
        const text = await source.text();

        if (fileName.endsWith('.json')) {
          const json = JSON.parse(text);

          if (isFileConsent(json)) {
            setType(PreviewType.Consent);
            return setContent(json);
          }
        }

        setContent(
          text.substring(0, MAX_TEXT_PREVIEW_LENGTH) +
            (text.length > MAX_TEXT_PREVIEW_LENGTH ? '...' : '')
        );
        return setType(PreviewType.Text);
      }

      throw new Error('Unknown type');
    } catch (error) {
      setType(PreviewType.Unknown);

      onError();
    }
  };

  useEffect(() => {
    preparePreview();
  }, [file, source]);

  if (type === PreviewType.Consent) {
    return (
      <>
        <div className="w-full h-auto my-10 rounded">
          <ConsentViewer data={content} />
        </div>
        {(!directory || !directory.includes('/')) && (
          <div className="mb-4">
            <Button
              type="button"
              variant="primary-outlined"
              label={intl.get('OPEN_CONSENT')}
              onClick={() => {
                window.open(
                  `${process.env.NEXT_PUBLIC_CONSENT_VIEWER}?pod=${pod}&file=${
                    directory && directory !== 'root' ? `${directory}/` : ''
                  }${file.name}`,
                  '_blank'
                );
              }}
            />
          </div>
        )}
      </>
    );
  }

  if (type === PreviewType.Text) {
    return (
      <p className="w-full h-auto my-10 max-h-48 overflow-auto text-color-accents-purple-black dark:text-color-shade-white-night">
        {content}
      </p>
    );
  }

  if (type === PreviewType.Video) {
    return (
      <video className="w-full h-auto my-10 rounded" controls>
        <source src={content as string} />
      </video>
    );
  }

  if (type === PreviewType.Image) {
    return (
      <img
        src={content as string}
        alt="Preview Image"
        className="w-full h-auto my-10 rounded"
        onError={onError}
      />
    );
  }

  return null;
};

export default FilePreview;
