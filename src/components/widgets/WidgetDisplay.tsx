
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Widget } from "@/lib/mockData";
import MetricWidget from "./MetricWidget";
import ChartWidget from "./ChartWidget";
import TableWidget from "./TableWidget";

interface WidgetDisplayProps {
  widget: Widget;
  isLoading?: boolean;
}

const WidgetDisplay = ({ widget, isLoading }: WidgetDisplayProps) => {
  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-40 w-full" />
        </CardContent>
      </Card>
    );
  }

  const renderWidgetContent = () => {
    switch (widget.type) {
      case "metric":
        return <MetricWidget data={widget.data} />;
      case "chart":
        // Make sure chart config has the required properties
        const chartConfig = {
          chartType: (widget.config.chartType as 'line' | 'bar' | 'pie') || 'line',
          displayLegend: !!widget.config.displayLegend,
          ...widget.config
        };
        return <ChartWidget data={widget.data} config={chartConfig} />;
      case "table":
        return <TableWidget data={widget.data} config={widget.config} />;
      default:
        return <div>Unsupported widget type</div>;
    }
  };

  // Determine the className based on widget size
  const getSizeClass = () => {
    switch (widget.size) {
      case "small":
        return "col-span-1";
      case "medium":
        return "col-span-1 md:col-span-2";
      case "large":
        return "col-span-1 md:col-span-2 lg:col-span-3";
      default:
        return "col-span-1";
    }
  };

  return (
    <Card className={`h-full ${getSizeClass()}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{widget.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderWidgetContent()}
      </CardContent>
    </Card>
  );
};

export default WidgetDisplay;
