import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '../../store/themeContext/themes';
import { Props } from './uploadModal';

const useStyles = makeStyles(() =>
	createStyles({
		modalContainer: {
			height: 'auto',
			width: '50rem',
			display:"flex",
			overflow: 'hidden',
			position: "relative",
			marginLeft: 'calc(100% - 45rem)',
			overflowX: 'hidden',
			overflowY: 'auto',
			flexDirection: 'column',
	
		},
		fileModal: {
			padding: '0rem 3.5rem 3.5rem 3.5rem',
			backgroundColor: (style: Props & Theme) => style.backgroundDark3,
			color: (style: Props & Theme) => style.textColorPrimary,
			border: '1px solid var(--dark3)',
			height: '100%',
			width: '45rem',
			margin: '0rem',
			justifyContent: 'flex-end',
			textAlign: 'center',
			// display: "flex",
			flexDirection: 'column',
			alignItems: 'left',
			cursor: 'pointer',
			overflowX: 'hidden',
			right: (props: Props & Theme) => props.open ? '25rem' : '0rem',
			transitionProperty: "right",
			transitionDuration: ".2s",
			transitionTimingFunction: "cubic-bezier(0.820, 0.085, 0.395, 0.895)",
			//overflowY: 'auto',
		},
		titleWrapper : {
			position:'relative',
			height: "5rem",
			width: "100%",
			flexDirection: "column",
			alignItems: "left",
			textAlign: 'left',
		},
		title: {
			marginTop: "2rem",
			padding: "1rem 1rem 0.5rem 0rem",
			font: (style: Props & Theme) => style.typography.h6,
			color: (style: Props & Theme) => style.textColorHoverSelected,
		},
		fileLocation: {
			font: (style: Props & Theme) => style.typography.caption2,
			color: (style: Props & Theme) => style.textColorSecondary,
		},
		headerWrapper: {
			padding: '2rem 2rem 2rem 0rem',
			width: "100%",
			flexDirection: "row",
			//marginBottom: "2rem",
			height:"4rem",
			display:"flex",
			position:'relative',
			marginBottom: "4rem",
			textAlign: 'left',
		},
		header: {
			font: (style: Props & Theme) => style.typography.body1,
			//margin: "2rem 1.5rem 2rem 0rem",
			float: 'left',
			width: "90%",
			margin: "1.5rem 1.5rem 1.5rem 0rem",
		},
		headerIcon: {
			float:'left',
			width: '2rem',
			margin: "1.7rem 1.5rem 1.5rem 0rem",
		},
		closeIcon: {
			float:'right',
			width: '2rem',
			marginTop:"2rem",
		},
		iconContainer: {
			width: '100%',
			height: '45rem',
			marginTop: "1rem",
			marginBottom: "3rem",
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			position:'relative',
			borderRadius: '50%',
		},
		imagePreview: {
			width: '100%',
			height: '45rem',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		Icon: {
			width: '8rem',
			height: '8rem',
			margin: 'auto',
		},
		fileInfoContainer: {
			font: (style: Props & Theme) => style.typography.body1,
			paddingTop: '3.5rem',
			display: 'flex',
			flexDirection: 'row',
			height: '20rem',
			width: '100%',
		},
		leftContainer: {
			display: 'flex',
			flexDirection: 'column',
			textAlign: 'left',
			width: '50%',
		},
		divider: {
		  borderBottom: "2.5px  solid var(--dark1)",
		  margin: "0rem 0rem 2rem 0rem",
		  position:'relative',
		},
		rightContainer: {
			display: 'flex',
			flexDirection: 'column',
			textAlign: 'right',
			width: '50%',
		},
		label: {
			font: (style: Props & Theme) => style.typography.body3,
			color: (style: Props & Theme) => style.textColorPrimary,
			marginBottom: "0.5rem"
		},
		value: {
			font: (style: Props & Theme) => style.typography.caption1,
			color: (style: Props & Theme) => style.textColorSecondary,
		},
		pair: {
			paddingBottom: '2rem',
		},
		icon : {
			width: "5rem",
			height: "5rem",
			boxSizing: 'border-box',
			borderRadius: (style: Props & Theme) => "0.5rem",
			cursor: 'pointer',
			border:"1px solid var(--light3)", 
			margin:"1.6rem",
			padding:"1rem",
			"&:hover": {
				//font: (style: Props & Theme) => style.typography.body3,
				border: "1px solid var(--white)", 
			  }, 
		},
		actionBar : {
			width: "100%",
			flexDirection: "row"
		},
		uploadInput: {
			opacity: '0',
			width: '0',
			height: '0',
		},
	})
);

export default useStyles;
