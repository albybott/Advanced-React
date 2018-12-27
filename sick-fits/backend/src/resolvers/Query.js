const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    // check that there is a current user
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },

  async users(parent, args, ctx, info) {
    // 1. check if they are logged in
    if (!ctx.request.userId) {
      throw new Error(`You need to be logged in to do this!`);
    }
    // 2. check if the user has the permissions to query all of the users
    await hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);

    // 3. if they do, query all the users
    return ctx.db.query.users({}, info);
  },

  async order(parent, args, ctx, info) {
    // make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error("You need to be logged in to do this!");
    }
    // query the current order
    const order = await ctx.db.query.order(
      {
        where: {
          id: args.id
        }
      },
      info
    );

    // check if they have the permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      "ADMIN"
    );
    if (!ownsOrder || !hasPermissionToSeeOrder) {
      throw new Error("You dont have permission to see this order!");
    }

    // return the order
    return order;
  },

  orders(parent, args, ctx, info) {
    // make sure the user is logged in
    if (!ctx.request.userId) {
      return new Error("You have to be logged in to do this!");
    }

    // return the orders
    return ctx.db.query.orders(
      {
        where: {
          user: {
            id: ctx.request.userId
          }
        }
      },
      info
    );
  }
};

module.exports = Query;
