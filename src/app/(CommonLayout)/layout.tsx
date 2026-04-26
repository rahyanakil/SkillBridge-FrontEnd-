import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getUser } from "@/services/auth";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  return (
    <div>
      <Navbar initialUser={user} />
      <div className="container mx-auto px-4">{children}</div>
      <Footer />
    </div>
  );
};
export default CommonLayout;
