import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import ListView from './ListView';


const styles = theme => ({

});


class Doughs extends React.Component {

    render(){
        const doughClasses = (this.props.activeStep === 0 ? 'visible' : 'visible disabled') + ' width90';

        return (
            <Grid xs={4} key='doughGrid' item >
                <div id='doughList' className={doughClasses}>
                    <ListView
                        title={this.props.title}
                        disabled={this.props.activeStep > 0}
                        onQtyChanged={this.props.onDoughQtyChanged}
                        items={this.props.doughs}>
                    </ListView>
                </div>
            </Grid>
        );
    }
}


Doughs.propTypes = {
  classes: PropTypes.object,
};


export default withStyles(styles)(Doughs);


  