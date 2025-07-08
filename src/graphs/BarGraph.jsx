/**
 *  BarChart with customized Bar Label,
 *  with hover effects on bar focus,
 *  tooltips on Bar and X-axis ticks,
 *  custom Axis ticks for both axis,
 */

"use client";
import { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
  Cell,
} from "recharts";
import { formatLargeNumbers } from "../lib/utils.js";

const BarGraph = ({
  graphData,
  yDataKey,
  xDataKey,
  yaxisLabel,
  xaxisLabel,
  domain,
  tickCount,
  graphColour,
}) => {
  const chartContainerRef = useRef(null);

  const [focusBar, setFocusBar] = useState(null);
  const [mouseLeave, setMouseLeave] = useState(true);
  const [tooltip, setTooltip] = useState(null);
  const [activeCoordinates, setActiveCoordinates] = useState(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    if (chartContainerRef.current) {
      setChartWidth(chartContainerRef.current.offsetWidth);
    }
  }, [graphData]);

  const gradientColour = {
    pink: {
      regular: "gradient_bar1",
      hover: "#FFE8F5",
    },
    blue: {
      regular: "gradient_bar2",
      hover: "#d8e3ff",
    },
    purple: {
      regular: "gradient_bar3",
      hover: "#eedbff",
    },
  };

  const renderTooltip = () => {
    if (
      !tooltip ||
      tooltip.index === undefined ||
      !graphData[tooltip.index] ||
      chartWidth === 0
    ) {
      return null;
    }

    const tooltipWidth = 350;
    let leftPosition = tooltip.coordinate + 40;

    // Check if the tooltip would go off the right edge.
    if (leftPosition + tooltipWidth > chartWidth - 25) {
      leftPosition = tooltip.coordinate - tooltipWidth + 10;
    }

    if (leftPosition < 0) {
      leftPosition = 0;
    }

    return (
      <div
        className="absolute top-[350px] visible w-72 bg-white p-5 rounded-2xl text-left drop-shadow-md z-50 text-center"
        style={{ left: leftPosition }}
      >
        <p className="text-[10px] font-medium text-[#090909] capitalize">
          {graphData[tooltip.index].title}
        </p>
        <p className="text-[10px] font-medium text-[#6C7072] capitalize">
          {graphData[tooltip.index].brand}
        </p>
      </div>
    );
  };

  const renderCustomBarLabel = ({
    x,
    y,
    width,
    height,
    value,
    data,
    index,
    dataKey,
    focusBar,
    mouseLeave,
  }) => {
    if ((dataKey == "price" || dataKey == "revenue") && data && data[index]) {
      const { currency, price, revenue } = data[index];

      let finalPrice = 0;
      if (dataKey == "price") {
        finalPrice = formatLargeNumbers(price, 1);
      } else if (dataKey == "revenue") {
        finalPrice = formatLargeNumbers(revenue, 1);
      }

      return (
        <text
          x={x + width / 2}
          y={y}
          className={`text-base font-medium ${
            focusBar === index
              ? "opacity-100"
              : mouseLeave
              ? "opacity-40"
              : "opacity-0"
          }`}
          fill="#007AFF"
          textAnchor="middle"
          dy={-12}
        >
          {currency}
          {finalPrice}
        </text>
      );
    } else {
      return (
        <text
          x={x + width / 2}
          y={y}
          className={`text-base font-medium ${
            focusBar === index
              ? "opacity-100"
              : mouseLeave
              ? "opacity-40"
              : "opacity-0"
          }`}
          fill="#007AFF"
          textAnchor="middle"
          dy={-12}
        >
          {value}
        </text>
      );
    }
  };

  const renderCustomXAxisTick = ({
    x,
    y,
    payload,
    focusBar,
    mouseLeave,
    index,
  }) => {
    if (payload && payload.value) {
      const parts = payload.value.split(" - ");
      const brand = parts[0];
      const title = parts.slice(1).join(" ");

      return (
        <g
          transform={`translate(${x},${y})`}
          className={`cursor-pointer ${
            focusBar === index || mouseLeave ? "opacity-100" : "opacity-40"
          }`}
        >
          <foreignObject
            x={-40}
            y={12}
            width={80}
            height={20}
            style={{ overflow: "hidden" }}
          >
            <div className={`marquee-container`}>
              <div
                className={`capitalize text-center text-[10px] font-medium text-[#090909] recharts-ellipsis`}
              >
                {title}
              </div>
            </div>
          </foreignObject>
          <foreignObject
            x={-40}
            y={24}
            width={80}
            height={20}
            style={{ overflow: "hidden" }}
          >
            <div className={`marquee-container`}>
              <div
                className={`capitalize text-center text-[10px] text-[#6C7072] recharts-ellipsis`}
              >
                {brand}
              </div>
            </div>
          </foreignObject>
        </g>
      );
    }
  };

  const renderCustomYAxisTick = ({ x, y, payload, index }) => {
    if (payload && payload.value) {
      let finalValue = formatLargeNumbers(payload.value, 1);

      return (
        <g transform={`translate(${x},${y})`}>
          <text
            key={index}
            x={-20}
            y={2}
            textAnchor="middle"
            fill="#808080"
            fontSize={12}
            className={`capitalize`}
          >
            {finalValue}
          </text>
        </g>
      );
    }
  };

  const CustomToolTip = ({ payload, active }) => {
    if (
      !activeCoordinates ||
      activeCoordinates.x === undefined ||
      !active ||
      chartWidth === 0
    ) {
      return null;
    }

    const tooltipWidth = 350;
    let leftPosition = activeCoordinates?.x + 40;
    if (leftPosition + tooltipWidth > chartWidth - 25) {
      leftPosition = activeCoordinates.x - tooltipWidth + 10;
    }

    if (leftPosition < 0) {
      leftPosition = 0;
    }

    return (
      <div
        className="absolute top-[350px] visible w-72 bg-white p-5 rounded-2xl text-left drop-shadow-md z-50 text-center"
        style={{ left: leftPosition }}
      >
        <p className="text-[10px] font-medium text-[#090909] capitalize">
          {payload[0].payload.title}
        </p>
        <p className="text-[10px] font-medium text-[#6C7072] capitalize">
          {payload[0].payload.brand}
        </p>
      </div>
    );
  };

  return (
    <div className="relative" ref={chartContainerRef}>
      <ResponsiveContainer height={450} className="text-xs" width={800}>
        <BarChart
          margin={{ right: 25, top: 25, bottom: 100, left: 15 }}
          data={graphData}
          onMouseMove={(state) => {
            if (state && state.isTooltipActive) {
              setFocusBar(state.activeTooltipIndex);
              setMouseLeave(false);
              setActiveCoordinates(state.activeCoordinate);
            } else {
              setFocusBar(null);
              setMouseLeave(true);
              setActiveCoordinates(null);
            }
          }}
          onMouseLeave={() => {
            setFocusBar(null);
            setMouseLeave(true);
          }}
        >
          <defs>
            <linearGradient
              id={`gradient_bar1`}
              key={`key_1`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="12.98%" stopColor="#FFC8E8" />
              <stop offset="143.65%" stopColor="#FF74C5" />
            </linearGradient>
            <linearGradient
              id={`gradient_bar2`}
              key={`key_2`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="12.98%" stopColor="#D8E0FF" />
              <stop offset="143.65%" stopColor="#7490FF" />
            </linearGradient>
            <linearGradient
              id={`gradient_bar3`}
              key={`key_3`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="13%" stopColor="#DCB4FE" />
              <stop offset="188.61%" stopColor="#360561" />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="9"
            stroke="#FFE5F4"
            vertical={false}
          />
          <XAxis
            dataKey={xDataKey}
            dy={5}
            padding={{ left: 10, right: 10 }}
            axisLine={false}
            tick={(props) =>
              renderCustomXAxisTick({
                ...props,
                index: props.index,
                focusBar: focusBar,
                mouseLeave: mouseLeave,
              })
            }
            tickLine={false}
            interval={0}
            onMouseEnter={(params) => setTooltip(params)}
            onMouseLeave={() => setTooltip(null)}
          >
            <Label
              position="bottom"
              offset={10}
              value={xaxisLabel}
              className="text-sm font-medium"
            />
          </XAxis>
          <YAxis
            dx={-5}
            tickSize={0}
            tickCount={tickCount}
            axisLine={false}
            domain={domain}
            tick={(props) =>
              renderCustomYAxisTick({ ...props, index: props.index })
            }
          >
            <Label
              className="text-sm font-medium"
              angle={270}
              position="left"
              value={yaxisLabel}
            />
          </YAxis>
          <Tooltip cursor={false} content={<CustomToolTip />} />
          <Bar
            type="monotone"
            dataKey={yDataKey}
            barSize={20}
            fill={`url(#${gradientColour[graphColour].regular})`}
            radius={4}
            label={(props) =>
              renderCustomBarLabel({
                ...props,
                data: graphData,
                index: props.index,
                dataKey: yDataKey,
                focusBar: focusBar,
                mouseLeave: mouseLeave,
              })
            }
          >
            {graphData.map((entry, index) => (
              <Cell
                fill={
                  focusBar === index || mouseLeave
                    ? `url(#${gradientColour[graphColour].regular})`
                    : gradientColour[graphColour].hover
                }
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {renderTooltip()}
    </div>
  );
};

export default BarGraph;
