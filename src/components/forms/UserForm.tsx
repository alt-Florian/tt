import { UserFormViewModel } from "@components/forms/UserForm.viewmodel";
import Select from "@components/ui/Select";
import { ButtonSpinner, SmallSpinner } from "@components/ui/Spinner";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Globals from "@utils/Globals";

interface UserFormPropsInterface {
  handleClose: () => void;
  id?: number;
}

export default function UserForm({ handleClose, id }: UserFormPropsInterface) {
  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    setFieldValue,
    status,
    isUpdate,
    errorOnMutation,
    isErrorOnMutation,
    isPendingOnMutation,
    isPending,
    isError,
  } = UserFormViewModel(handleClose, id);

  if (isPending) return <SmallSpinner />;
  if (isError)
    return <p>Une erreur s'est produite lors du chargement des données</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md border border-gray-200"
    >
      <div className="">
        <div className="border-b border-gray-200 text-gray-900/50 bg-gray-100 p-4">
          {id ? "Modifier l'utilisateur" : "Ajouter un nouvel utilisateur"}
        </div>
        <div className="pb-8 px-4">
          <div className="mt-6 flex gap-8 ">
            <div className="h-full flex-1 flex flex-col justify-between gap-4">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Prénom *
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    aria-invalid="true"
                    aria-describedby="firstname-error"
                    className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                    onChange={handleChange}
                    value={values.firstname}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {touched.firstname && errors.firstname ? (
                      <p id="firstname-error" className="text-sm text-red-600">
                        <ExclamationCircleIcon
                          aria-hidden="true"
                          className="size-5 text-red-500"
                        />
                      </p>
                    ) : null}
                  </div>
                </div>
                {touched.firstname && errors.firstname ? (
                  <p id="firstname-error" className="mt-2 text-sm text-red-600">
                    {errors.firstname}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Nom *
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    aria-invalid="true"
                    aria-describedby="lastname-error"
                    className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                    onChange={handleChange}
                    value={values.lastname}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {touched.lastname && errors.lastname ? (
                      <p id="lastname-error" className="text-sm text-red-600">
                        <ExclamationCircleIcon
                          aria-hidden="true"
                          className="size-5 text-red-500"
                        />
                      </p>
                    ) : null}
                  </div>
                </div>
                {touched.lastname && errors.lastname ? (
                  <p id="lastname-error" className="mt-2 text-sm text-red-600">
                    {errors.lastname}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email *
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    aria-invalid="true"
                    aria-describedby="email-error"
                    className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                    onChange={handleChange}
                    value={values.email}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {touched.email && errors.email ? (
                      <p id="email-error" className="text-sm text-red-600">
                        <ExclamationCircleIcon
                          aria-hidden="true"
                          className="size-5 text-red-500"
                        />
                      </p>
                    ) : null}
                  </div>
                </div>
                {touched.email && errors.email ? (
                  <p id="email-error" className="mt-2 text-sm text-red-600">
                    {errors.email}
                  </p>
                ) : null}
                {isErrorOnMutation && errorOnMutation.status === 409 ? (
                  <p className="mt-1 text-sm text-red-500">
                    Il existe déja un compte avec cet email
                  </p>
                ) : null}
              </div>
              <div className="flex-1 min-w-[240px]">
                <div className="relative rounded-md shadow-sm">
                  <Select
                    list={Globals.roles}
                    label={"Rôle *"}
                    value={values.role}
                    onChange={(e) => setFieldValue("role", e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {touched.role && errors.role ? (
                      <p id="role-error" className="mt-2 text-sm text-red-600">
                        <ExclamationCircleIcon
                          aria-hidden="true"
                          className="size-5 text-red-500"
                        />
                      </p>
                    ) : null}
                  </div>
                </div>
                {touched.role && errors.role ? (
                  <p id="role-error" className="mt-2 text-sm text-red-600">
                    {errors.role}
                  </p>
                ) : null}
              </div>
              <div className="flex-1 min-w-[240px]">
                <div className="relative rounded-md shadow-sm">
                  <Select
                    list={status}
                    label={"Status *"}
                    value={values.isActive}
                    onChange={(e) => setFieldValue("isActive", e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {touched.isActive && errors.isActive ? (
                      <p
                        id="isActive-error"
                        className="mt-2 text-sm text-red-600"
                      >
                        <ExclamationCircleIcon
                          aria-hidden="true"
                          className="size-5 text-red-500"
                        />
                      </p>
                    ) : null}
                  </div>
                </div>
                {touched.isActive && errors.isActive ? (
                  <p id="isActive-error" className="mt-2 text-sm text-red-600">
                    {errors.isActive}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {isUpdate
                    ? "Changer le mot de passe de l'utilisateur"
                    : " Mot de passe *"}
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type="text"
                    aria-invalid="true"
                    aria-describedby="password-error"
                    className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                    onChange={handleChange}
                    value={values.password}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {touched.password && errors.password ? (
                      <p id="password-error" className="text-sm text-red-600">
                        <ExclamationCircleIcon
                          aria-hidden="true"
                          className="size-5 text-red-500"
                        />
                      </p>
                    ) : null}
                  </div>
                </div>
                {touched.password && errors.password ? (
                  <p id="password-error" className="mt-2 text-sm text-red-600">
                    {errors.password}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs py-2">* Champs obligatoires</p>
      <div className="flex items-center justify-between gap-x-6 p-4">
        <button
          type="button"
          className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 hover:bg-gray-50 mr-4"
          onClick={handleClose}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isPendingOnMutation}
          className="flex items-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold border rounded-md border-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isPendingOnMutation && <ButtonSpinner />}
          <span>
            {id ? "Enregistrer les modifications" : "Ajouter l'utilisateur"}
          </span>
        </button>
      </div>
    </form>
  );
}
