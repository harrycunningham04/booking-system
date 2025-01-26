"use client";

import { CalendarCheck, HomeIcon, Settings, Users2, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface iAppProps {
  id: number;
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const dashboardLinks: iAppProps[] = [
  {
    id: 0,
    name: "Event Types",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Meetings",
    href: "/dashboard/meetings",
    icon: Users2,
  },
  {
    id: 2,
    name: "Availability",
    href: "/dashboard/availability",
    icon: CalendarCheck,
  },
  {
    id: 3,
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardLinks() {

const pathName = usePathname();

  return (
    <>
      {dashboardLinks.map((link) => (
        <Link className={cn(
            pathName === link.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground', 'flex items-center gap-3 rounded-lg px-4 py-3 transition-all hover:text-primary'
        )} href={link.href} key={link.id} >
            <link.icon className="size-5" />
            {link.name}
        </Link>
      ))}
    </>
  );
}
