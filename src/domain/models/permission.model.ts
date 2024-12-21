enum PermissionEnum {
  FULL_ACCESS = "FULL_ACCESS",
  VIEW = "VIEW",
  CREATE_CASES = "CREATE_CASES",
}

function fromString(permission: string): PermissionEnum {
  if (!(permission in PermissionEnum)) {
    throw new Error(`Invalid permission: ${permission}`);
  }
  return PermissionEnum[permission as keyof typeof PermissionEnum];
}

function of(isAdmin: boolean): PermissionEnum {
  return isAdmin ? PermissionEnum.FULL_ACCESS : PermissionEnum.VIEW;
}

export { fromString, of, PermissionEnum };
