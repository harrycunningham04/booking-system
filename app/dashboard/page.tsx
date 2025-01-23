import { notFound } from "next/navigation";
import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";
import { EmptyState } from "../components/EmptyState";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType:{
        select:{
          id:true,
          active:true,
          title:true,
          url:true,
          duration:true,
        }
      }
    }
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
        <EmptyState title="No Event Types" description="You can create your first event by clicking the button below" buttonText="Create Event" href="/dashboard/new" />
        ) : (
          <p>atleast 1 event</p>
        )}
    </>
  );
}
