import { SignInCredentials } from "@interfaces/auth/SignInCredentials";
import { SignInSchema } from "@schemas/auth/Signin.schema";
import { authService } from "@services/Auth.service";
import { useAuthStore } from "@stores/Auth.store";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export function SignInViewModel() {
  const navigate = useNavigate();
  const { mutate, isError, error, isPending } = authService.signIn();
  const { setAuthState } = useAuthStore();

  const signIn = (credentials: SignInCredentials) => {
    mutate(credentials, {
      onSuccess: ({ datas }) => {
        //Store tokens and user infos in AuthStore
        setAuthState({
          token: datas.token,
          refreshToken: datas.refreshToken,
          user: {
            email: datas.user.email,
            firstname: datas.user.firstname,
            lastname: datas.user.lastname,
            role: datas.user.role,
          },
          filters: datas.filters,
        });
        // Temporary add tokens in localStorage to ease dev nagivation
        localStorage.setItem("token", datas.token);
        localStorage.setItem("refreshToken", datas.refreshToken);
        localStorage.setItem("firstname", datas.user.firstname);
        localStorage.setItem("lastname", datas.user.lastname);
        navigate("/");
      },
    });
  };

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        rememberMe: false,
      },
      validationSchema: SignInSchema,
      onSubmit: ({ email, password }) => {
        signIn({ email, password });
      },
    });

  return {
    isError,
    error,
    isPending,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
  };
}
