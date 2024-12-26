import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { FeedBackBoxInterface } from "@interfaces/boxes/FeedBackBox.interface";

class FeedBackService {
  public deleteConfirmation(): FeedBackBoxInterface {
    return {
      title: "Confirmer la suppression",
      content: "Voulez-vous supprimer définitivement cet élément ?",
      icon: (
        <ExclamationTriangleIcon
          aria-hidden="true"
          className="size-6 text-red-600"
        />
      ),
      validationLabel: "Supprimer",
    };
  }

  public updateConfirmation(): FeedBackBoxInterface {
    return {
      title: "Confirmer la modification",
      content: "Voulez-vous modifier définitivement cet élément ?",
      icon: <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />,
      validationLabel: "Modifier",
    };
  }
}

export const feedBackService = new FeedBackService();
