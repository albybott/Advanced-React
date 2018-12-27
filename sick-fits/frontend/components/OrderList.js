import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { format } from "date-fns";
import Link from "next/link";
import styled from "styled-components";

import Table from "./styles/Table";
import Error from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";
import OrderItemStyles from "./styles/OrderItemStyles";
import { formatDistance } from "date-fns";

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      charge
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const orderUL = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

class OrderList extends React.Component {
  render() {
    return (
      <Query query={USER_ORDERS_QUERY}>
        {({ data: { orders }, loading, error }) => (
          <div>
            <Error error={error} />
            <div>
              <h2>You have {orders.length} orders</h2>
              <orderUL>
                {orders.map(order => (
                  <OrderItemStyles key={order.id}>
                    <Link
                      href={{
                        pathname: "/order",
                        query: {
                          id: order.id
                        }
                      }}
                    >
                      <a>
                        <div className="order-meta">
                          <p>
                            {order.items.reduce((a, b) => a + b.quantity, 0)}{" "}
                            Items
                          </p>
                          <p>{order.items.length} Products</p>
                          <p>
                            {formatDistance(order.createdAt, new Date())} ago
                          </p>
                          <p>{formatMoney(order.total)}</p>
                          <div className="images">
                            {order.items.map(item => (
                              <img
                                key={item.id}
                                src={item.image}
                                alt={item.title}
                              />
                            ))}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </OrderItemStyles>
                ))}
              </orderUL>
            </div>
          </div>
        )}
      </Query>
    );
  }
}

export default OrderList;
