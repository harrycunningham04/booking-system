import { UserPlus, Zap, Lock, CalendarCheck } from "lucide-react";


export default function Feature() {
    const features = [
        {
          name: "Sign Up for Free",
          description: "Create a free account and get started with scheduling in just minutes. No hidden costs, no hassle.",
          icon: UserPlus,
        },
        {
          name: "Blazing Fast",
          description: "Experience lightning-fast scheduling. Say goodbye to delays with our optimized system.",
          icon: Zap,
        },
        {
          name: "Secure Integration",
          description: "Your calendar stays safe with industry-standard encryption powered by Nylas.",
          icon: Lock,
        },
        {
          name: "Effortless Scheduling",
          description: "Our user-friendly interface makes organizing your meetings a breeze.",
          icon: CalendarCheck,
        },
      ];

  return (
    <div className="py-24">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">Schedule Faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Schedule Meetings in Minutes!
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          With Harry<span className="text-primary">Cunningham</span> you can
          schedule meetings in minutes. We make it easy for you to schedule
          meetings. With a variety of platforms for you to choose from.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="flex flex-col gap-y-3 md:flex-row"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="flex-auto">
                  <h3 className="ml-2 text-lg font-semibold leading-8 tracking-tight text-foreground">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
