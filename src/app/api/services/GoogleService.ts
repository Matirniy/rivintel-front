/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GoogleService {
    /**
     * @param searchText
     * @param lat
     * @param lng
     * @param isEmptyWebsite
     * @param isEmptySocialWebsite
     * @param radius
     * @param sort Sort method (only one allowed)
     * @param fields
     * @returns any
     * @throws ApiError
     */
    public static placeList(
        searchText: string,
        lat: string,
        lng: string,
        isEmptyWebsite?: boolean,
        isEmptySocialWebsite?: boolean,
        radius?: number,
        sort?: 'rating' | 'rating count' | 'display name',
        fields?: Array<'places.id' | 'places.displayName' | 'places.formattedAddress' | 'places.googleMapsUri' | 'places.internationalPhoneNumber' | 'places.websiteUri' | 'places.rating' | 'places.userRatingCount' | 'places.businessStatus' | 'places.location' | 'places.viewport' | 'places.plusCode' | 'places.types' | 'places.addressComponents' | 'places.regularOpeningHours' | 'places.currentOpeningHours' | 'places.secondaryOpeningHours' | 'places.specialDays' | 'places.utcOffsetMinutes' | 'places.photos' | 'places.reviews' | 'places.priceLevel' | 'places.accessibilityOptions' | 'places.editorialSummary' | 'places.takeout' | 'places.delivery' | 'places.dineIn' | 'places.servesBeer' | 'places.servesBreakfast' | 'places.servesBrunch' | 'places.servesDinner' | 'places.servesLunch' | 'places.servesVegetarianFood' | 'places.servesWine' | 'places.reservable' | 'places.goodForChildren' | 'places.paymentOptions' | 'places.parkingOptions' | 'places.businessName' | 'places.businessContact'>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/google',
            query: {
                'searchText': searchText,
                'lat': lat,
                'lng': lng,
                'isEmptyWebsite': isEmptyWebsite,
                'isEmptySocialWebsite': isEmptySocialWebsite,
                'radius': radius,
                'sort': sort,
                'fields': fields,
            },
        });
    }
    /**
     * @param searchText
     * @param lat
     * @param lng
     * @param isEmptyWebsite
     * @param isEmptySocialWebsite
     * @param radius
     * @param sort Sort method (only one allowed)
     * @param fields
     * @returns any
     * @throws ApiError
     */
    public static placeDemoList(
        searchText: string,
        lat: string,
        lng: string,
        isEmptyWebsite?: boolean,
        isEmptySocialWebsite?: boolean,
        radius?: number,
        sort?: 'rating' | 'rating count' | 'display name',
        fields?: Array<'places.id' | 'places.displayName' | 'places.formattedAddress' | 'places.googleMapsUri' | 'places.internationalPhoneNumber' | 'places.websiteUri' | 'places.rating' | 'places.userRatingCount' | 'places.businessStatus' | 'places.location' | 'places.viewport' | 'places.plusCode' | 'places.types' | 'places.addressComponents' | 'places.regularOpeningHours' | 'places.currentOpeningHours' | 'places.secondaryOpeningHours' | 'places.specialDays' | 'places.utcOffsetMinutes' | 'places.photos' | 'places.reviews' | 'places.priceLevel' | 'places.accessibilityOptions' | 'places.editorialSummary' | 'places.takeout' | 'places.delivery' | 'places.dineIn' | 'places.servesBeer' | 'places.servesBreakfast' | 'places.servesBrunch' | 'places.servesDinner' | 'places.servesLunch' | 'places.servesVegetarianFood' | 'places.servesWine' | 'places.reservable' | 'places.goodForChildren' | 'places.paymentOptions' | 'places.parkingOptions' | 'places.businessName' | 'places.businessContact'>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/google/demo',
            query: {
                'searchText': searchText,
                'lat': lat,
                'lng': lng,
                'isEmptyWebsite': isEmptyWebsite,
                'isEmptySocialWebsite': isEmptySocialWebsite,
                'radius': radius,
                'sort': sort,
                'fields': fields,
            },
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static placeView(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/google/{id}',
            path: {
                'id': id,
            },
        });
    }
}
