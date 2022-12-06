import Image from "next/image";
import MyComponent from "./MyComponents";

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Image alt='Bülent ALA' src='/bulentAla.png' width='100' height='100' />
      <MyComponent />
    </div>
  );
};

export default Hero;
