const { createClient } = require("graphqurl");

const client = createClient({
  endpoint: process.env.ENDPOINT_URL,
  headers: {
    "x-hasura-admin-secret": process.env.X_HASURA_ADMIN_SECRET,
  },
});

exports.handler = async function (event, context) {
  //   console.log(event);
  //   console.log(context);
  try {
    const response = await client
      .query({
        query: `query 
      { 
        ToDo(where: {active: {_eq: true}}, order_by: {created_at: desc}) {
          id
          isDone
          title
          created_at,
          guid
        } 
      }`,
      })
      .then((response) => {
        // console.log(response.data.ToDo);
        return response.data.ToDo;
      })
      .catch((error) =>
        console.error("error  src/lib/api.js/getToDoListQuery()", error)
      );

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
