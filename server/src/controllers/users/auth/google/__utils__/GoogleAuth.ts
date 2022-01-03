import { OAuth2Client, TokenPayload } from "google-auth-library";

class GoogleAuth {
  private client = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);
  userInfo?: TokenPayload;
  idToken: string;

  constructor(idToken: string) {
    this.idToken = idToken;
  }

  public async generateUserInfo(): Promise<TokenPayload | undefined> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: this.idToken,
        audience: process.env.GOOGLE_WEB_CLIENT_ID,
      });

      this.userInfo = ticket.getPayload();
      return this.userInfo;
    } catch (error) {
      throw new Error(
        `Something went wrong at GoogleAuth.generateUserInfo(): ${error}`
      );
    }
  }
}

export { GoogleAuth };
