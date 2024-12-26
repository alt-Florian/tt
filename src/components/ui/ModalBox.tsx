import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { FeedBackBox } from "@components/feedBack/FeedBackBox";
import { ModalBoxInterface } from "@interfaces/boxes/ModalBox.interface";
import { feedBackService } from "@services/FeedBack.service";
import { useModalBoxStore } from "@stores/modalbox.store";


export const ModalBox: React.FC<ModalBoxInterface> = ({
  open,
  content,
  handleCloseModal = () => {},
}) => {
  return (
    <Dialog open={open} onClose={handleCloseModal} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform w-auto overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            {content}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export const ModalBoxLayout: React.FC = () => {
  const { modalBox, hideModalBox } = useModalBoxStore();
  return (
    <>
      {modalBox && (
        <ModalBox
          {...modalBox}
          handleCloseModal={() => {
            hideModalBox();
          }}
        />
      )}
    </>
  );
};

export const ModalBoxShow: React.FC = () => {
  const { hideModalBox, showModalBox } = useModalBoxStore();

  const openModalBox = () => {
    showModalBox({
      content: (
        <FeedBackBox
          {...feedBackService.updateConfirmation()}
          handleClose={hideModalBox}
          handleSubmit={hideModalBox}
        />
      ),
      handleCloseModal: hideModalBox,
    });
  };

  return (
    <>
      <button
        onClick={openModalBox}
        className=" mx-3 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
      >
        Mon bouton pour la modal
      </button>
    </>
  );
};
