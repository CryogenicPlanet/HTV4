import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Body from './components/body'

const items = [
	{ name: 'home', label: 'Home' },
	{ name: 'inventory', label: 'Inventory'},
	{ name: 'settings', label: 'Settings'},
]

const users = [
	{ name: 'Mathew',
		healthylevel: '3',
		image: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
		food: 10},
	{ name: 'Mandy', 
		healthylevel: '1',
		image: 'https://react.semantic-ui.com/images/avatar/large/molly.png',
		food: 5},
	{ name: 'Sue', 
		healthylevel: '3',
		image: 'https://react.semantic-ui.com/images/avatar/large/jenny.jpg',
		food: 13},
]

function App() {

  return (
		<div className="Background">
			<div className="Header">
				<Header />
			</div>
			<div className="App">
				{/* <div className="Sidebar">
					<Sidebar items={items}/>

				</div> */}
					{/* <img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
				</header> */}
				<div className="Body">
					<div className="Card">

						<Body users={users}/>
					</div>

				</div>
			</div>

		</div>
  );
}

export default App;
