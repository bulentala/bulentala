"use client";

const playList = [
  {
    id: 1,
    title: "Denizdeyim",
    artist: "Peyk",
    songId: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Kocaman Sıfır",
    artist: "Peyk",
    songId: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Bipolar",
    artist: "Şara Kaplan",
    songId: "I_fDIOc17NM",
  },
  {
    id: 4,
    title: "Saraiman",
    artist: "Ladaniva",
    songId: "vGGbp88ziXU",
  },
];

export default function PlayList() {
  return (
    <div>
      <p className="pb-4 font-medium text-gray-500">playList</p>
      <div>
        {playList.map((song) => (
          <div key={song.id} className="grid grid-cols-[auto,1fr,auto] pb-2">
            <div className="col-start-1">{song.title}</div>
            <div className="col-start-2 mx-1 mb-1 border-b-2 border-dotted" />
            <div className="col-start-3">{song.artist}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
