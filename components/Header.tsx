import Logo from "./Logo";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-14 items-center max-w-3xl mx-auto px-3 justify-between'>
        <Logo />
        <Nav />
      </div>
    </header>
  );
};
export default Header;
