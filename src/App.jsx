import { useState } from "react";
import "./App.css";

import BarGraph from "./graphs/BarGraph.jsx";
import PieGraph from "./graphs/PieGraph.jsx";
import FunnelGraph from "./graphs/FunnelGraph.jsx";
import BasicPieGraph from "./graphs/BasicPieGraph.jsx";
import ComposedGraph from "./graphs/ComposedGraph.jsx";
import MultiBarGraph from "./graphs/MultiBarGraph.jsx";
import LineGraph from "./graphs/LineGraph.jsx"

import {
  bargraphData,
  funnelData,
  piegraphData,
  basicPieData,
  composedGraphData,
  lineGraphData
} from "./data/data";

function App() {
  return (
    <div className="w-full bg-white p-10 text-black">
      <div>
        <h1 className="text-black">Recharts Customizations</h1>
      </div>
      <div>
      <p className="text-xl font-semibold text-left">Multi-Bar Graph</p>
        <MultiBarGraph
          graphData={bargraphData} xDataKey={"brand"} xaxisLabel={"Brands"} yaxisLabel={"Count"} tickCount={10} yDataKey1={"revenue"} yDataKey2={"unitsSold"} yDataKey3={"productCount"}
        />
      </div>
      {/* <div>
        <LineGraph graphData={lineGraphData} dataKey={"amt"} yaxisLabel={""} xaxisLabel={"name"} />
      </div> */}

      <div className="w-full my-5">
        <p className="text-xl font-semibold text-left">Composed Graph</p>
        <ComposedGraph
          graphData={composedGraphData}
          xDataKey={"period"}
          yaxisLabel1={"Sales Revenue"}
          yaxisLabel2={"Growth %"}
          barDataKey={"totalRevenue"}
          timeFilter={"weekly"}
          legendData={{
            total: "Total Sales : USD 5958.98",
            avgGrowth: "Avg WOW Growth % : -6.25%",
          }}
        />
      </div>
      <div className="w-full my-5">
        <p className="text-xl font-semibold text-left">
          Basic Pie Chart{" "}
          <span className="text-base font-medium"> with custom Tooltip</span>
        </p>
        <BasicPieGraph
          innerRadius={85}
          outerRadius={120}
          graphData={basicPieData}
          dataKey={"percent"}
          nameKey={"channel"}
          dataAvailable={true}
        />
      </div>
      <div className="w-full my-5">
        <p className="text-xl font-semibold text-left">Pie Chart</p>
        <PieGraph
          graphData={piegraphData}
          dataKey={"percentage"}
          nameKey={"brand"}
          innerRadius={95}
          outerRadius={150}
          currency={"USD"}
        />
      </div>
      <div className="w-full my-5">
        <p className="text-xl font-semibold text-left">Funnel Chart</p>
        <FunnelGraph
          graphData={funnelData}
          funnelKey={"revenue"}
          labelLeft={"brandAndTitle"}
          labelCenter={"percentage"}
          labelRight={"finalRevenue"}
        />
      </div>
      <div className="w-full my-5">
        <p className="text-xl font-semibold text-left">Bar Chart</p>
        <BarGraph
          graphData={bargraphData}
          yDataKey={"revenue"}
          xDataKey={"brand"}
          yaxisLabel={"Revenue $"}
          xaxisLabel={"Brands"}
          tickCount={7}
          graphColour={"pink"}
        />
      </div>
    </div>
  );
}

export default App;
