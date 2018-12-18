const { forwardTo } = require("prisma-binding");

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
        where: { id: "cjpt5vkzwefvl0a845ndnqowx" }
      },
      info
    );
  }
};

module.exports = Query;
