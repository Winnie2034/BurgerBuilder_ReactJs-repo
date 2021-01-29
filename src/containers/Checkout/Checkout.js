import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';



class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1, meat: 1, cheese: 1, bacon: 1
        }
        //dummy ingredients, will pass the actual ones using routing
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let p of query.entries()) {
            ingredients[p[0]] = +p[1];
        }
        //adding a plus symbol before any numerical string will convert that string into actual number.
        this.setState({
            ingredients: ingredients
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
            </div>
        );
    }
}


export default Checkout;