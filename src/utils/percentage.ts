import { Shareholder } from "@interfaces/customer/CustomerResponses.interface";

function calculateTotal(shareholders: Shareholder[]): number {
  // Calcul de la somme de toutes les parts détenues par tous les associés
  return shareholders.reduce((total, shareholder) => {
    return (
      total + shareholder.shares.reduce((sum, share) => sum + share.owned, 0)
    );
  }, 0);
}

function calculateGlobalPercentageForShareholder(
  shareholder: Shareholder,
  total: number
): string {
  // Filtrage des actions qui ne sont pas des usufruits
  const filteredShares = shareholder.shares.filter(
    (share) => share.category !== 30
  );

  // Calcul du total des parts d'un associé
  const shareholderTotal = filteredShares.reduce(
    (sum, share) => sum + share.owned,
    0
  );
  // Calcul du pourcentage par associé
  return total > 0 ? ((shareholderTotal / total) * 100).toFixed(2) + "%" : "-";
}

export function getPercentage(
  shareholders: Shareholder[],
  shareholder: Shareholder
) {
  return calculateGlobalPercentageForShareholder(
    shareholder,
    calculateTotal(shareholders)
  );
}
