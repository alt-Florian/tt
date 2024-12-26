import { UserAddViewModel } from "@components/forms/examples/UserAdd.viewmodel";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useDrawerBoxStore } from "@stores/Drawerbox.store";
export default function UserAddForm() {
  const { handleSubmit, handleChange, errors, touched, values } =
    UserAddViewModel();
  const { hideDrawerBox } = useDrawerBoxStore();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <p className="mt-1 text-sm/6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 col-span-full ">
              <div className="col-span-full">
                <label
                  htmlFor="firstname"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Firstname
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="firstname"
                    name="firstname"
                    placeholder="Jhon"
                    type="text"
                    aria-invalid="true"
                    aria-describedby="firstname-error"
                    className="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm/6"
                    onChange={handleChange}
                    value={values.firstname}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {touched.firstname && errors.firstname ? (
                      <p
                        id="firstname-error"
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

                {touched.firstname && errors.firstname ? (
                  <p id="firstname-error" className="mt-2 text-sm text-red-600">
                    {errors.firstname}
                  </p>
                ) : null}
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="you@example.com"
                    aria-invalid="true"
                    aria-describedby="email-error"
                    className="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm/66"
                    onChange={handleChange}
                    value={values.email}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {touched.email && errors.email ? (
                      <p id="email-error" className="mt-2 text-sm text-red-600">
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
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="address"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Address
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="7 rue de address"
                    aria-invalid="true"
                    aria-describedby="address-error"
                    className="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm/6"
                    onChange={handleChange}
                    value={values.address}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {touched.address && errors.address ? (
                      <p
                        id="address-error"
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
                {touched.address && errors.address ? (
                  <p id="address-error" className="mt-2 text-sm text-red-600">
                    {errors.address}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
            onClick={hideDrawerBox}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
