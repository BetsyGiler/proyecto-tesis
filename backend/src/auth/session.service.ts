import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Session } from "./entities/session.entity";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { TokenExpiredError } from "jsonwebtoken";
import { AccessTokenPayload } from "./payloads/at.payload";

import { v4 as uuidv4 } from 'uuid';
import environment from "src/config/env.config";

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly jwtService: JwtService
  ) { }

  /**
   * It'll create & store a determined refresh token into user session
   *
   * @return {string} session ID
   */
  async createRefreshToken(rtId: string | null, user: User, deviceFingerprint: string): Promise<string> {

    const payload: RefreshTokenPayload = {
      userId: user.id,
    }

    // generating & signing our refresh token
    const refreshToken = this.jwtService.sign(
      payload,
      {
        expiresIn: environment.jwtRefreshExpirationTime,
        secret: environment.refreshTokenSecret,
      },
    );

    // creating the session object
    const session = this.sessionRepository.create({
      userId: user.id,
      refreshToken,
    });

    const createdSession = await this.sessionRepository.save(session);

    return createdSession.id;
  }

  /**
   * It will update the current refresh token & letting useless the 
   * previous RTs & ATs
   *
   * @param {string} rtId - refresh token ID
   * @param {string} userId - user ID
   */
  async updateRefreshToken(rtId: string, userId: string): Promise<void> {

    const payload: RefreshTokenPayload = {
      userId,
    }

    // generating & signing our refresh token
    const refreshToken = this.jwtService.sign(
      payload,
      {
        expiresIn: environment.jwtRefreshExpirationTime,
        secret: environment.refreshTokenSecret,
      },
    );

    // updating the current refresh token
    await this.sessionRepository.update(rtId, {
      refreshToken,
    });
  }

  /**
   * It'll create & store a determined access token linked to a RT.
   * TODO: revoke old access tokens
   *
   * @param {string} rtId - refresh token ID
   * @param {string} userId - user ID
   *
   * @return {string} access token
   */
  async createAccessToken(rtId: string, userId: string): Promise<string> {

    const payload: AccessTokenPayload = {
      rtId,
      userId
    }

    const accessToken = this.jwtService.sign(
      payload,
      {
        expiresIn: environment.jwtExpirationTime,
        secret: environment.accessTokenSecret,
      },
    );

    return accessToken;
  }

  /**
   * Checks if a refresh token is still present on the DB and if it's valid
   *
   * @param {string} refreshToken
   * @param {Session} session - pass it if you want to update an existing session
   *
   * @return {boolean} true if the refresh token is still valid
   */
  async checkRefreshToken(refreshToken: string, { session }: { session: Session | null }): Promise<boolean> {

    const auxSession = session || await this.sessionRepository.findOne({
      where: {
        refreshToken,
      },
    });

    // if the session doesn't exist it mean the RT is corrupt
    if (!auxSession) {
      throw new UnprocessableEntityException('Invalid refresh token');
    }

    const decodedToken: RefreshTokenPayload | null = this.jwtService.verify(refreshToken, {
      secret: environment.refreshTokenSecret,
      ignoreExpiration: true,
    });


    // checking if it's valid
    if (!decodedToken) {
      throw new UnprocessableEntityException('Invalid refresh token');
    }

    if (decodedToken.userId !== auxSession.userId) {
      throw new UnprocessableEntityException('Invalid refresh token');
    }

    // checking expiration time
    const isExpired = decodedToken.exp * 1000 < Date.now();

    // if expired then remove it from DB
    if (isExpired) {
      // NOTE: it's okay to keep it async to save resources
      this.sessionRepository.delete(session.id);

      // letting the client know it's expired
      throw new TokenExpiredError("Su sesión ha expirado", new Date(decodedToken.exp! * 1000));
    }

    return !isExpired;
  }

  /**
  * Whereas the access token is valid depends on the response, if it's a string 
  * then it's the access token, othersise it means the access token is not valid 
  * and it cannot be updated
  *
  * @param {string} accessToken
  *
  * @return {string | null} Returns the access token or null if it's invalid or 
  * cannot be renueved
  */
  async checkAccessToken(accessToken: string): Promise<string | null> {
    const decodedToken: AccessTokenPayload | null = this.jwtService.verify(accessToken, {
      secret: environment.accessTokenSecret,
      ignoreExpiration: true,
    });

    // first security layer: checking integrity
    if (!decodedToken) {
      throw new UnprocessableEntityException('Invalid access token');
    }

    // next security layer: checking correspondence
    const { userId, rtId } = decodedToken;

    const session: Session | null = await this.sessionRepository.findOne({
      where: { userId, id: rtId },
    });

    if (!session) {
      throw new UnprocessableEntityException('Invalid access token');
    }

    // next security layer: checking expiration time
    const isExpired = (decodedToken.exp * 1000) < Date.now();
    console.log("Token expired")

    // if AT is expired then try to search for the refreshToken to determine if 
    // it's possible to update it or not
    if (isExpired) {
      // checking integrity of the refresh token
      const isRtValid = await this.checkRefreshToken(session.refreshToken, { session });

      if (!isRtValid) {
        throw new TokenExpiredError("Su sesión ha expirado", new Date(decodedToken.exp * 1000));
      }
      // updating the refresh token
      await this.updateRefreshToken(rtId, userId);
      return await this.createAccessToken(rtId, userId);
    }

    // if the token is still valid the just return it
    return accessToken;
  }

  /**
  * It'll decode the access token returning its payload for different purposes
  *
  * @param {string} accessToken
  */
  async decodeAccessToken(accessToken: string): Promise<AccessTokenPayload> {
    return this.jwtService.verify(accessToken, {
      secret: environment.accessTokenSecret,
    });
  }

  /**
   * This method will revoke all the sessions for a determined [deviceFingerprint]
   * and [userId]
   */
  async revokeSessionsByFingerprint(userId: string): Promise<void> {
    await this.sessionRepository.delete({
      userId
    });
  }
}
