import { makeStyles, createStyles } from '@material-ui/styles';
// import interface for component Props and Theme

const useStyles = makeStyles(() =>
	createStyles({
		Home: {
			height: 'calc(100vh - 6rem)',
			backgroundColor: 'transparent',
			position: 'absolute',
			display: 'flex',
			flexDirection: 'row',
			width: 'calc(100vw - 12rem)',
			top: '6rem',
		},
		buttonNavBar: {
			margin: '0 auto 0 0',
			height: '8rem',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-start',
		},
		cardGrid: {
			width: '100%',
			height: '100%',
		},
		uploadInput: {
			opacity: '0',
			width: '0',
			height: '0',
		},
		Icon: {
			width: '5rem',
			height: '5rem',
			margin: '0.5rem',
		},
		modalContainer: {
			marginLeft: 'calc(100% - 45rem)',
			overflowX: 'hidden',
			overflowY: 'auto',
		},
	})
);

export default useStyles;
