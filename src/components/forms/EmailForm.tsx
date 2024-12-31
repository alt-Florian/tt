import { EmailFormViewModel } from "@components/forms/EmailForm.viewmodel";
import { ButtonSpinner } from "@components/ui/Spinner";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

interface EmailFormPropsInterface {
  handleClose: () => void;
  id: string;
}

export default function EmailForm({
  handleClose,
  id,
}: EmailFormPropsInterface) {
  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    isPending,
    isError,
    error,
  } = EmailFormViewModel(handleClose, id);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md border border-gray-200"
    >
      <div className="">
        <div className="border-b border-gray-200 text-gray-900/50 bg-gray-100 p-4">
          Ajouter un email
        </div>
        <div className="pb-8 px-4">
          <div className="mt-6 flex gap-8 ">
            <div className="h-full flex-1 flex flex-col justify-between gap-4">
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
                {isError && error.status === 400 ? (
                  <p className="mt-1 text-sm text-red-500">
                    Il existe déja un compte avec cet email
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs px-4 py-2">* Champs obligatoires</p>
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
          disabled={isPending}
          className="flex items-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold border rounded-md border-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isPending && <ButtonSpinner />}
          <span>Enregistrer l'e-mail</span>
        </button>
      </div>
    </form>
  );
}
