import prisma from "@/app/lib/db";
import { nylas } from "@/app/lib/nylas";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import {
  addMinutes,
  format,
  fromUnixTime,
  isAfter,
  isBefore,
  parse,
} from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GetFreeBusyResponse, NylasResponse } from "nylas";

async function getData(userName: string, selectedDate: Date) {
  const formattedDate = format(selectedDate, "EEEE");

  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const data = await prisma.availability.findFirst({
    where: {
      day: formattedDate as Prisma.EnumDayFilter,
      User: {
        userName: userName,
      },
    },
    select: {
      id: true,
      fromTime: true,
      tillTime: true,
      User: {
        select: {
          grantEmail: true,
          grantId: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data.User?.grantId as string,
    requestBody: {
      startTime: Math.floor(startOfDay.getTime() / 1000),
      endTime: Math.floor(endOfDay.getTime() / 1000),
      emails: [data.User?.grantEmail as string],
    },
  });

  return { data, nylasCalendarData };
}

interface iAppProps {
  selectedDate: Date;
  userName: string;
  duration: number;
}

function calculateAvailableTimes(
  date: string,
  dbAvailability: {
    fromTime: string | undefined;
    tillTime: string | undefined;
  },
  nylasData: NylasResponse<GetFreeBusyResponse[]>,
  duration: number
) {
  if (!dbAvailability.fromTime || !dbAvailability.tillTime) return [];

  const now = new Date();

  // Parse database availability time ranges
  const availableFrom = parse(
    `${date} ${dbAvailability.fromTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );
  const availableTill = parse(
    `${date} ${dbAvailability.tillTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  // Parse busy slots from Nylas
  const busySlots = nylasData.data[0].timeSlots.map((slot) => ({
    start: fromUnixTime(slot.startTime),
    end: fromUnixTime(slot.endTime),
  }));

  // Generate all potential time slots
  const allSlots: Date[] = [];
  let currentSlot = availableFrom;

  while (isBefore(currentSlot, availableTill)) {
    allSlots.push(currentSlot);
    currentSlot = addMinutes(currentSlot, duration);
  }

  // Filter out busy slots
  const freeSlots = allSlots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration);

    return (
        isAfter(slot, now) && // Must be in the future
        !busySlots.some(
          (busy: { start: Date; end: Date }) =>
            (isBefore(busy.start, slotEnd) && isAfter(busy.end, slot)) // Any overlap at all
        )
      );
  });

  return freeSlots.map((slot) => format(slot, "HH:mm a"));
}

export async function TimeTable({ selectedDate, userName, duration }: iAppProps) {
  const { data, nylasCalendarData } = await getData(userName, selectedDate);

  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const dbAvailability = {
    fromTime: data?.fromTime,
    tillTime: data?.tillTime,
  };

  const availableSlots = calculateAvailableTimes(
    formattedDate,
    dbAvailability,
    nylasCalendarData,
    duration
  );

  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE, ")}
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, "MMM. d")}
        </span>
      </p>

      <div className="mt-3 max-h-[350px] overflow-y-auto">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <Link key={index} href={`?date=${format(selectedDate, "yyyy-MM-dd")}&time=${slot}`}>
              <Button variant="outline" className="mb-2 w-full">
                {slot}
              </Button>
            </Link>
          ))
        ) : (
          <p>No slots available</p>
        )}
      </div>
    </div>
  );
}
