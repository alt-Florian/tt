import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { DialogBoxInterface } from "@interfaces/boxes/DialogBox.interface";

class DialogService {
  public successMessage(): DialogBoxInterface {
    return {
      title: "Succès",
      content: "L'opération a bien été effectuée.",
      icon: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
    };
  }

  public errorMessage(): DialogBoxInterface {
    return {
      title: "Erreur",
      content: "Une erreur s'est produite.",
      icon: <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />,
    };
  }
}

export const dialogService = new DialogService();
