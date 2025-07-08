'use client'
import { formatLargeNumbers } from "../lib/utils.js";
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Label, Cell } from 'recharts'

const renderCustomXAxisTick = ({ x, y, payload, focusBar, mouseLeave, index }) => {
  if (payload && payload.value) {
    return (
      <g transform={`translate(${x},${y})`} className={` ${focusBar === index || mouseLeave ? "opacity-100" : "opacity-40"}`}>
        <text
          key={index}
          x={0}
          y={12}
          textAnchor="middle"
          fill="#090909"
          fontSize={10}
          fontWeight="500"
          dy={10}
          className={`capitalize`}
        >
          {payload.value.substring(0, 16)}
        </text>
      </g>
    )
  }
}

const renderCustomYAxisTick = ({ x, y, payload, index }) => {
  if (payload && payload.value) {
    let finalValue = formatLargeNumbers(payload.value, 1)

    return (
      <g transform={`translate(${x},${y})`} >
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
    )
  }
}

const renderLegend = ({ payload }) => {
  const colours = ["bg-purple-11/90", "bg-pink", "bg-blue-7"]
  return (
    <div className="flex gap-4 text-black text-sm font-medium items-center">
      {
        payload.map((entry, index) => (
          <div className="capitalize px-2 py-1.5 border border-pink/5 rounded-full bg-legend-gradient" key={`item-${index}`}>
            <span className={`${colours[index]} inline-block h-3 w-3 rounded-full mr-1.5`} ></span>
            {entry.value}
          </div>
        ))
      }
    </div>
  )
}

const CustomToolTip = ({ }) => {
  return null
}

const renderCustomBarLabel = ({ x, y, width, height, value, index, focusBar, fill }) => {
  let formattedValue = formatLargeNumbers(value, 1)

  if (focusBar === index) {
    return (
      <g>
        <rect
          x={(x + width / 2) - 20} y={y - 30}
          width="40"
          height="25"
          rx="5" ry="5"
          fill="#FFF" stroke="#D3D3D3" stroke-width="1"
        />
        <text x={x + width / 2} y={y} className={`text-[15px] font-medium `} fill={fill} textAnchor="middle" dy={-12}>{formattedValue}</text>
      </g>
    )
  } else {
    return null
  }

}

const MultiBarGraph = ({ graphData, xDataKey, xaxisLabel, yaxisLabel, tickCount, yDataKey1, yDataKey2, yDataKey3, domain }) => {
  const [focusBar, setFocusBar] = useState(null)
  const [mouseLeave, setMouseLeave] = useState(true)
  return (
    <>
      <ResponsiveContainer height={450} className="text-xs" width="100%">
        <BarChart
          margin={{ right: 25, top: 20, bottom: 80, left: 15 }}
          data={graphData}
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              setFocusBar(state.activeTooltipIndex)
              setMouseLeave(false)
            } else {
              setFocusBar(null)
              setMouseLeave(true)
            }
          }}
        >
          <defs>
            <linearGradient id="gradient_bar_1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="13%" stop-color="#dcb4fe" />
              <stop offset="188.61%" stop-color="#360561" />
            </linearGradient>
            <linearGradient id="gradient_bar_2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="12.99%" stop-color="#FFD1EC" />
              <stop offset="161.79%" stop-color="#DF0082" />
            </linearGradient>
            <linearGradient id="gradient_bar_3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="12.98%" stop-color="#D8E0FF" />
              <stop offset="143.65%" stop-color="#7490FF" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="9" stroke="#FFE5F4" vertical={false} />
          <XAxis
            dataKey={xDataKey}
            dy={5}
            padding={{ left: 30, right: 30 }}
            axisLine={false}
            tick={(props) => renderCustomXAxisTick({ ...props, index: props.index, focusBar: focusBar, mouseLeave: mouseLeave })}
            tickLine={false}
            interval={0}
          >
            <Label
              position="bottom"
              offset={20}
              value={xaxisLabel}
              className="text-sm font-medium"
            />
          </XAxis>
          <YAxis dx={-5} tickSize={0} tickCount={tickCount} axisLine={false} domain={domain}
            tick={(props) => renderCustomYAxisTick({ ...props, index: props.index })}
          >
            <Label
              className="text-sm font-medium"
              angle={270}
              position='left'
              value={yaxisLabel}
            />
          </YAxis>
          <Legend
            content={renderLegend}
            wrapperStyle={{ bottom: 10, left: 0 }}
          />
          <Tooltip cursor={false} content={<CustomToolTip />} />
          <Bar
            dataKey={yDataKey1}
            type="monotone"
            barSize={15}
            fill="url(#gradient_bar_1)"
            radius={4}
            label={(props) => renderCustomBarLabel({ ...props, index: props.index, focusBar: focusBar, fill: "url(#gradient_bar_1)" })}
          >
            {graphData.map((entry, index) => (
              <Cell
                key={`bar1_cell_${index}`}
                fill={
                  focusBar === index || mouseLeave
                    ? "url(#gradient_bar_1)"
                    : "#dcb4fe66"
                }
              />
            ))}
          </Bar>
          <Bar
            dataKey={yDataKey2}
            type="monotone"
            barSize={15}
            fill="url(#gradient_bar_2)"
            radius={4}
            label={(props) => renderCustomBarLabel({ ...props, index: props.index, focusBar: focusBar, fill: "url(#gradient_bar_2)" })}
          >
            {graphData.map((entry, index) => (
              <Cell
                key={`bar2_cell_${index}`}
                fill={
                  focusBar === index || mouseLeave
                    ? "url(#gradient_bar_2)"
                    : "#ffd1ec66"
                }
              />
            ))}
          </Bar>
          <Bar
            dataKey={yDataKey3}
            type="monotone"
            barSize={15}
            fill="url(#gradient_bar_3)"
            radius={4}
            label={(props) => renderCustomBarLabel({ ...props, index: props.index, focusBar: focusBar, fill: "url(#gradient_bar_3)" })}
          >
            {graphData.map((entry, index) => (
              <Cell
                key={`bar2_cell_${index}`}
                fill={
                  focusBar === index || mouseLeave
                    ? "url(#gradient_bar_3)"
                    : "#D8E0FF66"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

export default MultiBarGraph
