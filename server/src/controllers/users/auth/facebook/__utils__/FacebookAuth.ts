import axios, { AxiosResponse } from "axios";

interface UserInfo {
  name: string;
  email: string;
}

class FacebookAuth {
  private accessToken: string;
  userInfo?: UserInfo;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async generateUserInfo(): Promise<UserInfo> {
    try {
      const res: AxiosResponse<UserInfo> = await axios.get(
        `https://graph.facebook.com/v2.5/me?fields=name,email&access_token=${this.accessToken}`
      );

      this.userInfo = res.data;
      return this.userInfo;
    } catch (error) {
      throw new Error(
        `Something went wrong at FacbookAuth.generateUserInfo(): ${error}`
      );
    }
  }
}

export { FacebookAuth };
