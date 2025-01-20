import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function OnboardingRoute() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome to Harry <span className="text-primary">Cunningham</span>
          </CardTitle>
          <CardDescription>
            We need the following information to set up your profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="grid gap-y-2">
            <Label>Full Name</Label>
            <Input placeholder="Harry Cunningham" />
          </div>
          <div className="grid gap-y-2">
            <Label>Username</Label>
            <div className="flex rounded-md">

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
