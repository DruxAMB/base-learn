import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Course } from "@/mongodb/Course";

const CoursesPage = async () => {
  const { userId } = auth();
  
  if (!userId) {
    return redirect("/");
  }

  const courses = await Course.find({ userId }).sort({ createdAt: -1 }).lean();

  console.log(courses, "CoursesPage")
  return ( 
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
   );
}
 
export default CoursesPage;