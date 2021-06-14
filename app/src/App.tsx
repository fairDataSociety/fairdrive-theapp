import React from 'react';
import { StoreProvider } from './store/store';
import { ThemeProvider } from './store/themeContext/themeContext';
import MainWrapper from './containers/MainWrapper';

const App = () => {
	return (
		<StoreProvider>
			<ThemeProvider>
				<MainWrapper />
			</ThemeProvider>
		</StoreProvider>
	);
};

export default App;
