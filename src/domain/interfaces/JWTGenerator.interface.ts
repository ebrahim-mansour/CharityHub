import { Account } from "../models/account/account.model";
import Device from "../models/device/device.model";

export interface IJWTGenerator {
    generateAccessToken(account: Account, device: Device): string;
    generateRefreshToken(account: Account, device: Device): string;
}
