import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import ErrorMessage from "./ErrorMessage";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;

          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(createItem, { loading, error }) => (
                <Form
                  onSubmit={async e => {
                    // stop the form from submitting
                    e.preventDefault();
                    // call the mutation
                    const res = await createItem();
                    // change them to the single item page
                    Router.push({
                      pathname: "/item",
                      query: { id: res.data.createItem.id }
                    });
                  }}
                >
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      required
                      defaultValue={data.item.title}
                      onChange={this.handleChange}
                    />

                    <label htmlFor="price">Price</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Price"
                      required
                      defaultValue={data.item.price}
                      onChange={this.handleChange}
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                      type="number"
                      id="description"
                      name="description"
                      placeholder="Enter a description"
                      required
                      defaultValue={data.item.description}
                      onChange={this.handleChange}
                    />
                  </fieldset>

                  <button type="submit">Submit</button>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default CreateItem;
export { UPDATE_ITEM_MUTATION };
