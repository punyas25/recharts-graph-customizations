/**
 *  PieChart with custom Tooltip
 */
"use client";
import React, { useState } from "react";

import BasicPieTooltip from "./supporting-components/BasicPieTooltip.jsx"; /** This tooltip should be shared as a prop instead of importing here */

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

import { PIE_COLOURS } from "../data/data";

const BasicPieGraph = ({
  graphData,
  dataKey,
  nameKey,
  innerRadius,
  outerRadius,
  dataAvailable,
}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <defs>
          {graphData.map((entry, index) => (
            <linearGradient id={`gradient${index}`} key={`key_${index}`}>
              <stop
                offset="0%"
                stopColor={PIE_COLOURS[index % PIE_COLOURS.length].start}
              />
              <stop
                offset="100%"
                stopColor={PIE_COLOURS[index % PIE_COLOURS.length].end}
              />
            </linearGradient>
          ))}
        </defs>
        <Tooltip content={<BasicPieTooltip />} />
        <Pie
          data={graphData}
          dataKey={dataKey}
          nameKey={nameKey}
          // cx="50%" cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={1}
          startAngle={90}
          endAngle={450}
        >
          {graphData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#gradient${index})`} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BasicPieGraph;
