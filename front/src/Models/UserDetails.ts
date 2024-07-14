import { UserType } from "./UserType";

export class UserDetails {
  public userId: number;
  public email: string;
  public password: string;
  public userName: string;
  private userType: UserType;

  constructor(userId: number, email: string, password: string, userType: UserType, userName: string) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.userType = userType;
    this.userName = userName;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getUserName(): string {
    return this.userName;
  }

  public setUserName(userName: string): void {
    this.userName = userName;
  }

  public getUserType(): UserType {
    return this.userType;
  }

  public setUserType(userType: UserType): void {
    this.userType = userType;
  }
}
