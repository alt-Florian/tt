import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { DialogBoxInterface } from "@interfaces/boxes/DialogBox.interface";
import { dialogService } from "@services/Dialog.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";

export const DialogBox: React.FC<DialogBoxInterface> = ({
  title,
  content,
  icon,
  onClick,
  show,
}) => {
  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition show={show}>
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
              <div className="p-4">
                <div className="flex items-start">
                  <div aria-hidden="true" className={`shrink-0 `}>
                    {icon}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      {title} !
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{content}</p>
                  </div>
                  <div className="ml-4 flex shrink-0">
                    <button
                      type="button"
                      onClick={onClick}
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <XMarkIcon aria-hidden="true" className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

export const DialogBoxLayout: React.FC = () => {
  //const { dialogBox, hideDialogBox } = useContext(DialogBoxContext);
  const { dialogBox, hideDialogBox } = useDialogBoxStore();

  return (
    <>
      {dialogBox && (
        <DialogBox
          {...dialogBox}
          onClick={() => {
            hideDialogBox();
          }}
        />
      )}
    </>
  );
};

export const DialogBoxShow: React.FC = () => {
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  const openDialogBox = (): void => {
    showDialogBox({
      ...dialogService.errorMessage(),
      onClick: hideDialogBox,
    });
  };

  return (
    <>
      <button
        onClick={openDialogBox}
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
      >
        Mon bouton pour la boite de dialogue
      </button>
    </>
  );
};