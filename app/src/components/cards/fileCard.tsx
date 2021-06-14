import React, { useEffect, useState } from 'react';
import CardWrapper from './cardWrapper/cardWrapper';
import CardHeader from './cardHeader/cardHeader';
import CardBody from './cardBody/cardBody';
import { InfoIcon, Folder } from '../icons/icons';
import { useHistory } from 'react-router-dom';
import prettyBytes from 'pretty-bytes';
import moment from 'moment';
type Sizes = 'small' | 'regular' | 'big';
export interface Props {
	size?: Sizes;
	file: any;
}

function FileCard(props: Props) {
	const { file } = props;

	const history = useHistory();
	async function onFileClick() {
		if (file.content_type === 'inode/directory') {
			history.push(`/drive/${file.name}`);
		}
	}

	const [fileSize, setFileSize] = useState('');
	const [fileCreateDate, setFileCreateDate] = useState('');
	const [fileModDate, setFileModDate] = useState('');
	const [Icon, setIcon] = useState(null);

	useEffect(() => {
		file.content_type === 'inode/directory'
			? setIcon(Folder)
			: setIcon(InfoIcon);
		if (file.size) {
			setFileSize(prettyBytes(parseInt(file.size)));
			setFileCreateDate(
				moment.unix(file.creation_time).format('DD/MM/YYYY HH:mm:ss')
			);
			setFileModDate(
				moment.unix(file.modification_time).format('DD/MM/YYYY HH:mm:ss')
			);
		}
	}, [file]);

	return (
		<CardWrapper onFileClick={onFileClick} size={props.size}>
			<CardHeader
				isDirectory={file.content_type === 'inode/directory'}
				Icon={Icon}
				heading={file.name}
			/>
			<CardBody fileSize={fileSize} dateCreated={fileCreateDate} />
		</CardWrapper>
	);
}

export default React.memo(FileCard);
