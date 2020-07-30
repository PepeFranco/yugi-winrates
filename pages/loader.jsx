import { PieChart } from "react-minimal-pie-chart";

const Loader = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div style={{ padding: "50px" }}>
      <PieChart
        data={[
          {
            value: 100,
            color: "black",
          },
        ]}
        animate={true}
        animationDuration={3000}
        startAngle={90}
        style={{ height: "150px" }}
      />
    </div>
  </div>
);

export default Loader;
