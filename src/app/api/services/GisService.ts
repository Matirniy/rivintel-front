/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GisService {
    /**
     * @param searchText
     * @param lat
     * @param lon
     * @param gridCount
     * @param radius Search radius in meters. Allowed values: 0-40000 if "q" (query) is present, 0-2000 if not. Default: 250 when using "point", 0 with "lon/lat".
     * @param hasSite
     * @param isEmptySocialWebsite
     * @param page
     * @param pageSize
     * @param sort Sort method (only one allowed)
     * @param fields
     * @returns any
     * @throws ApiError
     */
    public static gisControllerList(
        searchText: string,
        lat: string,
        lon: string,
        gridCount?: number,
        radius?: number,
        hasSite?: boolean,
        isEmptySocialWebsite?: boolean,
        page?: number,
        pageSize?: number,
        sort?: 'distance' | 'relevance' | 'rating' | 'flamp_rating' | 'creation_time' | 'opened_time' | 'name',
        fields?: Array<'items.point' | 'items.address' | 'items.adm_div' | 'items.full_address_name' | 'items.geometry.centroid' | 'items.geometry.hover' | 'items.geometry.selection' | 'items.rubrics' | 'items.org' | 'items.contact_groups' | 'items.schedule' | 'items.schedule_special' | 'items.access_comment' | 'items.access' | 'items.capacity' | 'items.description' | 'items.external_content' | 'items.flags' | 'items.floors' | 'items.floor_plans' | 'items.is_paid' | 'items.for_trucks' | 'items.paving_type' | 'items.is_incentive' | 'items.purpose' | 'items.level_count' | 'items.links' | 'items.links.database_entrances' | 'items.links.database_entrances.apartments_info' | 'items.name_ex' | 'items.reviews' | 'items.statistics' | 'items.employees_org_count' | 'items.itin' | 'items.trade_license' | 'items.fias_code' | 'items.address.components.fias_code' | 'items.fns_code' | 'items.okato' | 'items.address.components.okato' | 'items.oktmo' | 'items.address.components.oktmo' | 'context_rubrics' | 'dym' | 'filters' | 'items.ads.options' | 'items.attribute_groups' | 'items.context' | 'items.dates.deleted_at' | 'items.dates.updated_at' | 'items.dates' | 'items.geometry.style' | 'items.group' | 'items.metarubrics' | 'items.delivery' | 'items.has_goods' | 'items.has_pinned_goods' | 'items.has_realty' | 'items.has_audiogid' | 'items.has_discount' | 'items.has_exchange' | 'items.is_main_in_group' | 'items.city_alias' | 'items.detailed_subtype' | 'items.alias' | 'items.caption' | 'items.is_promoted' | 'items.routes' | 'items.directions' | 'items.barrier' | 'items.is_routing_available' | 'items.entrance_display_name' | 'items.locale' | 'items.reg_bc_url' | 'items.region_id' | 'items.segment_id' | 'items.stat' | 'items.stop_factors' | 'items.has_apartments_info' | 'items.timezone' | 'items.timezone_offset' | 'items.comment' | 'items.station_id' | 'items.platforms' | 'items.sources' | 'items.structure_info.material' | 'items.structure_info.apartments_count' | 'items.structure_info.porch_count' | 'items.structure_info.floor_type' | 'items.structure_info.gas_type' | 'items.structure_info.year_of_construction' | 'items.structure_info.elevators_count' | 'items.structure_info.is_in_emergency_state' | 'items.structure_info.project_type' | 'items.structure_info.chs_name' | 'items.structure_info.chs_category' | 'items.route_logo' | 'items.order_with_cart' | 'items.is_deleted' | 'items.search_attributes' | 'items.congestion' | 'items.poi_category' | 'items.has_dynamic_congestion' | 'items.temporary_unavailable_atm_services' | 'items.marker_alt' | 'items.floor_id' | 'items.purpose_code' | 'request_type' | 'search_attributes' | 'widgets' | 'items.name_back' | 'items.value_back' | 'items.ev_charging_station' | 'items.ski_lift' | 'items.has_ads_model'>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/gis',
            query: {
                'searchText': searchText,
                'lat': lat,
                'lon': lon,
                'gridCount': gridCount,
                'radius': radius,
                'hasSite': hasSite,
                'isEmptySocialWebsite': isEmptySocialWebsite,
                'page': page,
                'pageSize': pageSize,
                'sort': sort,
                'fields': fields,
            },
        });
    }
}
