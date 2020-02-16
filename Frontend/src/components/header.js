import React from 'react';
import './css/header.css';
import { Header } from 'semantic-ui-react';

function header() {
	return (
		<div className="header">
			{/* <KitchenIcon className="header-icon"/>

			My Fridge */}
			{/* <KitchenIcon style={{color:white}} /> */}

		<Header className="HeaderFont" as='h1' icon='food' content="My Fridge" color='' />

					{/* <Navbar bg="light" variant="dark">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src="/logo.svg"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      React Bootstrap
    </Navbar.Brand>
  </Navbar> */}
			
		</div>
	)
}

export default header;