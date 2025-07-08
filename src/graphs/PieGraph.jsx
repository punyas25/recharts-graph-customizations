/**
 *  PieChart with customized Label and Pointer line
 */
"use client";
import { formatLargeNumbers } from "../lib/utils.js";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = [
  "#8979FF",
  "#FF928A",
  "#3CC3DF",
  "#FFAE4C",
  "#537FF1",
  "#6FD195",
];

const PieGraph = ({
  graphData,
  dataKey,
  nameKey,
  innerRadius,
  outerRadius,
  currency,
}) => {
  const RADIAN = Math.PI / 180;

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    innerRadius,
    percent,
    name,
    value,
    payload,
  }) => {
    const angle = midAngle * RADIAN;
    // Position of the point on the outer edge of the pie slice
    const x = cx + outerRadius * Math.cos(-angle);
    const y = cy + outerRadius * Math.sin(-angle);

    // Position for the end of the connecting line's radial segment
    const lineRadialOffset = 20; // How far the line extends radially from the outerRadius
    const lineX = cx + (outerRadius + lineRadialOffset) * Math.cos(-angle);
    const lineY = cy + (outerRadius + lineRadialOffset) * Math.sin(-angle);

    const horizontalLineLength = 90; // Length of the horizontal segment of the line

    // Calculate the final X and Y coordinates for the end of the connecting line
    // This forms the horizontal segment and is the anchor for the text block
    const finalLineX =
      Math.cos(-angle) >= 0
        ? lineX + horizontalLineLength
        : lineX - horizontalLineLength;
    const finalLineY = lineY;

    const textAnchor = Math.cos(-angle) >= 0 ? "start" : "end"; // 'start' for labels on RHS, 'end' for labels on LHS

    // Calculate the base X for the text, considering the textAnchor and padding (36 is brandNameWidth approx)
    const baseTextX = Math.cos(-angle) >= 0 ? finalLineX - 65 : finalLineX + 75;

    let formattedRevenue = formatLargeNumbers(payload.revenue);
    const nameYOffset = -12;
    const valueLineYOffset = 12;

    // Adjust offsets for "small slices" to make labels more compact and prevent overlap
    const isSmallSlice = percent < 0.08;
    const smallSliceNameYOffset = -8;
    const smallSliceValueLineYOffset = 8;

    const getTextWidth = (text, fontSize = 12) =>
      text.length * (fontSize * 0.6);
    const estimatedRevenueTextWidth = getTextWidth(
      `${currency} ${formattedRevenue}`,
      12
    );
    const estimatedPercentageTextWidth = getTextWidth(
      `${(percent * 100).toFixed(2)} %`,
      12
    );

    let revenueX, percentageX;
    if (textAnchor === "start") {
      // Right side: Revenue then Percentage
      revenueX = baseTextX - 10;
      percentageX = baseTextX + estimatedRevenueTextWidth - 15;
    } else {
      // Left side: Percentage then Revenue
      percentageX = baseTextX;
      revenueX = percentageX - estimatedRevenueTextWidth - 10;
    }

    return (
      <g>
        <path
          d={`M${x},${y}L${lineX},${lineY}L${finalLineX},${finalLineY}`}
          stroke={payload.fill}
          strokeWidth={1}
          fill="none"
        />
        <text
          x={baseTextX}
          y={finalLineY + (isSmallSlice ? smallSliceNameYOffset : nameYOffset)}
          textAnchor={textAnchor}
          fill="#000"
          dominantBaseline="middle"
          className={`capitalize text-[10px] font-medium leading-5`}
        >
          {name}
        </text>
        <text
          x={revenueX}
          y={
            finalLineY +
            (isSmallSlice ? smallSliceValueLineYOffset : valueLineYOffset)
          }
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fill="#DF0082"
          className="text-[10px] font-bold leading-5"
        >
          {currency} {formattedRevenue}
        </text>
        <text
          x={percentageX}
          y={
            finalLineY +
            (isSmallSlice ? smallSliceValueLineYOffset : valueLineYOffset)
          }
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fill={payload.fill}
          className={`text-[10px] font-semibold leading-5`}
        >
          {`${(percent * 100).toFixed(2)} %`}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={450}>
      <PieChart margin={{ right: 10, top: 0, bottom: 15, left: 10 }}>
        <Pie
          data={graphData}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={1.5}
          labelLine={false}
          label={renderLabel}
          startAngle={90}
          endAngle={450}
        >
          {graphData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieGraph;
