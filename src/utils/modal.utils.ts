export default class ModalUtil {
  addModal = false;

  open = () => {
    this.addModal = true;
  };
  close = () => {
    this.addModal = false;
  };

  get = () => {
    return this.addModal;
  };
}
