import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = props => {
  return (
    <Mutation
      mutation={SIGNOUT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {signout => (
        <button
          onClick={async e => {
            const message = await signout();
          }}
        >
          Sign Out
        </button>
      )}
    </Mutation>
  );
};

export default Signout;
