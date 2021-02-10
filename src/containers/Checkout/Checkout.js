import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';



class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
        //dummy ingredients, will pass the actual ones using routing
    }
    UNSAFE_componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let p of query.entries()) {
            if (p[0] === 'price') {
                price = +p[1];
            } else {
                ingredients[p[0]] = +p[1];
            }
        }
        //adding a plus symbol before any numerical string will convert that string into actual number.
        this.setState({
            ingredients: ingredients,
            totalPrice: price.toFixed(2),
        })
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelHandler}
                    checkoutContinued={this.checkoutContinueHandler} />
                {/*<Route path={this.props.match.path + '/contact-data'} component={ContactData} />*/}
                {/*here we are passing the component automatically but we can also pass it manually
                in order to add some props to the component if we wish to. */}
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />

            </div>
        );
    }
}


export default Checkout;