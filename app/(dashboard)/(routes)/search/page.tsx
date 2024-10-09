import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { SearchInput } from "@/components/search-input";
import { CoursesList } from "@/components/courses-list";
import { getCourses as getCoursesFromMongodb } from "@/actions/get-courses-mongodb";
import { Category } from "@/mongodb/Category";
import { Categories } from "./_components/categories";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

 
  const categories = await Category.find({})
  .sort({ name: 1 }) // Sort in ascending order (1 for ascending, -1 for descending)
  .lean(); 


  const courses: any = await getCoursesFromMongodb({
    userId,
    ...searchParams,
  })
  console.log(courses)
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories
          items={categories as any[]} // Type assertion as a temporary fix
        />
        <CoursesList items={courses} />
      </div>
    </>
   );
}
 
export default SearchPage;