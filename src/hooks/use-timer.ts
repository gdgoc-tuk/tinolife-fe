import { useEffect, useRef, useState } from "react";

interface UseTimerReturn {
  timeLeft: number;
  startTimer: (time?: number) => void;
  stopTimer: () => void;
}

const RESEND_TIME_LIMIT = 5 * 60; // 5분 = 300초

export function useTimer(initialTime: number = RESEND_TIME_LIMIT): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 타이머 시작
  const startTimer = (time?: number) => {
    stopTimer(); // 기존 타이머 클리어
    setTimeLeft(time ?? initialTime);
  };

  // 타이머 중지
  const stopTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setTimeLeft(0);
  };

  // 타이머 효과
  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    }
  }, [timeLeft]);

  return {
    timeLeft,
    startTimer,
    stopTimer,
  };
}
