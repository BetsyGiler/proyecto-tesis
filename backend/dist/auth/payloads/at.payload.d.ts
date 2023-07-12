export interface AccessTokenPayload {
    rtId: string;
    userId: string;
    exp?: number | undefined;
}
