import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

import * as service from '../services';

import Toppings from './Toppings';
import Doughs from './Doughs';
import Address from './Address';
import ReviewOrder from './ReviewOrder';
import * as validations from '../validations';

import '../main.css';


const styles = theme => ({

});


class PizzaProcessStepper extends React.Component {

	constructor() {
		super();

		this.state = {
			activeStep: 0,
			doughs: [],
			toppings: [],
			address: {},
			dialogState: 'close'
		};
	}

	initializeState = () => {

		const doughs = this.state.doughs.slice();
		const toppings = this.state.toppings.slice();

		doughs.map(dough => { dough.qty =0});
		toppings.map(topping => { topping.qty =0});

		this.setState({
			activeStep: 0,
			doughs: doughs,
			toppings: toppings,
			address: {},
			dialogState: 'close'
		});

		this.stepChangeHandler();
	}

	componentDidMount() {
		service.fetchDoughs().then(doughs => {
			this.setState({ doughs });
		});
	}


	onQtyChanged = (items, id, qtyChangedValue, event, callForWhichOption) => {

		items.map(item => {
			if (item.id === id) {
				item.qty += qtyChangedValue;
			}

			return item;
		});

		// put array back to state

		switch (callForWhichOption) {
			case 'dough':
				this.setState({
					doughs: items
				});

				break;

			case 'topping':
				this.setState({
					toppings: items
				});

				break;
		}

		//raise it to the parent app for populating the badges
		const selectedItems = items.filter(item => {
			return item.qty > 0;
		});

		event(selectedItems);
	};


	onDoughQtyChanged = (id, qtyChangedValue) => {
		this.onQtyChanged(this.state.doughs.slice(), id, qtyChangedValue, this.props.onDoughQtyChanged, 'dough');
	};


	onToppingQtyChanged = (id, qtyChangedValue) => {
		this.onQtyChanged(this.state.toppings.slice(), id, qtyChangedValue, this.props.onToppingQtyChanged, 'topping');
	};


	onAddressChanged = (id, value) => {
		console.log('this: ', this.state);
		this.setState((prevState) => {
			const address = prevState.address;
			address[id] = value;
			return {
				address
			};
		});
	};


	onOrderCanceled = () => {
		this.backHandler();
	}


	onOrderSubmitted = () => {
		this.nextHandler();
	}


	stepChangeHandler = (currentStep) => {
		switch (currentStep) {
			case 1:
				if (this.state.toppings.length === 0) {
					service.fetchToppings().then(toppings => {
						this.setState(prevState => prevState = {
							toppings
						});
					});
				}
				break;
			case 2:
				break;
			default:
				//completed
				break;
		};
	}

	/**
	 * all validations will be checked here
	 */
	inputsSatisfied = () => {
		switch (this.state.activeStep) {
			case 0:
				return validations.atLeastOneDoughSelected(this.state.doughs);
			case 1:
				return validations.atLeastOneToppingSelected(this.state.toppings);
			case 2:
				return validations.addressFilled(this.state.address);
			default:
				return {
					validated: true,
					errorMessage: ''
				};
		}
	}


	nextHandler = () => {

		// return if inputs are invalid
		const { validated, errorMessage } = this.inputsSatisfied();

		if (!validated) {
			alert (errorMessage);
			return;
		}

		this.stepChangeHandler(this.state.activeStep + 1);
		

		this.setState(prevState => prevState = {
			activeStep: prevState.activeStep + 1,
			dialogState: prevState.activeStep === 2 ? 'open' : 'close'
		});

		setTimeout(() => {
			console.log('state: ', this.state);
		}, 500);
	};


	backHandler = () =>{
		this.stepChangeHandler(this.state.activeStep - 1);

		this.setState(prevState => prevState = {
			activeStep: prevState.activeStep - 1,
			dialogState: prevState.activeStep === 4 ? 'open' : 'close'
		});
	};

	render() {
		console.log('rendering: ', this.state);
		const steps = [
			{ content: 'Select your dough', step: 0 },
			{ content: 'Select your toppings', step: 1 },
			{ content: 'Enter your address', step: 2 },
			{ content: 'Complete', step: 3 }
		];

		const { classes } = this.props;
		const { activeStep } = this.state;


		const CompletedDiv = () => {
			const showOrHide = this.state.activeStep === 4 ? 'visible' : 'hidden';

			return (
				<div className={['rightAlign', showOrHide].join(' ')}>
					<Button className={classes.button} onClick={this.initializeState}>
						Reset
            		</Button>
				</div>
			);
		};


		const PageNavigationDiv = () => {
			return (
				<div>
					<div>
						<Button variant="contained"
							disabled={activeStep === 0} 
							className={[classes.button, 'leftAlign'].join(' ')} 
							onClick={this.backHandler}>
							Back
              			</Button>

						<Button variant="contained" 
							color="primary" 
							className={[classes.button, 'rightAlign'].join(' ')} 
							onClick={this.nextHandler}>
							{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
						</Button>

					</div>

				</div>
			);
		};

		

		return (
			<div className={classes.root}>
				<div>
					{activeStep === steps.length ? <CompletedDiv /> : <PageNavigationDiv />}
				</div>

				<br />

				<Stepper activeStep={activeStep}>
					{
						steps.map((step) => {

							return (
								<Step key={step.step}>
									<StepLabel>{step.content}</StepLabel>
								</Step>
							);
						})
					}

				</Stepper>

				<div className={[classes.root, 'width90'].join(' ')}>
					<Grid
						container
						direction="row"
						spacing={40}>

						<Doughs 
							activeStep={this.state.activeStep} 
							onDoughQtyChanged={this.onDoughQtyChanged} 
							doughs={this.state.doughs}/>
						
						<Toppings activeStep={this.state.activeStep} onToppingQtyChanged={this.onToppingQtyChanged} toppings={this.state.toppings} />
						
						<Address 
							onAddressChanged={this.onAddressChanged} 
							activeStep={this.state.activeStep}
							name={this.state.address.name}
							address={this.state.address.address}
							phone={this.state.address.phone}
						/>

						<ReviewOrder 
							doughs={this.state.doughs}
							toppings={this.state.toppings}
							customerName={this.state.address.name}
							customerAddress={this.state.address.address}
							customerPhone={this.state.address.phone}
							dialogState={this.state.dialogState}
							onOrderSubmitted={this.onOrderSubmitted}
							onOrderCanceled={this.onOrderCanceled} />

						<div className={this.state.activeStep === 4 ? 'visible' : 'hidden'}>
							All steps completed - you&quot;re finished
						</div>

					</Grid>
				</div>				
				

			</div>
		);
	};
}


PizzaProcessStepper.propTypes = {
	classes: PropTypes.object,
	onDoughQtyChanged: PropTypes.func.isRequired,
	onToppingQtyChanged: PropTypes.func.isRequired
};

export default withStyles(styles)(PizzaProcessStepper);