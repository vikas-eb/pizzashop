import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ChildItem from './ChildItem';

import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({

});


class ListView extends React.Component {

    render(){

        const { classes } = this.props;

        if (this.props.items && this.props.items.length > 0) {

            return (
                <div>
                    <List>
                    {
                        this.props.items.map(item => {
                            return (
                                <ChildItem
                                    key={item.id}
                                    qty={item.qty}
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    disabled={this.props.disabled}
                                    onQtyChanged={this.props.onQtyChanged} />
                            );
                        })
                    }
                    </List>
                </div>
            );
        }
        else {
            return (
                <div className={classes.root}>
                    <div className={classes.placeholder}>
                            <CircularProgress />
                    </div>            
                </div>
            );         
        }
    }
}


ListView.propTypes = {
  classes: PropTypes.object,
  onQtyChanged: PropTypes.func.isRequired
};


export default withStyles(styles)(ListView);


  