import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './navbar/navbar';
import Sidebar from './sidebar/sidebar';
import Main from './main/main';
import Home from './home/home';
import Login from './../components/login/login';
import Register from './../components/register/register';
import SeedPhraseGen from './../components/seedPhraseGen/seedPhraseGen';
import SeedPhraseConfirm from './../components/seedPhraseConfirm/seedPhraseConfirm';
import Overview from './overview/overview';
import useStyles from './MainWrapperStyles';
import { useTheme } from '../store/themeContext/themeContext';

export default function MainWrapper() {
	const { theme } = useTheme();
	const classes = useStyles(theme);

	return (
		<Router>
			<div className={classes.App}>
				<Navbar />
				<Sidebar />

				<Switch>
					<Route exact path='/create' />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/' component={Main} />
					<Route exact path='/generate-seed' component={SeedPhraseGen} />
					<Route exact path='/confirm-seed' component={SeedPhraseConfirm} />
					<Route exact path='/drive/:path' component={Home} />
					<Route exact path='/explore' />
					<Route exact path='/overview' component={Overview} />
				</Switch>
			</div>
		</Router>
	);
}
