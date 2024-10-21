"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  OrganizationSwitcher,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Building2, Car, Loader2, LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";

import { SearchInput } from "./search-input";
import Basename from "./basename";

export const NavbarRoutes = () => {
  const { orgId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(orgId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <div className="flex gap2">
          <Basename />
          <ClerkLoaded>
            <UserButton>
              <UserButton.UserProfilePage
                label="Organization"
                labelIcon={<Building2 className="h-4 w-4" />}
                url="organization"
              >
                <h1><b>Organizations</b></h1>
                <hr className="my-4" />
                <OrganizationSwitcher />
              </UserButton.UserProfilePage>
            </UserButton>
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-800" />
          </ClerkLoading>
        </div>
      </div>
    </>
  );
};
