const ComposedGraphTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`custom-tooltip bg-white p-[15px] pr-9 border border-pink rounded-xl lg:w-48`}>
          <p className="label font-medium text-xs flex flex-col leading-5">
            <span className="text-black/60">{label}</span>
            {
              (payload[0].payload.graphType == "revenue") ?
                <span className="text-green">Total Sales : {payload[0].payload.currency} {payload[0].payload.totalRevenue.toFixed(2)}</span> :
                <span className="text-green">Total Quantity : {payload[0].payload.totalOrders}</span>
            }
            {
              (payload[0].payload.timeFilter != "daily") &&
              <span className="text-pink">{payload[0].payload.timeFilter == "weekly" ? "WOW" : "MOM"} Growth : {payload[0].payload.growthPercent} %</span>
            }
          </p>
          <div className="absolute -bottom-2 left-24 w-0 h-0 border-l-4 border-l-transparent border-t-8 border-t-pink border-r-4 border-r-transparent">
          </div>
        </div>
      )
    }
    return null
  }
  
  export default ComposedGraphTooltip