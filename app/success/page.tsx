import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessRoute() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="max-w-[400px] w-full mx-auto">
        <CardContent className="p-6 flex flex-col w-full items-center justify-center">
          <div className="size-16 bg-green-500/10 rounded-full items-center justify-center flex">
            <Check className="text-green-500 size-10" />
          </div>
          <CardTitle className="text-center text-2xl mt-3">
            This event is Scheduled
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground mt-2">
            We have emailed you a calendar invitation ith all the details and
            the video call link!
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/">Close this page.</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
