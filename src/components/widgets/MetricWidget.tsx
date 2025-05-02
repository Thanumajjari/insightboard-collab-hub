
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricWidgetProps {
  data: {
    value: number;
    trend: number;
    previousValue: number;
    format: "currency" | "percentage" | "number";
  };
}

const MetricWidget = ({ data }: MetricWidgetProps) => {
  const formatValue = (value: number) => {
    switch (data.format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
      case "percentage":
        return `${value.toFixed(1)}%`;
      case "number":
      default:
        return new Intl.NumberFormat("en-US").format(value);
    }
  };

  const formattedValue = formatValue(data.value);
  const trendIsPositive = data.trend >= 0;
  const trendPercentage = Math.abs(data.trend * 100).toFixed(1);

  return (
    <div className="space-y-2">
      <div className="text-3xl font-bold">{formattedValue}</div>
      
      <div className="flex items-center">
        <div
          className={cn(
            "flex items-center text-sm",
            trendIsPositive ? "text-green-600" : "text-red-600"
          )}
        >
          {trendIsPositive ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          <span>{trendPercentage}%</span>
        </div>
        
        <span className="text-sm text-muted-foreground ml-2">
          vs previous period
        </span>
      </div>
    </div>
  );
};

export default MetricWidget;
