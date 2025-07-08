"use client";
import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import ComposedGraphTooltip from "./supporting-components/ComposedGraphTooltip";

const CustomLegend = ({ payload, legendData }) => {
  return (
    <div className="flex justify-center gap-6 mt-3">
      {payload.map((entry, index) => {
        return (
          <div className="flex items-center gap-1.5" key={`legend_${index}`}>
            {index === 0 ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.5"
                  width="12"
                  height="11"
                  rx="3"
                  fill="url(#paint0_linear_6704_24477)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_6704_24477"
                    x1="6.91666"
                    y1="1.92818"
                    x2="6.91666"
                    y2="16.3011"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#88FFE3" stop-opacity="0.4" />
                    <stop offset="1" stop-color="#22C6A0" stop-opacity="0.7" />
                  </linearGradient>
                </defs>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M1 10C1.62222 8.21298 3.98667 5.35376 8.46667 8.21298C12.9467 11.0722 14.6889 9.40433 15 8.21298"
                  stroke="#DF0082"
                />
                <circle cx="8.5" cy="8.5" r="2.5" fill="#DF0082" />
              </svg>
            )}
            <span
              className={`mx-2 ${
                index === 0 ? "text-green" : "text-pink"
              } text-sm font-medium`}
              key={`item-${index}`}
            >
              {index == 0 ? legendData.total : legendData.avgGrowth}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const ComposedGraph = ({
  graphData,
  xDataKey,
  yaxisLabel1,
  yaxisLabel2,
  barDataKey,
  timeFilter,
  legendData,
}) => {
  const [activeCoordinate, setActiveCoordinate] = useState(null);
  const [toolTipYPosition, setToolTipYPosition] = useState(null);
  const [toolTipXPosition, setToolTipXPosition] = useState(null);

  useEffect(() => {
    if (activeCoordinate) {
      const calculatedX = activeCoordinate.x - 100;
      const calculatedY = activeCoordinate.y - 50;

      setToolTipXPosition(calculatedX);
      setToolTipYPosition(calculatedY);
    } else {
      setToolTipXPosition(-9999);
      setToolTipYPosition(-9999);
    }
  }, [activeCoordinate]);

  return (
    <>
      <ResponsiveContainer height={400} className="text-xs" width="100%">
        <ComposedChart
          data={graphData}
          height={450}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
          onMouseMove={(e) => {
            setActiveCoordinate(e.activeCoordinate);
          }}
          onMouseLeave={() => {
            setActiveCoordinate(null);
          }}
        >
          <defs>
            <linearGradient
              id={`gradient_bar`}
              key={`key_1`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="12.98%" stopColor="#88FFE366" />
              <stop offset="143.65%" stopColor="#22C6A0B2" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="9" stroke="#FFE5F4" />
          <XAxis dataKey={xDataKey} axisLine={false} />
          {/* Sales axis */}
          <YAxis
            yAxisId={1}
            dx={-5}
            tickSize={0}
            axisLine={false}
            orientation="left"
            dataKey={barDataKey}
          >
            <Label
              className="text-sm font-medium"
              angle={270}
              position="left"
              value={yaxisLabel1}
            />
          </YAxis>
          {/* Growth axis */}
          {timeFilter !== "daily" && (
            <YAxis
              yAxisId={2}
              dx={15}
              axisLine={false}
              tickSize={0}
              dataKey="growthPercent"
              orientation="right"
              domain={[0, 100]}
            >
              <Label
                className="text-sm font-medium"
                angle={270}
                position="right"
                value={yaxisLabel2}
              />
            </YAxis>
          )}
          <Tooltip
            allowEscapeViewBox={{ x: false, y: false }}
            position={{ x: toolTipXPosition, y: toolTipYPosition }}
            content={<ComposedGraphTooltip />}
          />
          <Legend
            content={(props) =>
              CustomLegend({ ...props, legendData: legendData })
            }
          />
          <Bar
            yAxisId={1}
            dataKey={barDataKey}
            barSize={20}
            barGap={10}
            fill="url(#gradient_bar)"
            radius={10}
          />
          {timeFilter !== "daily" && (
            <Line
              yAxisId={2}
              type="monotone"
              dataKey="growthPercent"
              stroke="#DF0082"
              strokeWidth="2"
              dot={{ stroke: "#DF0082", strokeWidth: 5, r: 2 }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};

export default ComposedGraph;
