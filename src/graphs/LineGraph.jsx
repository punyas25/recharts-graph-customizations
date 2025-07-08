'use client'
import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Label } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-2 border border-pink rounded-md">
          <p className="label text-black/80 font-medium text-xs flex gap-10">
            <span>{label}</span>
            <span>{(payload[0].name == "totalQuantity") ? payload[0].value : `$ ${(payload[0].value).toFixed(2)}`}</span>
          </p>
        </div>
      )
    }
  
    return null
  }

const LineGraph = ({ graphData, dataKey, yaxisLabel,xaxisLabel }) => {
  return (
    <>
      <ResponsiveContainer height={400} className="text-xs" width="100%">
        <LineChart margin={{ right: 25, top: 10, bottom: 15, left: 15 }} data={graphData}>
          <CartesianGrid strokeDasharray="5" vertical={false} />
          <XAxis dataKey="period" dy={5} padding={{ left: 10, right: 10 }}>
            <Label
              position='bottom'
              offset={0}
              value={xaxisLabel}
              className="text-sm font-medium"
            />
          </XAxis>
          <YAxis dx={-5} tickSize={0} axisLine={false} >
            <Label
              className="text-sm font-medium"
              angle={270}
              position='left'
              value={yaxisLabel} 
              />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#DF0082"
            strokeWidth="3"
            dot={{ stroke: '#DF0082', strokeWidth: 2, r: 2 }}
            activeDot={{ stroke: '#DF0082', r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default LineGraph

