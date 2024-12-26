import { DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FeedBackBoxInterface } from "@interfaces/boxes/FeedBackBox.interface";

export const FeedBackBox: React.FC<FeedBackBoxInterface> = ({
  icon,
  title,
  content,
  handleSubmit,
  handleClose,
  validationLabel = "Confirmer",
  cancelLabel = "Annuler",
}) => {
  return (
    <>
      <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
        <button
          type="button"
          onClick={handleClose}
          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="sr-only">Fermer</span>
          <XMarkIcon aria-hidden="true" className="size-6" />
        </button>
      </div>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
          {/* <ExclamationTriangleIcon
            aria-hidden="true"
            className="size-6 text-red-600"
          /> */}
          {icon}
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <DialogTitle
            as="h3"
            className="text-base font-semibold text-gray-900"
          >
            {title}
          </DialogTitle>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{content}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          {validationLabel}
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          {cancelLabel}
        </button>
      </div>
    </>
  );
};
