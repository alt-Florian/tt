import AddPossessionFormViewModel from "@components/forms/AddPossessionForm.viewmodel";
import Select from "@components/ui/Select";
import Toggle from "@components/ui/Toggle";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

interface AddPossessionFormProps {
  isActive: boolean;
  customerId: string;
  handleClose: () => void;
}
export default function AddPossessionForm({
  isActive,
  customerId,
  handleClose,
}: AddPossessionFormProps) {
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    setFieldValue,
    activeCategories,
    passiveCategories,
    isActiveForm,
    setIsActiveForm,
  } = AddPossessionFormViewModel({
    isActive,
    customerId,
    handleClose,
  });
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-md border border-gray-200"
    >
      <div className="space-y-4 lg:space-y-6">
        <div className=" flex justify-between border-b border-gray-200 text-gray-900/50 bg-gray-100 p-4">
          <h1>Ajouter un {isActiveForm ? "actif" : "passif"}</h1>
          <Toggle
            checked={!isActiveForm}
            onChange={() => setIsActiveForm(!isActiveForm)}
          />
        </div>
        <div className="flex flex-col gap-6 mt-10 pb-12 px-4">
          <div className="flex-1 min-w-[240px] flex flex-col justify-between">
            <label
              htmlFor="name"
              className="block text-sm/6 mt-2 font-medium text-gray-900"
            >
              Nom {isActiveForm ? "de l'actif" : "du passif"} *
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="name"
                name="name"
                type="text"
                aria-invalid="true"
                aria-describedby="name-error"
                className="block w-full rounded-md border-gray-300 py-1.5 pr-4 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={handleChange}
                value={values.name}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.name && errors.name ? (
                  <p id="name-error" className="text-sm text-red-600">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.name && errors.name ? (
              <p id="name-error" className="mt-2 text-sm text-red-600">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="flex-1 min-w-[240px]">
            <div className="relative mt-2 rounded-md shadow-sm">
              <Select
                list={isActiveForm ? activeCategories : passiveCategories}
                label={"Catégorie *"}
                value={values.category}
                onChange={(e) => setFieldValue("category", e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.category && errors.category ? (
                  <p id="category-error" className="mt-2 text-sm text-red-600">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.category && errors.category ? (
              <p id="category-error" className="mt-2 text-sm text-red-600">
                {errors.category}
              </p>
            ) : null}
          </div>
          <div className="flex-1 min-w-[240px] flex flex-col justify-between">
            <label
              htmlFor="value"
              className="block text-sm/6 mt-2 font-medium text-gray-900"
            >
              Valeur *
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                id="value"
                name="value"
                type="text"
                aria-invalid="true"
                aria-describedby="name-error"
                className="block w-full rounded-md border-gray-300 py-1.5 pr-4 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={handleChange}
                value={values.value}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.value && errors.value ? (
                  <p id="value-error" className="text-sm text-red-600">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500"
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.value && errors.value ? (
              <p id="value-error" className="mt-2 text-sm text-red-600">
                {errors.value}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-6 px-4 pb-4">
        <button
          type="button"
          className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md shadow-sm border-gray-300 hover:bg-gray-100 mr-4"
          onClick={handleClose}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="bg-indigo-600 px-3 py-2 text-sm font-semibold border rounded-md border-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}
