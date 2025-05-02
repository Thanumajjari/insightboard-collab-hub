
import { useQuery } from "@tanstack/react-query";
import { getWidgetsByProjectId } from "@/services/projectService";
import { Skeleton } from "@/components/ui/skeleton";
import WidgetDisplay from "@/components/widgets/WidgetDisplay";

interface ProjectWidgetGridProps {
  projectId: string;
}

const ProjectWidgetGrid = ({ projectId }: ProjectWidgetGridProps) => {
  const { data: widgets, isLoading } = useQuery({
    queryKey: ["widgets", projectId],
    queryFn: () => getWidgetsByProjectId(projectId),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="col-span-1 md:col-span-2 lg:col-span-1">
              <Skeleton className="h-[250px] w-full" />
            </div>
          ))}
      </div>
    );
  }

  if (!widgets || widgets.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No widgets available</h3>
        <p className="text-muted-foreground">
          There are no analytics widgets for this project yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {widgets.map((widget) => (
        <WidgetDisplay key={widget.id} widget={widget} />
      ))}
    </div>
  );
};

export default ProjectWidgetGrid;
