import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

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

  render() {
    return <BigButon title="Delete Item">&times;</BigButon>;
  }
}

export default RemoveFromCart;
