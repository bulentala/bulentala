import Nav from "./Nav";
import Logo from "./Logo";
const Header = () => {
  return (
    <header className='flex items-center justify-between'>
      <Logo />
      <Nav />
    </header>
  );
};

export default Header;
