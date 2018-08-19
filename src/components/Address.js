import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import  TextField  from '@material-ui/core/TextField'
import classNames from 'classnames';

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
});


class Address extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            address: this.props.address,
            phone: this.props.phone,
            disabled: this.props.disabled
        };
    }


    handleChange = (event) => {
        this.props.onAddressChanged(event.target.id, event.target.value);
    }


    render(){
        const { classes } = this.props;

        const addressClasses = classNames(
			this.props.activeStep > 1 ? 'visible' : 'hidden',
			this.props.activeStep > 2 ? 'disabled' : '',
			'width90'
		);

        return (
			<Grid xs={4} key='addressGrid' item>
                <div className={[classes.root, addressClasses].join(' ')}>
                    <Grid container spacing={24}>
                        <Grid xs={12} sm={12} item>
                            <TextField
                                label="Name"
                                id="name"
                                disabled={this.props.disabled}
                                defaultValue={this.props.name}
                                className={[classes.textField, 'width90'].join(' ')}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid xs={12} sm={12} item>
                            <TextField
                                label="Address"
                                id="address"
                                disabled={this.props.disabled}
                                className={[classes.textField, 'width90'].join(' ')}
                                defaultValue={this.props.address}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid xs={12} sm={12} item>
                            <TextField
                                label="Phone"
                                id="phone"
                                className={classes.textField}
                                disabled={this.props.disabled}
                                defaultValue={this.props.phone}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        );
    }
}


Address.propTypes = {
  classes: PropTypes.object.isRequired,
  onAddressChanged: PropTypes.func.isRequired
};


export default withStyles(styles)(Address);


  