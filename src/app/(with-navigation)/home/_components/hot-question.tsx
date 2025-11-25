import Comment from "@/assets/message.svg";
import ThumbsUp from "@/assets/thumbs-up.svg";

interface HotQuestionProps {
  rank: number;
  title: string;
  content: string;
  commentCount: number;
}

export default function HotQuestion({ rank, title, content, commentCount }: HotQuestionProps) {
  return (
    <div className="flex gap-5">
      <p className="text-secondary text-xs font-bold">{rank}</p>
      <div className="space-y-4">
        <div className="space-y-1 text-xs">
          <p className="line-clamp-1 font-medium">{title}</p>
          <p className="line-clamp-2">{content}</p>
        </div>
        <div className="text-2xs flex items-center gap-1.5">
          <div className="text-tino-gray flex items-center">
            <ThumbsUp className="size-4" />
            <p>{commentCount}</p>
          </div>
          <p>|</p>
          <div className="flex items-center">
            <Comment className="size-4" />
            <p className="text-secondary">{commentCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
