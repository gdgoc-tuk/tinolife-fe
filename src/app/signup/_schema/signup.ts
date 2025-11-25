import { z } from "zod";

const signupFormSchema = z.object({
  email: z.string().regex(/^[A-Za-z\d]+@tukorea\.ac\.kr$/, "학교 이메일만 사용 가능합니다."),
  grade: z.number().min(1).max(4),
  password: z
    .string()
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[A-Za-z\d\S]{8,20}$/,
      "영문, 숫자, 특수문자를 포함한 8~20자로 입력해주세요."
    ),
  passwordConfirm: z
    .string()
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])[A-Za-z\d\S]{8,20}$/,
      "영문, 숫자, 특수문자를 포함한 8~20자로 입력해주세요."
    ),
  nickname: z
    .string()
    .regex(/^[a-zA-Z0-9가-힣]{2,12}$/, "한글, 영문, 숫자를 사용한 2~12자로 입력해주세요."),
  major_id: z.number().min(1),
  student_id: z.string().regex(/^[0-9]{10}$/, "10자리 숫자로 입력해주세요."),
  interest_ids: z.array(z.number()).min(1),
});

type SignupForm = z.infer<typeof signupFormSchema>;

export { signupFormSchema, type SignupForm };
