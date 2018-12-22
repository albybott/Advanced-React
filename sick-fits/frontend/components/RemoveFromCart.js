import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import CartItem from "./CartItem";

const REMOVE_CART_ITEM_MUTATION = gql`
  mutation REMOVE_CART_ITEM_MUTATION($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButon = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends Component {
  static propsTypes = {
    id: PropTypes.string.isRequired
  };

  // this gets called as soon as we get a message back from the
  // server after the mutation has been performed
  update = (cache, payload) => {
    console.log("Running update remove function");
    // read the cache
    const data = cache.readQuery({
      query: CURRENT_USER_QUERY
    });
    console.log("data", data);
    // remove that item from the cart
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
    // write is back to the cache
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={REMOVE_CART_ITEM_MUTATION}
        variables={{
          id: this.props.id
        }}
        update={this.update}
        optimisticResponse={{
          __typename: "Mutation",
          removeFromCart: {
            __typename: "CartItem",
            id: this.props.id
          }
        }}
      >
        {(removeFromCart, { loading, error }) => (
          <BigButon
            disabled={loading}
            title="Delete Item"
            onClick={() => {
              removeFromCart().catch(err => alert(err.message));
            }}
          >
            &times;
          </BigButon>
        )}
      </Mutation>
    );
  }
}

export default RemoveFromCart;
