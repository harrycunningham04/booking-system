import { requireUser } from "../lib/hooks";

export default async function Dashboard() {
const session = await requireUser();

  return (
    <div>
      <h1>Hi from the Dashboard</h1>
    </div>
  );
}
