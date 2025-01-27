"use client";

import { Switch } from "@/components/ui/switch";
import { useActionState, useEffect, useTransition } from "react";
import { UpdateEventTypeAction } from "../actions";
import { toast } from "sonner";

export function MenuActiveSwitch({
  initalChecked,
  eventTypeId,
}: {
  initalChecked?: boolean;
  eventTypeId?: string;
}) {
  const [state, action] = useActionState(UpdateEventTypeAction, undefined);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Switch
      onCheckedChange={(isChecked) => {
        startTransition(() => {
          action({
            eventTypeId: eventTypeId as string,
            isChecked: isChecked,
          });
        });
      }}
      disabled={isPending}
      defaultChecked={initalChecked}
    />
  );
}
