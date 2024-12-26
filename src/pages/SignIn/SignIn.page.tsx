import { ButtonSpinner } from "@components/ui/Spinner";
import { SignInViewModel } from "@pages/SignIn/SignIn.viewmodel";

export default function SignInPage() {
  const {
    isError,
    error,
    isPending,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
  } = SignInViewModel();

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gray-100">
      <div className="flex flex-col sm:mx-auto sm:w-full sm:max-w-sm gap-6">
        <img
          alt="Hoalen Avocats logo"
          src="/src/assets/logo_hoalen_avocats_white.svg"
          className="mx-auto h-[120px] w-auto"
        />
        <h2 className="text-2xl leading-6 text-center font-semibold tracking-[-0.75px] text-gray-900">
          Connectez-vous à votre compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] bg-white p-12 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Adresse Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Votre email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full rounded-md border-0 py-1.5 shadow-sm ${
                  touched.email && errors.email
                    ? "ring-2 ring-red-500"
                    : "ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                } sm:text-sm`}
              />
              {touched.email && errors.email ? (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              ) : null}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Mot de passe
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Votre mot de passe"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full rounded-md border-0 py-1.5 shadow-sm ${
                  touched.password && errors.password
                    ? "ring-2 ring-red-500"
                    : "ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                } sm:text-sm`}
              />
              {touched.password && errors.password ? (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              ) : null}
              {isError && error.status === 404 ? (
                <p className="mt-1 text-sm text-red-500">
                  Email ou mot de passe incorrect
                </p>
              ) : null}
              {isError && error.status === 500 ? (
                <p className="mt-1 text-sm text-red-500">
                  Une erreur s'est produite sur le serveur, veuillez réessayer
                  et contacter le support si le problème persiste.
                </p>
              ) : null}
            </div>
          </div>

          {/* Forgot Password */}
          <div className="mt-2 flex justify-end text-sm">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Mot de passe oublié?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`flex w-full justify-center items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-sm 
                bg-indigo-600 hover:bg-indigo-500
                
            
              `}
          >
            {isPending && <ButtonSpinner />}
            <span>Connexion</span>
          </button>
        </form>
      </div>
    </div>
  );
}
