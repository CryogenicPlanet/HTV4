import React from 'react';
import './css/user.css'

import { Grid, Image, Button } from 'semantic-ui-react'

const food = [
	{ name: 'banana', expiryDate: '01/01/01', quantity: 3},
	{ name: 'apple', expiryDate: '01/01/01', quantity: 10},
	{ name: 'milk', expiryDate: '01/01/01', quantity: 3},
	{ name: 'bread', expiryDate: '01/01/01', quantity: 1},
]

const foodLog = [ 
	{ lastin: '01/01/01', lastout: '02/02/02', user: 'Matthew' },
	{ lastin: '01/01/012', lastout: '02/02/02', user: 'Mandy' },
	{ lastin: '01/01/0555', lastout: '02/02/02', user: 'Sue'},
]

class GridExampleDividedNumber extends React.Component {

	constructor(props) {
		super(props)
		this.state = { food: this.props.food, currentUser: this.props.currentUser }
	}

	render() {
		return (

			<div>
		<div className="BackButton">
			<Button onClick={this.props.addTrip} color='red'>Back</Button>
		</div>

		<Grid columns={3} divided>
			<Grid.Row>
				<Grid.Column>
					<h3 className="UserTitle">
					Food
					</h3>
					{/* <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' /> */}
				</Grid.Column>
				<Grid.Column>
					<h3 className="UserTitle">Expiry Date</h3>
					{/* <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' /> */}
				</Grid.Column>
				<Grid.Column>
					<h3 className="UserTitle">Quantity</h3>
					{/* <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' /> */}
				</Grid.Column>
			</Grid.Row>

			{this.state.food.map(({_id, expiry, owner_name, name, quantity, quantity_type}) => {
				let date = new Date(expiry)
				quantity_type = quantity_type == null ? '' : quantity_type
				if(owner_name == this.state.currentUser) {
					return(
							<Grid.Row>
								<Grid.Column>
									{name}
								</Grid.Column>
								<Grid.Column>
									{date.toLocaleDateString()}
								</Grid.Column>
								<Grid.Column>
									{ quantity + " " + quantity_type}
								</Grid.Column>
							</Grid.Row>

					)
				}
			})}

		</Grid>
	</div>

		)
	}
	
}

export default GridExampleDividedNumber