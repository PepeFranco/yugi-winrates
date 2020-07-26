import ReactLoader from "react-loader-spinner";

const Loader = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <ReactLoader type="Bars" color="black" height={100} width={100} />
  </div>
);

export default Loader;
