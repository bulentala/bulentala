import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* <div className="col-start-3 row-start-2 self-center text-8xl font-mono text-notion-light-grey ">
        ALA
        </div> */}
      {/* <div class="wrap w-5/6 mx-auto">
        <div class="grid grid-cols-10 ">
          <div class="row-span-full col-start-1 col-span-6 self-center bg-red-500">
            test
          </div>
          <div class="row-span-full col-span-6 col-end-11 self-center p-4 text-white bg-gradient-to-tr to-red-200 via-pink-500 from-blue-500 rounded-lg">
            <h1 class="text-2xl font-bold mt-0">
              title of this overlapping bit
            </h1>
            <p class="mb-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>
      </div> */}
      <div className="relative min-h-screen">
        <div className="  absolute w-full h-full grid grid-cols-3 grid-rows-3 ">
          <div className="col-start-2 row-span-3  border-x border-dashed border-notion-light-brown inline-grid items-center justify-items-center"></div>
        </div>
        <div className="absolute w-full h-full grid grid-cols-3 grid-rows-3 ">
          <div className="border-y border-dashed row-start-2 border-notion-light-brown  inline-grid items-center justify-items-center col-span-3"></div>
        </div>

        <div className="z-10 absolute w-full h-full grid grid-cols-3 grid-rows-3">
          <div className="  row-start-2 row-span-2 inline-grid items-center justify-items-center col-span-2">
            <div className="border bg-notion-bg-light-grey border-dashed border-notion-light-brown col-span-full row-span-full rounded-md  p-3 flex flex-col items-center justify-center ">
              <Link href="isik-ulkesine-dair" className=" text-sm font-mono">IŞIK ÜLKESI'NE DAIR</Link>
              {/* <div className="text-sm">Bak şuraya yazıyorum</div>
              <div className="text-sm">Gez göz hoppacık</div> */}
            </div>
          </div>
        </div>
        <div className=" absolute w-full h-full  grid grid-cols-3 grid-rows-3">
          <div className="  col-span-2 row-span-2 col-start-2 inline-grid items-center justify-items-center">
            <div className="z-10 text-notion-light-grey hover:rotate-45 text-sm font-mono bg-notion-bg-light-grey  border border-dashed border-notion-light-brown col-span-full row-span-full rounded-md p-2  flex items-center justify-center">
              BÜLENT ALA
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
