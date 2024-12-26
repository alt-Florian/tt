export const keysToDisplay = ["name", "description", "bank", "bic", "iban"];

export const responsesFaker = [
  {
    scope: 5,
    response: {
      paginate: {
        count: 50,
        skip: 5,
        take: 5,
        order: {},
      },
      statusCode: 200,
      datas: [
        {
          _id: "624fe4b31d15d2b106315ebd",
          iban: "7630 0040 3104 0001 054",
          bic: "BNPAFRPPXXX",
          bank: "BNP",
          createdAt: "2022-04-08T07:30:59.477Z",
          updatedAt: "2024-01-25T16:05:17.842Z",
          description: "Bonjour",
          name: "BNP-Amélie1",
        },
        {
          _id: "624ff6198daf81432015295a",
          iban: "7613 6060 0044 4631 6253 2709 7",
          bank: "CA ILE ET VILAINE",
          bic: "AGRIFRPP836",
          createdAt: "2022-04-08T08:45:13.917Z",
          updatedAt: "2023-02-04T05:38:50.193Z",
          description: "<p>OBO et factu'&gt;15k</p>",
          name: "Crédit Agricole",
        },
        {
          _id: "6544e5a0d8f332b76c892c8f",
          description: "test test",
          name: "test",
          bic: "FRABCDEFG",
          iban: "FR232978789797997323",
          bank: "BANQTEST",
          createdAt: "2023-11-03T12:20:48.896Z",
          updatedAt: "2023-11-03T12:20:48.896Z",
        },
        {
          _id: "6544e5f8d8f332b76c892c99",
          description: "test test",
          name: "testazo",
          bic: "FRABCDEREFG",
          iban: "FR23297834789797997323",
          bank: "BANQTEST",
          createdAt: "2023-11-03T12:22:16.988Z",
          updatedAt: "2023-11-03T12:22:16.988Z",
        },
        {
          _id: "6544e809c5a90a31ab252130",
          description: "test test",
          name: "testazo",
          bic: "FRADFDEREFG",
          iban: "FR23297834343297997323",
          bank: "BANQTEST",
          createdAt: "2023-11-03T12:31:05.858Z",
          updatedAt: "2023-11-03T12:31:05.858Z",
        },
      ],
    },
  },
  {
    scope: 6,
    response: {
      paginate: {
        count: 20,
        skip: 5,
        take: 5,
        order: {},
      },
      statusCode: 200,
      datas: [
        {
          _id: "624fe4b31d15d2b106315ebd",
          createdAt: "2022-04-08T07:30:59.477Z",
          updatedAt: "2024-01-25T16:05:17.842Z",
          type: "Bonjour",
          name: "BNP-Amélie",
        },
        {
          _id: "624fe4b31d15d2b106315ebd",
          createdAt: "2022-04-08T07:30:59.477Z",
          updatedAt: "2024-01-25T16:05:17.842Z",
          type: "Bonjour",
          name: "BNP-Amélie",
        },
        {
          _id: "624fe4b31d15d2b106315ebd",
          createdAt: "2022-04-08T07:30:59.477Z",
          updatedAt: "2024-01-25T16:05:17.842Z",
          type: "Bonjour",
          name: "BNP-Amélie",
        },
      ],
    },
  },
];
