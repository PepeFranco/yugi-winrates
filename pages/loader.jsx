import { PieChart } from "react-minimal-pie-chart";
import colours from "./data/colours.json";

const Loader = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
    }}
    aria-label={"Loading..."}
  >
    <div style={{ padding: "50px" }}>
      <PieChart
        data={[
          {
            value: 100,
            color: colours.theme.primary,
          },
        ]}
        animate={true}
        animationDuration={2000}
        animationEasing="cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        startAngle={90}
        style={{ height: "150px" }}
      />
    </div>
  </div>
);

export default Loader;
