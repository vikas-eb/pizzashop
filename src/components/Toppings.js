
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import ListView from './ListView';


const styles = theme => ({

});


class Toppings extends React.Component {

    render(){
        const toppingClasses = classNames(
            this.props.activeStep > 0 ? 'visible' : 'hidden',
            this.props.activeStep > 1 ? 'disabled' : '',
            'width90'
        );

        return (
            <Grid xs={4} key='toppingsGrid' item>
                <div id='toppingList' className={toppingClasses}>
                    <ListView
                        onQtyChanged={this.props.onToppingQtyChanged}
                        items={this.props.toppings}
                        disabled={this.props.activeStep > 1}>
                    </ListView>
                </div>
            </Grid>
        );
    }
}


Toppings.propTypes = {
  classes: PropTypes.object,
};


export default withStyles(styles)(Toppings);


  