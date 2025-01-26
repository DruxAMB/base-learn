import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const TeacherLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { orgId } = await auth();

  if (!isTeacher(orgId)) {
    return redirect("/");
  }

  return <>{children}</>
}
 
export default TeacherLayout;