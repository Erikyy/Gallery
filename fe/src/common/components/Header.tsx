import { FC } from 'react';
import { ThemeToggle } from '../../utils/ThemeProvider';

const Header: FC = () => {
  return (
    <header className="flex flex-row fixed bg-slate-50 dark:bg-neutral-800 w-full transition-all duration-300">
      <div className="">
        <div className="dark:text-white transition-all">Gallery</div>
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
