import React from 'react';
import Home from './pages/Home'
import { Provider } from 'react-redux';
import { store } from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './pages/Search';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
