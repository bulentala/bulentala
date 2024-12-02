import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { YouTubeEmbed } from "@next/third-parties/google";
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
      <p className="pb-4 font-medium text-gray-500">playListXXX</p>
      <div>
        {playList.map((song) => (
          <Dialog key={song.id}>
            <DialogTrigger className="grid w-full grid-cols-[_auto_1fr_auto] pb-2">
              <div className="col-start-1">{song.title}</div>
              <div className="col-start-2 mx-1 h-4 border-b-2 border-dotted">
                {""}
              </div>
              <div className="col-start-3">{song.artist}</div>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>
                {song.title}-{song.artist}
              </DialogTitle>
              <YouTubeEmbed
                videoid={song.songId}
                height={400}
                params="controls=0"
              />
              <DialogHeader>
                <DialogDescription>sss</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
