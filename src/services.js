/**
 * The file with all the service to get data
 */


 export const fetchDoughs = () => {

    //using promises to make the code compatible with promises which will eventually be used while calling the APIs
    return new Promise((resolve) => {
        var doughData = [
            { 
                id: 1,
                name: 'Dough 1',
                price: 2.00,
                qty: 0
            },
            { 
                id: 2,
                name: 'Dough 2',
                price: 1.23,
                qty: 0
            },
            { 
                id: 3, 
                name: 'Dough 3',
                price: 1.35,
                qty: 0
            }
        ];

        setTimeout(() => {
            resolve(doughData);
        }, 1500);
    });

 };

 export const fetchToppings = () => {

    return new Promise((resolve) => {
        var toppingData = [
            { 
                id: 1,
                name: 'Capsicum',
                category: 'Veg',
                price: 2.00,
                qty: 0
            },
            { 
                id: 2,
                name: 'Onion',
                category: 'Veg',
                price: 3.2,
                qty: 0
            },
            { 
                id: 3,
                name: 'Chicken',
                category: 'Non-Veg',
                price: 4.00,
                qty: 0
            },
            { 
                id: 4,
                name: 'Pork',
                category: 'Non-Veg',
                price: 3.00,
                qty: 0
            },
        ];
        
        setTimeout(() => {
            resolve(toppingData);
        }, 1500);
    });
     
 };