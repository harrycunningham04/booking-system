import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewEventRoute() {
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Add new appointment type</CardTitle>
          <CardDescription>
            Create new appointment type that allows people to book you!
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Title</Label>
              <Input placeholder="30 Minute Meeting" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>URL Slug</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                    HarryCunningham.com/
                </span>
                <Input className="rounded-l-none" placeholder="example-url-1" />
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Meet me in this meeting to..." />
            </div>

            <div>
                
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
