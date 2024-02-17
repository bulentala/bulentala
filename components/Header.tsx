import { CommandMenu } from "./CommandMenu";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-14  items-center justify-between max-w-3xl mx-auto pl-4'>
        <Logo />
        <CommandMenu />
      </div>
    </header>
  );
};

export default Header;
