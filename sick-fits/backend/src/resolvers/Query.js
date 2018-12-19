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
  }
};

module.exports = Query;
