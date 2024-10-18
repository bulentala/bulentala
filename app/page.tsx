export default function HomePage() {
  const colors = [
    "grey",
    "brown",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "red",
  ];

  return (
    <div className="mx-auto max-w-2xl min-h-screen">
      <div className="text-center">
        <div>A|A</div>
        <div className="rounded-full w-12 h-12 items-center justify-center flex mx-auto bg-notion-bg-purple" />
        <div>May the force be with you</div>
        <div>Işık Ülkesine Dair</div>
      </div>

      {Array.from({ length: 15 }).map((_, index) => {
        // Renkleri seçerken tekrar etmemesi için bir kopya dizi kullanıyoruz
        const remainingColors = [...colors];

        const color1 = remainingColors.splice(
          Math.floor(Math.random() * remainingColors.length),
          1
        )[0];
        const color2 = remainingColors.splice(
          Math.floor(Math.random() * remainingColors.length),
          1
        )[0];
        const color3 = remainingColors.splice(
          Math.floor(Math.random() * remainingColors.length),
          1
        )[0];
        const color4 = remainingColors.splice(
          Math.floor(Math.random() * remainingColors.length),
          1
        )[0];

        return (
          <div
            key={index}
            className={`p-3 group cursor-pointer hover:bg-notion-bg-${color1} hover:shadow-sm shadow-notion-bg-${color1}/50`}
          >
            <div className="flex items-center">
              <div
                className={`pr-2 text-notion-grey group-hover:text-notion-${color2}`}
              >
                2024
              </div>
              <div
                className={`line-clamp-1 font-medium group-hover:text-notion-${color3}`}
              >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </div>
            </div>
            <div
              className={`text-notion-grey group-hover:text-notion-${color4}`}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Cupiditate, et debitis harum aliquid pariatur perferendis nemo
              adipisci quidem fugit nulla?
            </div>
          </div>
        );
      })}

      <div className="text-center">footer</div>
    </div>
  );
}
