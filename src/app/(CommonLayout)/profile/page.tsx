import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProfile } from "@/services/profile";
import {
  Award,
  BookOpen,
  Calendar,
  Edit3,
  Mail,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";

const ProfilePage = async () => {
  const { data: user } = await getProfile();

  if (!user) {
    return (
      <div className="text-center py-20 font-bold">User profile not found!</div>
    );
  }

  // মেম্বারশিপ ডেট ফরম্যাটিং
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* 🚀 Dynamic Header Background */}
      <div className="h-60 w-full bg-linear-to-r from-violet-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="dots"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-5 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 👤 Left Column: Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="relative inline-block mb-6">
                  {/* Avatar with Initials */}
                  <div className="w-32 h-32 rounded-[2rem] bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-violet-200">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white w-8 h-8 rounded-full shadow-sm" />
                </div>

                <h2 className="text-2xl font-black text-gray-900 mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-500 font-medium mb-4">{user.email}</p>

                <Badge
                  className={`px-4 py-1.5 rounded-xl border-none font-bold uppercase tracking-wider ${
                    user.role === "ADMIN"
                      ? "bg-red-100 text-red-600"
                      : "bg-violet-100 text-violet-600"
                  }`}
                >
                  {user.role}
                </Badge>

                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                      Status
                    </p>
                    <p
                      className={`text-sm font-black ${user.isBanned ? "text-red-500" : "text-green-500"}`}
                    >
                      {user.isBanned ? "Banned" : "Active"}
                    </p>
                  </div>
                  <div className="text-center border-l border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                      Joined
                    </p>
                    <p className="text-sm font-black text-gray-900">
                      {joinedDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Menu */}
          </div>

          {/* 📊 Right Column: Detailed Info & Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <User />, label: "Full Name", value: user.name },
                { icon: <Mail />, label: "Email Address", value: user.email },
                {
                  icon: <ShieldCheck />,
                  label: "Account Role",
                  value: user.role,
                },
                {
                  icon: <Calendar />,
                  label: "Member Since",
                  value: joinedDate,
                },
              ].map((info, idx) => (
                <Card
                  key={idx}
                  className="border-none shadow-lg shadow-gray-200/50 rounded-3xl bg-white p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-violet-50 rounded-2xl text-violet-600">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        {info.label}
                      </p>
                      <p className="text-lg font-black text-gray-800">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Placeholder for Learning Stats (EYE-CATCHY) */}
            <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-gray-900">
                  Learning Activity
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl font-bold border-violet-200 text-violet-600"
                >
                  <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    label: "Enrolled",
                    count: "12",
                    icon: <BookOpen />,
                    bg: "bg-blue-500",
                  },
                  {
                    label: "Completed",
                    count: "08",
                    icon: <Award />,
                    bg: "bg-green-500",
                  },
                  {
                    label: "Achievements",
                    count: "05",
                    icon: <Star />,
                    bg: "bg-yellow-500",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="relative group p-6 rounded-[2rem] bg-gray-50 border border-gray-100 overflow-hidden transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1"
                  >
                    <div
                      className={`absolute top-0 right-0 w-20 h-20 ${stat.bg} opacity-5 rounded-bl-full`}
                    />
                    <div
                      className={`mb-4 w-12 h-12 flex items-center justify-center rounded-2xl text-white ${stat.bg} shadow-lg shadow-gray-200`}
                    >
                      {stat.icon}
                    </div>
                    <p className="text-3xl font-black text-gray-900 mb-1">
                      {stat.count}
                    </p>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
