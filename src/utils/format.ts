export const getTimeDisplay = (date: string) => {
  const now = new Date();
  const createDate = new Date(date);
  const diffTime = now.getTime() - createDate.getTime();

  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  // 하루 이내 (24시간 이내)
  if (diffHours < 24) {
    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    }
    return `${diffHours}시간 전`;
  }

  // 어제 (24시간 ~ 48시간 전)
  if (diffHours < 48) {
    const hours = createDate.getHours();
    const minutes = createDate.getMinutes();
    const period = hours < 12 ? "오전" : "오후";
    const displayHours = hours <= 12 ? hours : hours - 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `어제 ${period} ${displayHours}:${displayMinutes}`;
  }

  // 그 이전 시간
  if (diffYears >= 1) {
    return `${diffYears}년 전`;
  }

  if (diffMonths >= 1) {
    return `${diffMonths}달 전`;
  }

  return `${diffDays}일 전`;
};
