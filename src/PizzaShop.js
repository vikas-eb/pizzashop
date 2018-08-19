import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PizzaProcessStepper from './components/PizzaProcessStepper'

import './main.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: { main: "#e91e63" },
		secondary: { main: '#8c2547' }
	},
})

const styles = theme => ({
	root: {
		width: '90%',
	},

	button: {
		marginRight: theme.spacing.unit,
	},

	instructions: {
		marginTop: theme.spacing.unit,
		marginBottom: theme.spacing.unit,
	}
});

class PizzaShop extends Component {

	state = {
		selectedItems: {
			doughs: [],
			toppings: []
		},
		isDoughMenuOpened: false,
		isToppingMenuOpened: false
	};


	onDoughSelected = (doughs) => {
		this.setState((prevState) => {
			return {
				selectedItems: { 
					toppings: prevState.selectedItems.toppings,
					doughs
				}
			};
		});
	};


	onToppingSelected = (toppings) => {
		this.setState((prevState) => {
			return {
				selectedItems: { 
					doughs: prevState.selectedItems.doughs,
					toppings
				}
			};
		});
	};


	render() {
		const { classes } = this.props;


		const BottomNavigationDiv = () => {
			return (
				<div id='bottomDiv'>
					<Badge
						color='primary'
						badgeContent={this.state.selectedItems.doughs.length}
						className={classes.margin}
						>
						<Typography
							className={classes.padding}>
							Doughs Added
              			</Typography>

					</Badge>

					&nbsp;&nbsp;&nbsp;&nbsp;
		  
					<Badge
						color='primary'
						badgeContent={this.state.selectedItems.toppings.length}
						className={classes.margin}>
							<Typography
								className={classes.padding}>
								Toppings Added
							</Typography>

					</Badge>

				</div>
			);
		};


		return (
			<div id='mainDiv'>
				<img className='logo' src='/assets/images/logo.png' alt='the "O"' />
				<MuiThemeProvider theme={theme}>
					<PizzaProcessStepper 
						onDoughQtyChanged={this.onDoughSelected} 
						onToppingQtyChanged={this.onToppingSelected}
					/>
					<BottomNavigationDiv />
				</MuiThemeProvider>

			</div>
		);
	}
}


PizzaShop.propTypes = {
	classes: PropTypes.object
};

export default withStyles(styles)(PizzaShop);