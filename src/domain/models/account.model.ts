import { UUID } from "crypto";

import FullName from "./fullName.model";
import MobileNumber from "./mobileNumber.model";
import { PermissionEnum } from "./permission.model";
import PhotoUrl from "./photoUrl.model";

export class Account {
  private id: UUID;
  private mobileNumber: MobileNumber;
  private permissions: PermissionEnum[];
  private fullName: FullName;
  private photoUrl: PhotoUrl;
  private joinedDate: Date;
  // public devices: Device[];
  private blocked: boolean;
}
