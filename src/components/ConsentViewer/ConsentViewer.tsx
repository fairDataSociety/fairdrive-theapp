import { FC } from 'react';
import classes from './ConsentViewer.module.scss';

interface ConsentViewerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

const ConsentViewerEntry: FC<ConsentViewerProps> = ({ data }) => {
  if (typeof data === 'object') {
    if (data) {
      return <ConsentViewerTable data={data} />;
    } else {
      return <span className={classes.null}>null</span>;
    }
  } else if (typeof data === 'boolean') {
    return <span className={classes.boolean}>{data ? 'true' : 'false'}</span>;
  } else if (typeof data == 'string') {
    return <span className={classes.string}>{data}</span>;
  } else {
    return data.valueOf();
  }
};

const ConsentViewerTable: FC<ConsentViewerProps> = ({ data }) => {
  return (
    <table className="table">
      <tbody>
        {Object.keys(data).map((key) => (
          <tr key={key}>
            <th>{key}</th>
            <td>
              <ConsentViewerEntry data={data[key]} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ConsentViewer: FC<ConsentViewerProps> = ({ data }) => {
  return (
    <div className={classes.consentViewerContainer}>
      <div className="table-responsive">
        <ConsentViewerTable data={data} />
      </div>
    </div>
  );
};

export default ConsentViewer;
