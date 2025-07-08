/**
 *  FunnelChart with customized Bar Labels,
 *  with hover effects on bar focus
 */

import React, { useState, useRef, useEffect } from "react";
import {
  FunnelChart,
  Funnel,
  ResponsiveContainer,
  LabelList,
  Tooltip,
} from "recharts";
import { formatLargeNumbers } from "../lib/utils.js";

const FunnelGraph = ({
  graphData,
  funnelKey,
  labelLeft,
  labelCenter,
  labelRight,
}) => {
  const [maxWidth, setMaxWidth] = useState(550);
  const [focusBar, setFocusBar] = useState(null);
  const [mouseLeave, setMouseLeave] = useState(true);

  const containerRef = useRef(null);

  useEffect(() => {
    const updateMaxWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setMaxWidth(containerWidth * 0.95);
      }
    };

    updateMaxWidth();
    window.addEventListener("resize", updateMaxWidth);
    return () => {
      window.removeEventListener("resize", updateMaxWidth);
    };
  }, []);

  const renderLabel = ({
    x,
    y,
    width,
    height,
    value,
    data,
    index,
    dataKey,
    position,
  }) => {
    let xOffset = 10;
    const calculatedWidth = (data[index].percentage / 100) * maxWidth;
    const centeredX = (maxWidth - calculatedWidth) / 2;

    if (dataKey == "brandAndTitle") {
      let title = data[index].title;
      let brand = data[index].brand;
      const shouldTitleMarquee = focusBar === index && title.length > 16;
      const shouldBrandMarquee = focusBar === index && brand.length > 16;
      return (
        <g
          transform={`translate(${centeredX - 100},${y})`}
          className={` ${
            focusBar === index || mouseLeave ? "opacity-100" : "opacity-40"
          }`}
        >
          <foreignObject
            x={0}
            y={12}
            width={80}
            height={20}
            style={{ overflow: "hidden" }}
          >
            <div className={`marquee-container`}>
              <div
                className={`capitalize text-center text-[10px] font-medium text-[#090909] ${
                  shouldTitleMarquee ? "marquee-text" : "recharts-ellipsis"
                }`}
              >
                {title}
              </div>
            </div>
          </foreignObject>

          <foreignObject
            x={0}
            y={24}
            width={80}
            height={20}
            style={{ overflow: "hidden" }}
          >
            <div className={`marquee-container`}>
              <div
                className={`capitalize text-center text-[10px] text-[#6C7072] ${
                  shouldBrandMarquee ? "marquee-text" : "recharts-ellipsis "
                }`}
              >
                {brand}
              </div>
            </div>
          </foreignObject>
        </g>
      );
    } else {
      const textY = y + height / 2 - 10;
      const finalX =
        position === "left"
          ? centeredX - xOffset
          : centeredX + calculatedWidth + xOffset + 30;

      let finalValue = `${value.split(" ")[0]} ${formatLargeNumbers(
        data[index].revenue,
        1
      )}`;

      return (
        <text
          x={finalX}
          y={textY}
          fill="#090909"
          fontSize={12}
          className={`font-medium ${
            focusBar === index || mouseLeave ? "opacity-100" : "opacity-40"
          }`}
          textAnchor="middle"
        >
          {finalValue}
        </text>
      );
    }
  };

  const renderRectangle = ({ x, y, width, fill, name, data }) => {
    const minBarWidth = 26;
    let calculatedWidth = (data[name].percentage / 100) * maxWidth;
    const finalWidth = Math.max(calculatedWidth, minBarWidth);
    const centeredX = (maxWidth - finalWidth) / 2;

    return (
      <rect
        x={centeredX}
        y={y}
        width={finalWidth}
        height={47.5}
        rx="8"
        fill={
          focusBar === name || mouseLeave ? "url(#gradient_bar)" : "#FFE8F5"
        }
      />
    );
  };

  const centeredLabel = (props) => {
    const { x, y, width, height, value, data, index } = props;

    let calculatedWidth = (data[index].percentage / 100) * maxWidth;

    if (index === data.length - 2 || index === data.length - 1) {
      // Last 2
      calculatedWidth = (data[index].percentage / 100) * maxWidth;
    }

    const labelX = maxWidth / 2;
    const labelY = y + height / 2 - 10;

    return (
      <text
        className="font-semibold text-sm"
        x={labelX}
        y={labelY}
        fill={`${focusBar === index ? "#007AFF" : "#ffffff"}`}
        fontSize={10}
        textAnchor="middle"
      >
        {value}%
      </text>
    );
  };

  const CustomToolTip = ({}) => {
    return null;
  };

  return (
    <div className="flex justify-center" ref={containerRef}>
      <ResponsiveContainer width="100%" height={450}>
        <FunnelChart margin={{ right: 30, top: 0, bottom: 20, left: 30 }}>
          <defs>
            <linearGradient id="gradient_bar" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stop-color="#FFC8E8" />
              <stop offset="112.98%" stop-color="#FF74C5" />
            </linearGradient>
          </defs>
          <Tooltip cursor={false} content={<CustomToolTip />} />
          <Funnel
            dataKey={funnelKey}
            data={graphData}
            fill="url(#gradient_bar)"
            isAnimationActive
            shape={(props) => renderRectangle({ ...props, data: graphData })}
            onMouseEnter={(state) => {
              setFocusBar(state.name);
              setMouseLeave(false);
            }}
            onMouseLeave={() => {
              setFocusBar(null);
              setMouseLeave(true);
            }}
          >
            <LabelList
              stroke="none"
              dataKey={labelLeft}
              style={{ fontSize: 10 }}
              content={(props) =>
                renderLabel({
                  ...props,
                  data: graphData,
                  index: props.index,
                  dataKey: labelLeft,
                  position: "left",
                })
              }
            />
            <LabelList
              position="center"
              stroke="none"
              dataKey={labelCenter}
              fill="#fff"
              style={{ fontSize: 16, fontWeight: 600 }}
              formatter={(value) => `${value}%`}
              content={(props) =>
                centeredLabel({ ...props, data: graphData, index: props.index })
              }
            />
            <LabelList
              dataKey={labelRight}
              stroke="none"
              fill="#090909"
              style={{ fontSize: 12 }}
              content={(props) =>
                renderLabel({
                  ...props,
                  data: graphData,
                  index: props.index,
                  dataKey: labelRight,
                  position: "right",
                })
              }
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FunnelGraph;
