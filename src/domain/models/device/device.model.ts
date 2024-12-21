// Import or assume the presence of these classes in your Node.js project
import { DeviceId } from './deviceId.model';
import { DeviceType } from './deviceType.model';
import { RefreshToken } from './refreshToken.model';
import { FCMToken } from './fcmToken.model';

class Device {
  private deviceId: DeviceId;
  private deviceType: DeviceType;
  private refreshToken?: RefreshToken;
  private fcmToken?: FCMToken;
  private lastAccessTime: Date;

  private constructor(
    deviceId: DeviceId,
    deviceType: DeviceType,
    lastAccessTime: Date,
    refreshToken?: RefreshToken,
    fcmToken?: FCMToken
  ) {
    this.deviceId = deviceId;
    this.deviceType = deviceType;
    this.lastAccessTime = lastAccessTime;
    this.refreshToken = refreshToken;
    this.fcmToken = fcmToken;
  }

  // Static factory method to create a Device instance with refresh token
  static of(aDeviceId: string, aDeviceType: string, aRefreshToken?: string): Device {
    return this.create(aDeviceId, aDeviceType, aRefreshToken);
  }

  // Static factory method to create a Device instance with all properties
  static create(
    aDeviceId: string,
    aDeviceType: string,
    aRefreshToken?: string,
    aFCMToken?: string,
    aLastAccessTime?: number
  ): Device {
    const deviceType = DeviceType.create(aDeviceType); // Assume DeviceType.create returns a DeviceType instance
    const deviceId = DeviceId.create(aDeviceId); // Assume DeviceId.create returns a DeviceId instance

    const refreshToken = aRefreshToken ? RefreshToken.create(aRefreshToken) : undefined;
    const fcmToken = aFCMToken ? FCMToken.create(aFCMToken) : undefined;
    const lastAccessTime = aLastAccessTime ? new Date(aLastAccessTime) : new Date();

    return new Device(deviceId, deviceType, lastAccessTime, refreshToken, fcmToken);
  }

  // Update the refresh token and last access time
  updateRefreshToken(newRefreshToken: string): void {
    this.refreshToken = RefreshToken.create(newRefreshToken);
    this.lastAccessTime = new Date();
  }

  // Update the FCM token and last access time
  updateFCMToken(newFCMToken: string): void {
    this.fcmToken = FCMToken.create(newFCMToken);
    this.lastAccessTime = new Date();
  }

  // Get a copy of the last access time to maintain immutability
  getLastAccessTime(): Date {
    return new Date(this.lastAccessTime.getTime());
  }


  getDeviceById(): DeviceId {
    return this.deviceId
  }
}

export default Device;
