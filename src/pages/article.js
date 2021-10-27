import { getRouter } from "../lib/rewrite";

const render = (props) => {
  const article = props.article || "";
  return <h1>Blog about "{article}"</h1>;
};

export async function getServerSideProps(context) {
  const rewriteRouter = getRouter();
  const route = rewriteRouter.match(context.req.url);

  let props = {};
  if (route) {
    props = route.query;
  }

  return {
    props,
  };
}

export default render;
