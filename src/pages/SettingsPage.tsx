
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/sonner";

const SettingsPage = () => {
  const { user } = useAuth();

  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved successfully");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Update your profile information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={user?.name} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user?.email} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="role">Role</Label>
              <Input id="role" readOnly defaultValue={user?.role} disabled />
              <p className="text-xs text-muted-foreground mt-1">
                Role changes require admin approval
              </p>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Control how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Project Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about project changes
                </p>
              </div>
              <Switch defaultChecked id="project-updates" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Comments</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about new comments
                </p>
              </div>
              <Switch defaultChecked id="new-comments" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Team Member Changes</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about team member changes
                </p>
              </div>
              <Switch defaultChecked id="team-changes" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch id="email-notifications" />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSaveNotifications}>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
