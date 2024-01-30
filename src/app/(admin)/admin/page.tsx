import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Session, getServerSession } from 'next-auth';

const AdminHome = async () => {
  const session: Session | null = await getServerSession(authOptions);
  console.log(session);
  // if (session?.user.username) {
  //   return (
  //     <>
  //       <h1 className="page-title">Events</h1>
  //       <h2 className="error">
  //         I&apos;m sorry, you don&apos;t have access to this page. Please
  //         contact the website administrator
  //       </h2>
  //     </>
  //   );
  // }
  return (
    <>
      <h1>Admin Page</h1>
    </>
  );
};

export default AdminHome;
