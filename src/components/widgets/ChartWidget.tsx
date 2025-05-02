
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ChartWidgetProps {
  data: {
    labels: string[];
    datasets: Array<{
      label?: string;
      data: number[];
    }>;
  };
  config: {
    chartType: 'line' | 'bar' | 'pie';
    displayLegend: boolean;
  };
}

const ChartWidget = ({ data, config }: ChartWidgetProps) => {
  const formatChartData = () => {
    if (!data || !data.labels || !data.datasets) return [];
    
    return data.labels.map((label, index) => {
      const dataPoint: Record<string, any> = { name: label };
      
      data.datasets.forEach((dataset, datasetIndex) => {
        const key = dataset.label || `dataset${datasetIndex + 1}`;
        dataPoint[key] = dataset.data[index];
      });
      
      return dataPoint;
    });
  };

  const chartData = formatChartData();
  const colors = ['#4a5beb', '#10b981', '#f97316', '#8b5cf6', '#ef4444', '#06b6d4', '#f59e0b'];

  const renderChart = () => {
    switch (config.chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {config.displayLegend && <Legend />}
              {data.datasets.map((dataset, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={dataset.label || `dataset${index + 1}`}
                  stroke={colors[index % colors.length]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {config.displayLegend && <Legend />}
              {data.datasets.map((dataset, index) => (
                <Bar
                  key={index}
                  dataKey={dataset.label || `dataset${index + 1}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        const pieData = data.labels.map((label, index) => ({
          name: label,
          value: data.datasets[0].data[index]
        }));
        
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              {config.displayLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return <div className="w-full h-full">{renderChart()}</div>;
};

export default ChartWidget;
