import Link from "next/link";

const navItems = [
  { name: "Proje", path: "/projeler" },
  { name: "Notlar", path: "/notlar" },
];
const Nav = () => {
  return (
    <nav className='flex items-center space-x-3  font-semibold'>
      {navItems.map((navItem, i) => {
        const { name, path } = navItem;
        return (
          <Link key={i} href={path}>
            {name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
