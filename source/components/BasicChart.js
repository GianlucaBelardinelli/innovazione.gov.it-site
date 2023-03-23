import React, { useEffect, useRef } from "react";
import ReactEcharts from "echarts-for-react";
import { formatTooltip, log } from "./utils/chartUtils";

function BasicChart({ id, data, setEchartInstance }) {
  const refCanvas = useRef(null);

  useEffect(() => {
    if (refCanvas.current) {
      const echartInstance = refCanvas.current.getEchartsInstance();
      // const base64DataUrl = echartInstance.getDataURL();
      setEchartInstance(echartInstance);
    }
  }, [refCanvas.current]);

  function getOptions(data) {
    const config = data.config;
    let grid = {
      left: config.gridLeft || "10%",
      right: config.gridRight || "10%",
      height: config.gridHeight || "auto",
      width: config.gridWidth || "auto",
      bottom: config.gridBottom || 60,
      top: config.gridTop || 60,
    };
    const zoom = config.zoom || "none";
    let dataZoom = [];
    if (zoom !== "none") {
      const x = [
        {
          show: true,
          start: 1,
          end: 100,
          xAxisIndex: [0],
          type: "inside",
        },
        {
          show: true,
          start: 1,
          end: 100,
          xAxisIndex: [0],
          type: "slider",
        },
      ];
      const y = [
        {
          show: true,
          start: 1,
          end: 100,
          yAxisIndex: [0],
          type: "inside",
        },
        {
          show: true,
          start: 1,
          end: 100,
          yAxisIndex: [0],
          type: "slider",
        },
      ];

      if (zoom === "both_axis") {
        dataZoom = [...x, ...y];
      } else if (zoom === "x_axis") {
        dataZoom = [...x];
      } else if (zoom === "y_axis") {
        dataZoom = [...y];
      }
    }

    let dataZoomOpt = ["both_axis", "x_axis", "y_axis"].includes(zoom)
      ? { dataZoom }
      : {};

    let xName = config.xLabel
      ? {
          name: config.xLabel,
          nameLocation: "middle",
          nameGap: 50,
        }
      : {};
    let yName = config.yLabel
      ? {
          name: config.yLabel,
          nameLocation: "middle",
          nameGap: 50,
        }
      : {};

    const axis =
      config.direction === "vertical"
        ? {
            xAxis: {
              ...xName,
              type: "category",
              data: data.dataSource.categories,
              alignTicks: true,
            },
            yAxis: {
              ...yName,
              nameRotate: 90,
              type: "value",
              alignTicks: true,
            },
          }
        : {
            yAxis: {
              ...xName,
              nameRotate: 90,
              type: "category",
              data: data.dataSource.categories,
              alignTicks: true,
            },
            xAxis: {
              ...yName,
              type: "value",
              alignTicks: true,
            },
          };

    const tooltip = {
      trigger: config.tooltipTrigger || "item",
      axisPointer: {
        type: "shadow",
      },
      valueFormatter: (value) => {
        return formatTooltip(value, config);
      },
      show: config.tooltip,
    };

    const options = {
      backgroundColor: config.background ? config.background : "#F2F7FC",
      color: config.colors || null,
      ...axis,
      grid,
      series: data.dataSource.series.map((serie) => {
        let rest = { stack: false, smooth: false };
        if (config.stack) {
          let stack = config.stack
            ? config.direction === "vertical"
              ? "x"
              : "y"
            : false;
          rest = { ...rest, stack };
        }
        if (serie.type === "line" && config.smooth) {
          let smooth = config.smooth ? parseFloat(config.smooth) : false;
          rest = { ...rest, smooth };
        }
        return {
          ...serie,
          ...rest,
        };
      }),
      textStyle: {
        fontFamily: "Titillium Web, sans-serif",
        fontWeight: "semibold",
        fontSize: 12,
      },
      tooltip,
      legend: {
        type: "scroll",
        left: "center",
        top: "bottom",
        show: config.legend,
      },
      ...dataZoomOpt,
    };
    return options;
  }

  if (!data) return <div>...</div>;
  const chartHeight = data.config?.h || "350px";
  return (
    <div key={id} id={"chart_" + id}>
      <ReactEcharts
        id={id}
        option={getOptions(data)}
        ref={refCanvas}
        style={{
          width: "100%",
          height: chartHeight,
          maxWidth: "100%",
        }}
      />
    </div>
  );
}

export default BasicChart;
