import Link from "next/link";

const data = [
  {
    id: 1,
    title: "Ölmeden önce yapılamayacak yüz şey.",
    url: "#",
  },
  {
    id: 2,
    title: "Napıcaz be kamil ? ",
    url: "#",
  },
];
const HomePage = () => {
  return (
    <div className='pb-6 pt-3'>
      {data.map((item) => (
        <div key={item.id} className='truncate pt-3'>
          <Link href={item.url}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
