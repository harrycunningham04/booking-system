import { notFound } from "next/navigation";
import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";
import { EmptyState } from "../components/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Settings, Users2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function Dashboard() {
  const session = await requireUser();

  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="No Event Types"
          description="You can create your first event by clicking the button below"
          buttonText="Create Event"
          href="/dashboard/new"
        />
      ) : (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="hidden sm:grid gap-y-2">
              <h1 className="text-3xl md:text-4xl font-semibold">
                Event Types
              </h1>
              <p className="text-muted-foreground pb-3">
                Create and manage your event types right here.
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/new">Create New Event</Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.eventType.map((item) => (
              <div
                className="overflow-hidden shadow rounded-lg border relative"
                key={item.id}
              >
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>
                        <Settings className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </div>

                <Link href="/" className="flex items-center p-5">
                  <div className="flex-shrink-0">
                    <Users2 className="size-10" />
                  </div>

                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-muted-foreground">
                        {item.duration} Minutes Meeting
                      </dt>
                      <dd className="text-lg font-medium">{item.title}</dd>
                    </dl>
                  </div>
                </Link>
                <div className="flex bg-muted px-5 py-3 justify-between items-center">
                  <Switch />
                  <Button>Edit Event</Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
