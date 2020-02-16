import React from 'react'
import './css/card.css'
import { Card, Button, Image } from 'semantic-ui-react'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const CardExampleCard = (props) => (
  <Card.Group items={props.users} centered='true'>
		{props.users.map(({name, count, image, food}) => {
			return(
				<Card className="card">
					<Card.Content>
						<Image 
							floated='right'
							size='mini'
							src={image}
						/>
						<Card.Header textAlign='left'>{name}</Card.Header>
						<Card.Description>Food count: {count}</Card.Description>
					</Card.Content>
					<Card.Content extra>
        		<div className='ui two buttons'>
          		<Button onClick={props.addTrip} color='olive'>
            	View Food
          		</Button>
    
        		</div>
      		</Card.Content>
				</Card>

			)
		})
		}
		

  </Card.Group>
)

export default CardExampleCard;