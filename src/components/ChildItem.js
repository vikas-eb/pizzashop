import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import QtySelector from './QtySelector';

const styles = theme => ({
	root: {
		width: '100px',
		backgroundColor: theme.palette.background.paper,
	},
});

class ChildItem extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<ListItem key={this.props.id} className={[classes.listItem, 'listItemContainer'].join(' ')} >
				<ListItemText>
					<div className='listItemStyle' >{this.props.name}</div>
				</ListItemText>

				<ListItemSecondaryAction>
					<QtySelector
						id={this.props.id}
						onQtyChanged={this.props.onQtyChanged}
						disabled={this.props.disabled}
						qty={this.props.qty}>
					</QtySelector>
				</ListItemSecondaryAction>

			</ListItem>
		);
	};
}

ChildItem.propTypes = {
	classes: PropTypes.object.isRequired,
	onQtyChanged: PropTypes.func.isRequired
};

export default withStyles(styles)(ChildItem);