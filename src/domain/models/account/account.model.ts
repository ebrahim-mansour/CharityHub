import { UUID } from "crypto";

import FullName from "./fullName.model";
import MobileNumber from "./mobileNumber.model";
import { PermissionEnum } from "./permission.model";
import PhotoUrl from "./photoUrl.model";
import Device from "../device/device.model";
import { IJWTGenerator } from "../../interfaces/JWTGenerator.interface";
import { Tokens } from "./token.model";

export class Account {
  private id: UUID;
  private mobileNumber: MobileNumber;
  private permissions: PermissionEnum[];
  private fullName: FullName | null;
  private photoUrl: PhotoUrl | null;
  private joinedDate: Date;
  public devices: Device[];
  private blocked: boolean;

  constructor(
    id: UUID,
    mobileNumber: MobileNumber,
    devices: Device[],
    permissions: PermissionEnum[] | null,
    fullName: FullName | null,
    photoUrl: PhotoUrl | null,
    blocked: boolean,
    joinedDate: Date | null
  ) {
    this.id = id;
    this.mobileNumber = mobileNumber;
    this.devices = [...devices]; // Copy to avoid mutations
    this.permissions =
      permissions && permissions.length > 0
        ? [...permissions]
        : [PermissionEnum.VIEW]; // Default to VIEW permission
    this.fullName = fullName;
    this.photoUrl = photoUrl;
    this.blocked = blocked;
    this.joinedDate = joinedDate || new Date(); // Default to current date
  }

  // Static factory method for creating a new account
  static newAccount(
    mobileNumber: string,
    isAdmin: boolean,
    deviceType: string,
    deviceId: string
  ): Account {
    const device = Device.of(deviceId, deviceType);

    return new Account(
      crypto.randomUUID() as UUID, // Generate a unique account ID
      MobileNumber.of(mobileNumber),
      [device],
      [isAdmin ? PermissionEnum.FULL_ACCESS : PermissionEnum.VIEW],
      null,
      null,
      false,
      new Date()
    );
  }

  // Authenticate a user and generate tokens
  authenticate(
    jwtGenerator: IJWTGenerator,
    deviceId: string,
    deviceType: string
  ): Tokens {
    const usedDevice = this.getOrCreateDevice(deviceId, deviceType);

    const refreshToken = jwtGenerator.generateRefreshToken(this, usedDevice);
    usedDevice.updateRefreshToken(refreshToken);

    const accessToken = jwtGenerator.generateAccessToken(this, usedDevice);
    return new Tokens(refreshToken, accessToken);
  }

  // Private helper method to find or create a device
  private getOrCreateDevice(deviceId: string, deviceType: string): Device {
    let usedDevice = this.getDevice(deviceId);
    if (!usedDevice) {
      usedDevice = Device.of(deviceId, deviceType);
      this.devices.push(usedDevice);
    }
    return usedDevice;
  }

  // Find a device by its ID
  private getDevice(deviceId: string): Device | null {
    return this.devices.find(
      (device) => device.getDeviceById().toString() === deviceId
    ) || null;
  }

  // Getter for permissions (immutable)
  getPermissions(): PermissionEnum[] {
    return [...this.permissions];
  }

  // Getter for joined date (immutable)
  getJoinedDate(): Date {
    return new Date(this.joinedDate.getTime());
  }

  // Getter for devices (immutable)
  getDevices(): Device[] {
    return [...this.devices];
  }

  // Getter and setter methods for other properties
  getId(): UUID {
    return this.id;
  }

  getMobileNumber(): MobileNumber {
    return this.mobileNumber;
  }

  isBlocked(): boolean {
    return this.blocked;
  }

  setBlocked(blocked: boolean): void {
    this.blocked = blocked;
  }

  getFullName(): FullName | null {
    return this.fullName;
  }

  setFullName(fullName: FullName): void {
    this.fullName = fullName;
  }

  getPhotoUrl(): PhotoUrl | null {
    return this.photoUrl;
  }

  setPhotoUrl(photoUrl: PhotoUrl): void {
    this.photoUrl = photoUrl;
  }
}
