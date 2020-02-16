import React from 'react';
import Cards from './card';
import User from './user';
import { Card, Button, Image } from 'semantic-ui-react'
import axios from '../utils/axios'


class card2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isEmptyState: true, data: {owners: []}, food: ['', ''], currentUser: '' };
	}

	async componentDidMount() {

		try {

			let response = await axios.post('http://35.188.12.206:3000/api/fridge/', {
				fridge_id: "5e4841f262aab71b6635b4fe"
			})

			for(var prop in response.data.owners) {
				response.data.owners[prop].count = 0;
				for(var prop1 in response.data.food) {
					if(response.data.owners[prop]._id == response.data.food[prop1].owner_id) {
						response.data.food[prop1].owner_name = response.data.owners[prop].name
						response.data.owners[prop].count = response.data.owners[prop].count == null ? 0 : response.data.owners[prop].count + 1
					}
				}

			}
			this.setState({data: response.data, currentUser: response.data.owners[0].name})
			this.renderCard()
			console.log(this.state.data)
		}
		catch(err) {
			console.log(err)
		}
		
	}

	renderCard() {
		return(
<Card.Group items={this.state.data.owners} centered='true'>
		{this.state.data.owners.map(({name, _id, count}) => {
			return(
				<Card className="card">
					<Card.Content>
						<Image 
							floated='right'
							size='mini'
							src={"https://react.semantic-ui.com/images/avatar/large/jenny.jpg"}
						/>
						<Card.Header textAlign='left'>{name}</Card.Header>
						<Card.Meta textAlign='left'>Healthy level: {_id}</Card.Meta>
						<Card.Description>Food count: {count}</Card.Description>
					</Card.Content>
					<Card.Content extra>
        		<div className='ui two buttons'>
          		<Button onClick={e => this.triggerAddTripState(e)} color='olive'>
            	View Food
          		</Button>
    
        		</div>
      		</Card.Content>
				</Card>

			)
		})
		}
  </Card.Group>		)
	}

	triggerAddTripState = (e) => {
		this.state.isEmptyState ? this.setState({isEmptyState: false, isAddTripState: true}) : this.setState({isEmptyState: true, isAddTripState: false})
		if(e.target.textContent == 'View Food') this.setState({currentUser: e.target.parentNode.parentNode.parentNode.children[0].children[1].textContent})
  }

	render() {
		return(
			<div>
      {this.state.isEmptyState && <Cards currentUser={this.state.currentUser} users={this.state.data.owners} food={this.state.data.food} addTrip={this.triggerAddTripState}/>}

      {this.state.isAddTripState && <User currentUser={this.state.currentUser} users={this.state.data.owners} food={this.state.data.food} addTrip={this.triggerAddTripState}/>}
    </div>
		)
		// <Button onClick={this.state.a=false}>Press</Button>
	}
}

export default card2;