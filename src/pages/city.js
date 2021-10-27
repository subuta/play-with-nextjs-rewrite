import { getRouter } from "../lib/rewrite";

const render = (props) => {
  const prefectureName = props.prefectureName || "";
  const city = props.city || "";
  return (
    <h1>
      A web page about "{prefectureName}/{city}" City
    </h1>
  );
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
