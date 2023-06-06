import Navbar from './navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function Nav() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return <Navbar user={session?.user} />;
}
