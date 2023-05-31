import React, { useEffect, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';

function BasicChart({ id, config, dataSource, setEchartInstance }) {
  const refCanvas = useRef(null);
  useEffect(() => {
    console.log('MOUNT');
    return () => {
      console.log('UNMOUNT');
    };
  }, []);

  useEffect(() => {
    if (refCanvas.current) {
      const echartInstance = refCanvas.current.getEchartsInstance();
      // const base64DataUrl = echartInstance.getDataURL();
      setEchartInstance(echartInstance);
    }
  }, [refCanvas.current]);

  const axis =
    config.direction === 'vertical'
      ? {
          dataZoom: [
            {
              show: config.zoom !== 'none',
              realtime: true,
              start: 0,
              end: 100,
              xAxisIndex: [0, 1],
              type: config.zoom === 'slider' ? 'slider' : 'inside',
            },
          ],
          xAxis: {
            type: 'category',
            data: dataSource.categories,
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              rotate: 30,
              inside: false,
              // margin: 8,
            },
          },
          yAxis: {
            type: 'value',
            axisTick: {
              alignWithLabel: true,
            },
          },
        }
      : {
          dataZoom: [
            {
              show: config.zoom !== 'none',
              realtime: true,
              start: 0,
              end: 100,
              yAxisIndex: [0, 1],
              type: config.zoom === 'slider' ? 'slider' : 'inside',
            },
          ],
          yAxis: {
            type: 'category',
            data: dataSource.categories,
            axisTick: {
              alignWithLabel: true,
            },
          },
          xAxis: {
            type: 'value',
            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              rotate: 90,
              inside: true,
              margin: 0,
            },
          },
        };

  const options = {
    backgroundColor: config.background ? config.background : '#F2F7FC',
    color: config.colors,
    ...axis,
    series: dataSource.series.map((serie) => {
      return {
        ...serie,
        smooth: config.smooth,
      };
    }),
    textStyle: {
      fontFamily: 'Titillium Web, sans-serif',
      fontWeight: 'bold',
      fontSize: 12,
    },
    grid: {
      left: 0,
      right: 0,
    },
    tooltip: {
      axisPointer: {
        type: config.axisPointer,
      },
      show: config.tooltip,
    },
    legend: {
      left: 'center',
      top: 'bottom',
      show: config.legend,
    },
  };

  const chartHeight = config.h ? config.h : '500px';
  return (
    <>
      <ReactEcharts
        id={id}
        option={options}
        ref={refCanvas}
        style={{
          width: '100%',
          height: chartHeight,
          // height: '500px',
          maxWidth: '100%',
        }}
      />
      {/* <button onClick={() => getImage()}>Download</button> */}
    </>
  );
}

export default BasicChart;
