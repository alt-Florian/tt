export enum enumConjonction {
  AND,
  OR,
}

export enum enumOperator {
  CONTAIN,
  DOES_NOT_CONTAIN,
  CAN_CONTAIN,
  CANNOT_CONTAIN,
  HAS_ANY,
  HAS_ALL_OF,
  HAS_NONE_OF,
  EQ,
  NE,
  GT,
  GTE,
  LT,
  LTE,
}

export enum enumScope {
  CRM,
  LM,
  MISSIONS,
  USERS,
  INVOICES,
  CONFIG_BANK,
  CONFIG_TEMPLATE,
  CONFIG_BLOCK,
  CONFIG_NATURE,
  CONFIG_PRICES,
  CONFIG_CUSTOMER,
  CONFIG_TASKS,
}

export enum enumTypeQuery {
  NATS,
  AGGREGATE,
}
