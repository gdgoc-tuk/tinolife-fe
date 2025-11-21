import { z } from "zod";

const signupFormSchema = z
  .object({
    email: z.string().regex(/^[A-Za-z\d]+@tukorea\.ac\.kr$/, "학교 이메일만 사용 가능합니다."),
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
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

type SignupForm = z.infer<typeof signupFormSchema>;

export { signupFormSchema, type SignupForm };
