export const atLeastOneDoughSelected = (doughs) => {
    const notifier = {
        validated: false,
        errorMessage: 'Please select at least one dough'
    }

    notifier.validated = doughs.filter(dough => dough.qty > 0).length > 0
    return notifier;
};

export const atLeastOneToppingSelected = (toppings) => {
    const notifier = {
        validated: false,
        errorMessage: 'Please select at least one topping'
    }

    notifier.validated = toppings.filter(topping => topping.qty > 0).length > 0
    return notifier;
};

export const addressFilled = (address) => {

    const notifier = {
        validated: false,
        errorMessage: 'Please provide the value(s) for '
    }

    if (!address.name) {
        //address not found
        notifier.errorMessage += 'name,';
    }

    if (!address.address) {
        //address not found
        notifier.errorMessage += 'address,'
    }

    if (!address.phone) {
        //address not found
        notifier.errorMessage += 'phone,'
    }

    if (address.name && address.address && address.phone) {
        notifier.validated = true;
    }

    return notifier;
};
