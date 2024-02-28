import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
const HomePage = () => {
  return (
    <div>
      <header className='flex items-center justify-between'>
        <Logo />
        <svg
          strokeWidth='1.5'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
        >
          <path
            d='M3 5H11'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M3 12H16'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
          <path
            d='M3 19H21'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>
        </svg>
      </header>
      <Avatar className='mx-auto'>
        <AvatarImage src='https://github.com/bulentala.png' />
        <AvatarFallback>ALA</AvatarFallback>
      </Avatar>
      <div className='text-center'>
        Dawn is a minimal newsletter theme for Ghost. A beautiful way to share
        stories with your growing audience.
      </div>
      <div className='mx-auto w-max space-x-3'>
        <Button variant='destructive'>SUBSCRIBE NOW</Button>
        <Button variant='outline'>LOGIN</Button>
      </div>
      <div className='flex items-center justify-between'>
        <div className='text-lg font-semibold'>FEATURED ARTICLES</div>
        <div className='space-x-2'>
          <Button variant='outline'>{"<"}</Button>
          <Button variant='outline'>{">"}</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
