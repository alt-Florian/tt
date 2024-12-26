import Form from "@components/forms/examples/Form";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDrawerBoxStore } from "@stores/Drawerbox.store";
import { ReactElement } from "react";

export interface DrawerBox {
  open?: boolean;
  onClick?: () => void;
  content?: ReactElement;
  size?: "sm" | "md" | "2xl";
  title?: string;
}

interface DrawerBoxProps extends DrawerBox {}

export const DrawerBox: React.FC<DrawerBoxProps> = ({
  open,
  content,
  onClick = () => {},
  size = "md",
  title,
}) => {
  //const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onClose={onClick} className="relative z-10">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className={`pointer-events-auto w-screen max-w-${size} transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700`}
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold text-gray-900">
                      {title}
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={onClick}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {content}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export const DrawerBoxLayout: React.FC = () => {
  const { drawerBox, hideDrawerBox } = useDrawerBoxStore();
  return (
    <>
      {drawerBox && (
        <DrawerBox
          {...drawerBox}
          onClick={() => {
            hideDrawerBox();
          }}
        />
      )}
    </>
  );
};

export const DrawerBoxShow: React.FC = () => {
  const { hideDrawerBox, showDrawerBox } = useDrawerBoxStore();

  const openDrawerBox = () => {
    showDrawerBox({
      content: <Form />,
      onClick: hideDrawerBox,
      title: "Drawer test",
    });
  };

  return (
    <>
      <button
        onClick={openDrawerBox}
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
      >
        Mon bouton pour le Drawer
      </button>
    </>
  );
};
