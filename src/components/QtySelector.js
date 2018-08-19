import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      }
});

class QtySelector extends React.Component {
	onQtyIncreased = () => {
		this.props.onQtyChanged(this.props.id, 1);
	};


	onQtyDecreased = () => {
        if (this.props.qty === 0) return;
		this.props.onQtyChanged(this.props.id, -1);
	};


	render() {
		const { classes } = this.props;

		return (
            <div>
                <Button id='btnDecrease' 
                    color='primary' 
                    className={[classes.button, 'qtyButton'].join(' ')} 
                    onClick={this.onQtyDecreased}
                    disabled={this.props.disabled}>
                -
                </Button>
                <label className='qtyLabel'>{this.props.qty}</label>
                <Button 
                    id='btnIncrease' 
                    onClick={this.onQtyIncreased} 
                    color='primary' 
                    className={[classes.button, 'qtyButton'].join(' ')}
                    disabled={this.props.disabled}>
                +
                </Button>
            </div>
		);
	};
}

QtySelector.propTypes = {
	classes: PropTypes.object.isRequired,
	onQtyChanged: PropTypes.func.isRequired
};

export default withStyles(styles)(QtySelector);