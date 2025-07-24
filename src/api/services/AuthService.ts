/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthLoginRequest } from '../models/AuthLoginRequest';
import type { AuthStoreRequest } from '../models/AuthStoreRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @param requestBody
     * @returns any Ok
     * @throws ApiError
     */
    public static login(
        requestBody: AuthLoginRequest,
    ): CancelablePromise<> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any Ok
     * @throws ApiError
     */
    public static signup(
        requestBody: AuthStoreRequest,
    ): CancelablePromise<> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any Ok
     * @throws ApiError
     */
    public static refresh(): CancelablePromise<> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/refresh',
        });
    }
}
