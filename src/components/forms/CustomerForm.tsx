import { CustomerFormViewModel } from "@components/forms/CustomerForm.viewmodel";
import RadioInput from "@components/ui/RadioInput";
import Select from "@components/ui/Select";
import SelectWithSearch from "@components/ui/SelectWithSearch";
import { ButtonSpinner, SmallSpinner } from "@components/ui/Spinner";
import {
  BuildingOfficeIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useModalBoxStore } from "@stores/modalbox.store";

export interface CustomerAddFormProps {
  isCustomer: boolean;
  handleClose: () => void;
}

export default function CustomerAddForm({
  isCustomer,
  handleClose,
}: CustomerAddFormProps) {
  const {
    formik,
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    setFieldValue,
    setIsPhysical,
    setIsPappers,
    isContact,
    isPhysical,
    isCorporate,
    isPappers,
    customersList,
    civilities,
    rSocials,
    isPendingOnPhysicalCustomer,
    isErrorOnPhysicalCustomer,
    errorOnPhysicalCustomer,
    isPendingOnPhysicalContact,
    isErrorOnPhysicalContact,
    errorOnPhysicalContact,
    isPendingOnCorporateCustomer,
    isErrorOnCorporateCustomer,
    errorOnCorporateCustomer,
    isPendingOnCorporateContact,
    isErrorOnCorporateContact,
    errorOnCorporateContact,
    isPendingOnCorporateCustomerWithPappers,
    isErrorOnCorporateCustomerWithPappers,
    errorOnCorporateCustomerWithPappers,
    isPendingOnCorporateContactWithPappers,
    isErrorOnCorporateContactWithPappers,
    errorOnCorporateContactWithPappers,
    isPendingCustomersForSelect,
    isErrorCustomersForSelect,
  } = CustomerFormViewModel({
    isCustomer,
    handleClose,
  });

  const isPendingCreation =
    isPendingOnPhysicalCustomer ||
    isPendingOnPhysicalContact ||
    isPendingOnCorporateCustomer ||
    isPendingOnCorporateContact ||
    isPendingOnCorporateCustomerWithPappers ||
    isPendingOnCorporateContactWithPappers;

  if (isPendingCustomersForSelect) return <SmallSpinner />;
  if (isErrorCustomersForSelect)
    return <p>Une erreur s'est produite lors du chargement des données</p>;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-md ">
      <div className="flex justify-between border-b border-gray-200 text-gray-900 font-semibold p-4 mb-6">
        <h1>Ajouter un {isContact ? "contact" : "client"}</h1>{" "}
        <XMarkIcon className="size-5 cursor-pointer" onClick={handleClose} />
      </div>
      <nav className="flex w-full mb-4 border border-gray-900">
        <button
          type="button"
          onClick={() => {
            setIsPhysical(true);
            formik.setErrors({});
          }}
          className={`flex-1 flex gap-2 items-center border-r text-base/tight px-4 py-1 ${
            isPhysical &&
            "bg-gray-900 border-gray-900 text-white cursor-default"
          } ${isCorporate && "hover:bg-gray-100"}`}
        >
          <UserCircleIcon className="size-6" />
          Personne physique
        </button>
        <button
          type="button"
          onClick={() => {
            setIsPhysical(false);
            formik.setErrors({});
          }}
          className={`flex-1 flex gap-2 items-center border-r text-base/tight px-4 py-1 ${
            isCorporate &&
            "bg-gray-900 border-gray-900 text-white cursor-default"
          } ${isPhysical && "hover:bg-gray-100"}`}
        >
          <BuildingOfficeIcon className="size-6" /> Personne morale
        </button>
      </nav>
      {isPhysical && (
        <div className="flex flex-col gap-4">
          <RadioInput
            title="Civilité *"
            options={civilities}
            className="pb-2"
          />
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Nom *
            </label>
            <div className="relative mt-4 rounded-md shadow-sm">
              <input
                id="name"
                name="name"
                type="text"
                aria-invalid="true"
                aria-describedby="name-error"
                className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={handleChange}
                value={values.name}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.name && errors.name ? (
                  <p id="name-error" className="text-sm text-red-600 ">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500 "
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
          {/* Firstname Field */}
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Prénom *
            </label>
            <div className="relative mt-4 rounded-md shadow-sm">
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
                  <p id="firstname-error" className="text-sm text-red-600 ">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500 "
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
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Adresse e-mail {isCustomer ? "*" : ""}
            </label>
            <p className="text-xs font-normal text-gray-900/70">
              Au format : adresse@email.com{" "}
            </p>
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
                  <p id="email-error" className="text-sm text-red-600 ">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500 "
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
            {(isErrorOnPhysicalCustomer || isErrorOnPhysicalContact) &&
            (errorOnPhysicalCustomer.status === 409 ||
              errorOnPhysicalContact.status === 409) ? (
              <p className="mt-1 text-sm text-red-500">
                Cet email est déjà utilisé
              </p>
            ) : null}
          </div>
          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone1"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Numéro de téléphone
            </label>
            <p className="text-xs font-normal text-gray-900/70">
              Au format : 01 22 33 44 55{" "}
            </p>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="phone1"
                name="phone1"
                type="text"
                aria-invalid="true"
                aria-describedby="name-error"
                className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={handleChange}
                value={values.phone1}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.phone1 && errors.phone1 ? (
                  <p id="phone1-error" className="text-sm text-red-600 ">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500 "
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.phone1 && errors.phone1 ? (
              <p id="phone1-error" className="mt-2 text-sm text-red-600">
                {errors.phone1}
              </p>
            ) : null}
          </div>
        </div>
      )}
      {isCorporate && !isPappers && (
        <div className="flex flex-col gap-4">
          {/* Legal Form Field */}
          <Select
            list={rSocials}
            label="Raison sociale *"
            value={values.rSocial}
            onChange={(e) => setFieldValue("rSocial", e.target.value)}
          />
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-semibold text-gray-900"
            >
              Nom *
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="name"
                name="name"
                type="text"
                aria-invalid="true"
                aria-describedby="name-error"
                className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={handleChange}
                value={values.name}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.name && errors.name ? (
                  <p id="name-error" className="text-sm text-red-600 ">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500 "
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
          {/* SIREN Field */}
          <div>
            <label
              htmlFor="siren"
              className="block text-sm/6 font-medium text-gray-900"
            >
              SIREN *
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="siren"
                name="siren"
                type="text"
                aria-invalid="true"
                aria-describedby="siren-error"
                className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={handleChange}
                value={values.siren}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.siren && errors.siren ? (
                  <p id="siren-error" className="text-sm text-red-600 ">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500 "
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.siren && errors.siren ? (
              <p id="siren-error" className="mt-2 text-sm text-red-600">
                {errors.siren}
              </p>
            ) : null}
            {(isErrorOnCorporateCustomer &&
              errorOnCorporateCustomer.status === 403) ||
            (isErrorOnCorporateContact &&
              errorOnCorporateContact.status === 403) ? (
              <p className="mt-2 text-sm text-red-600">
                Ce SIREN est déjà utilisé
              </p>
            ) : null}
          </div>
          {/* RefId Field */}
          <label className="text-sm font-semibold mb-[-8px]">{`Personne de référence ${
            isCustomer ? "*" : ""
          }`}</label>
          <SelectWithSearch
            list={
              isCustomer
                ? customersList
                    .map((customer) => ({
                      id: customer.id.toString(),
                      name: customer.name,
                    }))
                    .filter((_, index) => index !== 0)
                : customersList.map((customer) => ({
                    id: customer.id.toString(),
                    name: customer.name,
                  }))
            }
            value={values.refId}
            onChange={(value) => {
              setFieldValue("refId", value);
            }}
          />
          <button
            type="button"
            className="text-sm py-2.5 underline self-center"
            onClick={() => setIsPappers(true)}
          >
            Ajouter via Pappers
          </button>
        </div>
      )}
      {isCorporate && isPappers && (
        <div className="flex flex-col gap-4">
          {/* SIREN with Pappers Field */}
          <div>
            <label
              htmlFor="siren"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Ajout par SIREN depuis Pappers *
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                id="siren"
                name="siren"
                type="text"
                aria-invalid="true"
                aria-describedby="siren-error"
                className="block w-full rounded-md border-gray-300 py-1.5 pr-10 text-gray-900 focus:ring-2 focus:ring-inset sm:text-sm/6"
                onChange={handleChange}
                value={values.siren}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                {touched.siren && errors.siren ? (
                  <p id="siren-error" className="text-sm text-red-600 ">
                    <ExclamationCircleIcon
                      aria-hidden="true"
                      className="size-5 text-red-500 "
                    />
                  </p>
                ) : null}
              </div>
            </div>
            {touched.siren && errors.siren ? (
              <p id="siren-error" className="mt-2 text-sm text-red-600">
                {errors.siren}
              </p>
            ) : null}
            {(isErrorOnCorporateCustomerWithPappers &&
              errorOnCorporateCustomerWithPappers.status === 404) ||
            (isErrorOnCorporateContactWithPappers &&
              errorOnCorporateContactWithPappers.status === 404) ? (
              <p className="mt-2 text-sm text-red-600">
                Ce SIREN n'a pas été trouvé dans Pappers.
              </p>
            ) : null}
            {(isErrorOnCorporateCustomerWithPappers &&
              errorOnCorporateCustomerWithPappers.status === 403) ||
            (isErrorOnCorporateContactWithPappers &&
              errorOnCorporateContactWithPappers.status === 403) ? (
              <p className="mt-2 text-sm text-red-600">
                Ce SIREN est déjà utilisé
              </p>
            ) : null}
          </div>
          {/* RefId Field */}
          <label className="text-sm font-semibold mb-[-8px]">{`Personne de référence ${
            isCustomer ? "*" : ""
          }`}</label>
          <SelectWithSearch
            list={
              isCustomer
                ? customersList
                    .map((customer) => ({
                      id: customer.id.toString(),
                      name: customer.name,
                    }))
                    .filter((_, index) => index !== 0)
                : customersList.map((customer) => ({
                    id: customer.id.toString(),
                    name: customer.name,
                  }))
            }
            value={values.refId}
            onChange={(value) => {
              setFieldValue("refId", value);
            }}
          />
          <button
            type="button"
            className="text-sm py-2.5 underline self-center"
            onClick={() => setIsPappers(false)}
          >
            Ajouter via saisie manuelle
          </button>
        </div>
      )}

      <p className="text-xs py-4">* Champs obligatoires</p>
      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm font-semibold text-gray-900 px-3 py-2 border rounded-md border-gray-300 hover:bg-gray-50 mr-4 shadow-sm"
          onClick={handleClose}
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isPendingCreation}
          className="flex items-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold border rounded-md border-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isPendingCreation && <ButtonSpinner />}
          <span>Enregistrer</span>
        </button>
      </div>
    </form>
  );
}

export const CustomerFormShow: React.FC = () => {
  const { hideModalBox, showModalBox } = useModalBoxStore();

  const openModalBox = () => {
    showModalBox({
      content: <CustomerAddForm isCustomer={true} handleClose={hideModalBox} />,
      handleCloseModal: hideModalBox,
    });
  };

  return (
    <>
      <button
        onClick={openModalBox}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white mr-4"
      >
        CustomerAddForm
      </button>
    </>
  );
};
export const ContactFormShow: React.FC = () => {
  const { hideModalBox, showModalBox } = useModalBoxStore();

  const openModalBox = () => {
    showModalBox({
      content: (
        <CustomerAddForm isCustomer={false} handleClose={hideModalBox} />
      ),
      handleCloseModal: hideModalBox,
    });
  };

  return (
    <>
      <button
        onClick={openModalBox}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white mr-4"
      >
        ContactAddForm
      </button>
    </>
  );
};
