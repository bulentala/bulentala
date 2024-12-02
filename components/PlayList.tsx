import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { YouTubeEmbed } from "@next/third-parties/google";
import { Description } from "@radix-ui/react-dialog";
const playList = [
  {
    id: 1,
    title: "Denizdeyim",
    artist: "Peyk",
    songId: "zPLJX-Pqgus",
    description: "",
  },
  {
    id: 2,
    title: "Kocaman Sıfır",
    artist: "Peyk",
    songId: "O64W81QgYrg",
    description:
      "Ve de hep bu yanlış anlamam, bok gibi zamanlamam, çuvallamam Ve gelmişiz bugüne beni çözmeye...",
  },
  {
    id: 3,
    title: "Bipolar",
    artist: "Şara Kaplan",
    songId: "I_fDIOc17NM",
    description: "bipolarım bi geçimsizim...",
  },
  {
    id: 4,
    title: "Saraiman",
    artist: "Ladaniva",
    songId: "vGGbp88ziXU",
    description: "datdre datdre datdre day da da...",
  },
];

export default function PlayList() {
  return (
    <div>
      <p className="pb-4 font-medium text-gray-500">playList</p>
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
              <DialogHeader>
                <DialogTitle>
                  {song.title}-{song.artist}
                </DialogTitle>
                <DialogDescription className="text-xs">
                  {song.description}
                </DialogDescription>
              </DialogHeader>
              <YouTubeEmbed videoid={song.songId} params="controls=0" />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
