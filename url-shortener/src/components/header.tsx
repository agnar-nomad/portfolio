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
import { BarLoader } from 'react-spinners';
import { useLogoutUser, useUser } from '@/hooks/api-hooks';

export default function Header() {
  const navigate = useNavigate();
  const { user } = useUser();

  const { isPending: logoutLoading, mutate: logoutMutation } = useLogoutUser()

  const handleClickLogin = () => navigate('/auth');

  const handleLogout = () => logoutMutation();

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to={'/'}>
          <img src="/logo.png" alt="Website logo" className="h-16" />
        </Link>
        <div>
          {!user ? (
            <Button onClick={handleClickLogin}>Login</Button>
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
      {logoutLoading && <BarLoader className="mb-4" width={'100%'} color="#36d7b7" />}
    </>
  );
}
