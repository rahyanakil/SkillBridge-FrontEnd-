import AIChatbot from "@/components/shared/AIChatbot";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getUser } from "@/services/auth";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  return (
    <div className="bg-background min-h-screen transition-colors">
      <Navbar initialUser={user} />
      <div>{children}</div>
      <Footer />
      <AIChatbot />
    </div>
  );
};
export default CommonLayout;
