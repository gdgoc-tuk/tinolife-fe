import Check from "@/assets/check.svg";
import Comment from "@/assets/message.svg";
import { getTimeDisplay } from "@/utils/format";

interface NewQuestionProps {
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  resolved?: boolean;
}

export default function NewQuestion({
  title,
  content,
  createdAt,
  commentCount,
  resolved,
}: NewQuestionProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1 text-xs">
        <p className="line-clamp-1 font-medium">{title}</p>
        <p className="line-clamp-2">{content}</p>
      </div>
      <div className="text-2xs flex items-center gap-1.5">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            <Comment className="size-4" />
            <p className="text-secondary">{commentCount}</p>
          </div>
          {resolved && <Check />}
        </div>
        <p>|</p>
        <p className="text-tino-gray">{getTimeDisplay(createdAt)}</p>
      </div>
    </div>
  );
}
