import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LogOut } from 'lucide-react';
import { LinkIcon } from 'lucide-react';
import { UrlState } from '@/context';
import useFetch from '@/hooks/use-fetch';
import { logout } from '@/db/api-auth';
import { BarLoader } from 'react-spinners';

export default function Header() {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();

  const { loading, fn: logoutFn } = useFetch(logout);

  const handleLogin = () => navigate('/auth');

  const handleLogout = () => {
    logoutFn().then(() => {
      fetchUser();
      navigate('/');
    });
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to={'/'}>
          <img src="/logo.png" alt="Website logo" className="h-16" />
        </Link>
        <div>
          {!user ? (
            <Button onClick={handleLogin}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_img}
                    className="object-cover"
                  />
                  <AvatarFallback>AN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name || 'My Account'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    <span> My Links</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-400 cursor-pointer"
                  onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={'100%'} color="#36d7b7" />}
    </>
  );
}
