import TutorDashboard from "@/components/modules/tutor/TutorDashboard";
import { getTutorBookings, getTutorEarnings } from "@/services/Dashboard/tutorActions";
import { getAllCategories } from "@/services/category/CategoryAction";

export default async function TutorDashboardPage() {
  const [bookRes, earnRes, catRes] = await Promise.all([
    getTutorBookings(),
    getTutorEarnings(),
    getAllCategories(),
  ]);

  return (
    <TutorDashboard
      initialBookings={Array.isArray(bookRes?.data) ? bookRes.data : []}
      initialEarnings={earnRes?.data || null}
      initialCategories={Array.isArray(catRes) ? catRes : []}
    />
  );
}
