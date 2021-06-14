import React, { useContext } from 'react';
import { ThemeContext } from '../../store/themeContext/themeContext';
import { StoreContext } from '../../store/store';
import useStyles from './sidebarLinkStyles';
import { NavLink } from 'react-router-dom';

export interface Props {
	Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	title: string;
	path: string;
}

function SidebarLink(props: Props) {
	const { state, actions } = useContext(StoreContext);
	const { theme } = useContext(ThemeContext);
	const { Icon, title, path } = props;
	const classes = useStyles({ ...props, ...theme });

	return (
		<NavLink
			activeClassName={classes.activeSidebarLink}
			className={classes.SidebarLink}
			to={path}>
			<Icon className={classes.Icon} />
			{title}
		</NavLink>
	);
}

export default React.memo(SidebarLink);
