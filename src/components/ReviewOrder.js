import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Table, TableBody, TableRow, TableHead, TableCell } from '@material-ui/core'

const Transition = (props) => {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    dialogPaper: {
        minHeight: '400px'
    },

    tableHead: {
        borderColor: 'palevioletred',
        borderStyle: 'dotted',
        borderWidth: 'thin',
    
        padding: '1px !important',
    
        fontSize: '15px',
        fontWeight: 'bold',
    
        /* remove right left borders */
        borderRightColor: 'white',
        borderLeftColor: 'white'
    },

    tableRow: {
        height: '25px !important',
    },

    tableHeadCell: {
        padding: '2px !important',
    },

    tableRowCell: {
        fontSize: '10px',
        fontWeight: 'bold',
        padding: '2px !important',
    }
});

class ReviewOrder extends React.Component {

    TAX_PERCENT = '.08';

    dialogState = {
        open: 'open',
        close: 'close'
    };
   
    
    submitOrder = () => {
        this.props.onOrderSubmitted();
    }

    
    cancelOrder = () => {
        this.props.onOrderCanceled();
    }


    render() {
        const { classes } = this.props;


        const OrderDetails = () => {
            const getPriceFromSelectedItems = (items) => {
                const result = items.reduce((prevItem, currentItem) => {
                    console.log('==>', prevItem);
                    return prevItem + (currentItem.price * currentItem.qty);
                }, 0);

                return result;
            };

            const combinedItems = (this.props.doughs || []).concat(this.props.toppings || []);
            const total = getPriceFromSelectedItems(combinedItems);

            return (
                <div id='orderDetails' className='saneMarginFromUp'>
                    {/* address details for the vendor */}
                    <div id='headerDiv' className='width90'>
                        <div id='vendorAddress' className='width50 sameRow alignUp invoiceHeader' >
                            <h3>The Pizza Shop</h3>
                            XYZ Avenue, NY 20192 < br/>
                            +1-646-464-6009 
                        </div>
                        <div id='invoiceDetails' className='width50 sameRow alignUp invoiceHeader '>
                            <div className='width50 sameRow'>Invoice #:</div>
                            <div className='width50 sameRow'>x0192812dds</div>

                            <br />

                            <div className='width50 sameRow'>Order Date #:</div>
                            <div className='width50 sameRow'>07-22-2018</div>

                            <br />

                            <div className='width50 sameRow'>Time:</div>
                            <div className='width50 sameRow'>6.30pm</div>
                            <br />

                            <div className='width50 sameRow'>Cashier:</div>
                            <div className='width50 sameRow'>Vikas B</div>
                        </div>
                    </div>

                    {/* the order details starts from here */}

                    <div id='itemDetails' className='width90 saneMarginFromUp'>
                        <Table className={[classes.table, 'width100', 'invoiceHeaderRow'].join(' ')}>
                            <TableHead className={classes.tableHead}>
                                <TableRow className={classes.tableRow}>
                                    <TableCell className={['width50', classes.tableHeadCell].join(' ')} >Item Name</TableCell>
                                    
                                    <TableCell className={['width10', classes.tableHeadCell].join(' ')}numeric>Qty</TableCell>
                                    
                                    <TableCell className={['width20', classes.tableHeadCell].join(' ')}numeric>$</TableCell>
                                    
                                    <TableCell className={['width20', classes.tableHeadCell].join(' ')} numeric>Qty x $</TableCell>
                                
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    combinedItems.filter(item => item.qty >0).map(item => {
                                        return (
                                            <TableRow key={item.name} className={classes.tableRow}>
                                                <TableCell className={['width50', classes.tableRowCell].join(' ')} >{item.name}</TableCell>
                                                
                                                <TableCell className={['width10', classes.tableRowCell].join(' ')}numeric>{item.qty}</TableCell>
                                                
                                                <TableCell className={['width20', classes.tableRowCell].join(' ')}numeric>${new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3, minimumSignificantDigits: 3 }).format(item.price)}</TableCell>
                                                
                                                <TableCell className={['width20', classes.tableRowCell].join(' ')} numeric>${new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3, minimumSignificantDigits: 3 }).format(item.price * item.qty)}</TableCell>
                                            
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>

                    <div id='footer' className='saneMarginFromUp width100' >
                    <span className='smallText'>Deliver to: </span> <br />
                        <div id='customerDetails' className='width50 sameRow alignUp'>
                            <h3 id='customerName'>{this.props.customerName}</h3>
                            <div id='customerAddress'> {this.props.customerAddress} </div>
                            <div id='customerPhone'> {this.props.customerPhone} </div>
                            
                        </div>

                        <div id='invoiceTotal' className='sameRow width45' >
                            <div className='sameRow width50'>Gross Total</div>
                            <div className='sameRow width50 rightText'>$ {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(total)}</div>
                            
                            <br />
                            
                            <div className='sameRow width50'>Tax</div>
                            <div id='taxAmount' className='sameRow width50 rightText'>$ {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(this.TAX_PERCENT * total)}</div>
                            
                            <br />
                            
                            <div className='sameRow width50'>Total $$</div>
                            <div id='finalBillAmount' className='sameRow width50 rightText'>$ {new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format((this.TAX_PERCENT * total) + total)}</div>

                        </div>
                    </div>
                </div>
            );
        };

        return (
            <Dialog
                open={this.props.dialogState === this.dialogState.open}
                TransitionComponent={Transition}
                keepMounted
                classes={{ paper: classes.dialogPaper }}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"> 
            
                <DialogTitle id="alert-dialog-slide-title" className='dialogTitle'>
                    Review Order 
                    <a href='#' onClick={this.cancelOrder}>
                        <i className="material-icons rightAlign hand" >clear</i>
                    </a>
                </DialogTitle>

                <OrderDetails />
                
                <DialogActions>
                    <Button variant='contained' onClick={this.submitOrder} color="primary">
                        Submit Order
                    </Button>
                
                    <Button onClick={this.cancelOrder} color="primary">
                        Modify Order
                    </Button>
                
                </DialogActions>

            </Dialog>
        );
    }
}

ReviewOrder.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReviewOrder);