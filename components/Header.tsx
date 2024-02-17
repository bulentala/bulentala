import { CommandMenu } from "./CommandMenu";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className='pl-3 flex justify-between items-center'>
      <Logo />
      <CommandMenu />
    </header>
  );
};

export default Header;
