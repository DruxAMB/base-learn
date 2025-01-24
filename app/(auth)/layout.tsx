import ComingSoon from "@/components/coming-soon";

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return ( 
    <div className="h-full flex items-center justify-center">
      <ComingSoon />
      {/* {children} */}
    </div>
   );
}
 
export default AuthLayout;