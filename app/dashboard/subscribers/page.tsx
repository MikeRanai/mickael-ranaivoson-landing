import { getSubscribers } from "@/actions/subscriber.actions";
import SubscribersTable from "@/components/admin/SubscribersTable";

export const metadata = {
  title: "Abonnés newsletter",
  robots: { index: false, follow: false },
};

export default async function AdminSubscribersPage() {
  const subscribers = await getSubscribers();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Abonnés newsletter</h1>
        <p className="text-sm text-slate-400 mt-1">
          {subscribers.length} abonné{subscribers.length > 1 ? "s" : ""}
        </p>
      </div>

      <SubscribersTable subscribers={subscribers} />
    </div>
  );
}
