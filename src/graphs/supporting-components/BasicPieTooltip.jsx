const BasicPieTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <>
        {payload.map((data, index) => (
          <div
            className="lg:w-[305px] lg:h-fit border border-pink/20 bg-white p-5 pb-4 rounded-xl flex flex-col gap-5"
            key={`tooltip_${index}`}
          >
            <div className="flex gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <circle
                  cx="7.5"
                  cy="7.5"
                  r="7.5"
                  fill={`url(#${data.name.toLowerCase()})`}
                  fill-rule="evenodd"
                  fill-opacity=".8"
                />
                <defs>
                  <linearGradient
                    x1="60%"
                    y1="82.034%"
                    x2="40%"
                    y2="17.2%"
                    id={data.name.toLowerCase()}
                  >
                    <stop stop-color={data.payload["gradient-2"]} />
                    <stop offset="1" stop-color={data.payload["gradient-1"]} />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xs text-black/40 font-medium">
                {data.name}
              </span>
            </div>
            <div className="flex divide-x divide-pink/20">
              <div className="text-xs font-medium pr-4">
                <p className="text-black pb-2">Total Sales (100%)</p>
                <p className="text-black/40">
                  {data.payload.currency}{" "}
                  <span className="text-sm text-green">
                    {data.payload.totalBrandRevenue}
                  </span>
                </p>
              </div>
              <div className="text-xs font-medium pl-4">
                <p className="text-black pb-2">
                  {data.payload.name} Sales ({data.payload.percent.toFixed(2)}%)
                </p>
                <p className="text-black/40">
                  {data.payload.currency}{" "}
                  <span className="text-sm text-green">
                    {data.payload.totalRevenue}
                  </span>
                </p>
              </div>
            </div>
            <div className="text-black font-medium">
              <span className="text-xs">{data.payload.name}</span>{" "}
              <span className="text-sm">
                Orders: {data.payload.totalOrders}
              </span>
            </div>
          </div>
        ))}
      </>
    );
  }
  return null;
};

export default BasicPieTooltip;
