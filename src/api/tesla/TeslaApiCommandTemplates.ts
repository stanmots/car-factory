/*
 * File: TeslaApiCommandTemplates.ts
 *
 * Copyright (c) Stan Mots. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { HttpRequestMethod } from "../shared/HttpTypes.js"
import type { TeslaApiHeaders } from "./TeslaApiTypes.js"

export type TeslaApiCommand = keyof typeof TeslaApiCommandTemplates
export type TeslaApiCommandGroup = keyof typeof TeslaApiCommandGroupTemplates

/**
 * @title Defines parameters which are used to send tesla api commands.
 * @markdownDescription
 * Template variables must be specified in string literals
 * between `{` and `}` delimiters.
 * 
 * To check whether `TeslaApiCommandTemplate` contains all keys
 * used by `TeslaApiCommandTemplates` specify its type as 
 * the following one: 
 * 
 // type _TeslaApiCommandTemplates = {
 //    [k in string]: TeslaApiCommandTemplate
 // }
 *
 * **Note:** Remove the type of `TeslaApiCommandTemplates` object 
 * after experiments to prevent literal widening. **See:** [TypeScript 3.4 const
assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
 */
export interface TeslaApiCommandTemplate {
    GROUP?: TeslaApiCommandGroup
    TYPE?: HttpRequestMethod
    HEADERS?: TeslaApiHeaders
    URI?: string
    AUTH?: boolean
    NOTE?: string
    CONTENT?: string
}

/**
 * Configuration of grouped command templates.
 *
 * Keys represent group names. Values represent template
 * parameters shared between the corresponding command templates (i.e.,
 * templates with the same `GROUP` values).
 *
 * `default` group is shared between all tesla api command templates.
 *
 * Each command template can specify multiple `GROUP` values. The parameters
 * defined by the command template override those defined by the groups it
 * belongs to.
 *
 * **Note:** Don't specify any type to prevent literal widening.
 */
export const TeslaApiCommandGroupTemplates = {
    default: {
        HEADERS: {
            "X-Tesla-User-Agent": "TeslaApp/4.8.1/5e1bfb8d0d/ios/15.4.1",
        },
    },
} as const

/**
 * Tesla api endpoints configuration (as defined in
 * `ownerapi_endpoints.json`).
 *
 * Keys represent api commands (**See** {@link TeslaApiCommand}).
 * Values represent api command templates (**See** {@link TeslaApiCommandTemplate}).
 *
 * **Notes:**
 * - Use `(:\s\{[\s\S\n]+?\},)` regex to select
 * every api command template (i.e. an object between curly braces)
 * in `VSCode`.
 *
 * - Don't specify any type to prevent literal widening.
 */
export const TeslaApiCommandTemplates = {
    STATUS: {
        TYPE: "GET",
        URI: "status",
        AUTH: false,
    },
    PRODUCT_LIST: {
        TYPE: "GET",
        URI: "api/1/products",
        AUTH: true,
    },
    VEHICLE_LIST: {
        TYPE: "GET",
        URI: "api/1/vehicles",
        AUTH: true,
    },
    VEHICLE_ORDER_LIST: {
        TYPE: "GET",
        URI: "api/1/users/orders",
        AUTH: true,
    },
    VEHICLE_SUMMARY: {
        TYPE: "GET",
        URI: "api/1/vehicles/{vehicle_id}",
        AUTH: true,
    },
    VEHICLE_DATA: {
        TYPE: "GET",
        URI: "api/1/vehicles/{vehicle_id}/vehicle_data",
        AUTH: true,
    },
    CACHED_PROTO_VEHICLE_DATA: {
        NOTE: "This is cached data, pushed by the vehicle on sleep, wake and around OTAs.",
        TYPE: "GET",
        URI: "api/1/vehicles/{vehicle_id}/latest_vehicle_data",
        AUTH: true,
    },
    VEHICLE_SERVICE_DATA: {
        TYPE: "GET",
        URI: "api/1/vehicles/{vehicle_id}/service_data",
        AUTH: true,
    },
    NEARBY_CHARGING_SITES: {
        TYPE: "GET",
        URI: "api/1/vehicles/{vehicle_id}/nearby_charging_sites",
        AUTH: true,
    },
    WAKE_UP: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/wake_up",
        AUTH: true,
    },
    UNLOCK: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/door_unlock",
        AUTH: true,
    },
    LOCK: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/door_lock",
        AUTH: true,
    },
    HONK_HORN: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/honk_horn",
        AUTH: true,
    },
    FLASH_LIGHTS: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/flash_lights",
        AUTH: true,
    },
    CLIMATE_ON: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/auto_conditioning_start",
        AUTH: true,
    },
    CLIMATE_OFF: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/auto_conditioning_stop",
        AUTH: true,
    },
    MAX_DEFROST: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_preconditioning_max",
        AUTH: true,
    },
    CHANGE_CLIMATE_TEMPERATURE_SETTING: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_temps",
        AUTH: true,
    },
    SET_CLIMATE_KEEPER_MODE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_climate_keeper_mode",
        AUTH: true,
    },
    HVAC_BIOWEAPON_MODE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_bioweapon_mode",
        AUTH: true,
    },
    SCHEDULED_DEPARTURE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_scheduled_departure",
        AUTH: true,
    },
    SCHEDULED_CHARGING: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_scheduled_charging",
        AUTH: true,
    },
    CHARGING_AMPS: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_charging_amps",
        AUTH: true,
    },
    SET_CABIN_OVERHEAT_PROTECTION: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_cabin_overheat_protection",
        AUTH: true,
    },
    CHANGE_CHARGE_LIMIT: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_charge_limit",
        AUTH: true,
    },
    SET_VEHICLE_NAME: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_vehicle_name",
        AUTH: true,
    },
    CHANGE_SUNROOF_STATE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/sun_roof_control",
        AUTH: true,
    },
    WINDOW_CONTROL: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/window_control",
        AUTH: true,
    },
    ACTUATE_TRUNK: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/actuate_trunk",
        AUTH: true,
    },
    REMOTE_START: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/remote_start_drive",
        AUTH: true,
    },
    TRIGGER_HOMELINK: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/trigger_homelink",
        AUTH: true,
    },
    CHARGE_PORT_DOOR_OPEN: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/charge_port_door_open",
        AUTH: true,
    },
    CHARGE_PORT_DOOR_CLOSE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/charge_port_door_close",
        AUTH: true,
    },
    START_CHARGE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/charge_start",
        AUTH: true,
    },
    STOP_CHARGE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/charge_stop",
        AUTH: true,
    },
    MEDIA_TOGGLE_PLAYBACK: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_toggle_playback",
        AUTH: true,
    },
    MEDIA_NEXT_TRACK: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_next_track",
        AUTH: true,
    },
    MEDIA_PREVIOUS_TRACK: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_prev_track",
        AUTH: true,
    },
    MEDIA_NEXT_FAVORITE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_next_fav",
        AUTH: true,
    },
    MEDIA_PREVIOUS_FAVORITE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_prev_fav",
        AUTH: true,
    },
    MEDIA_VOLUME_UP: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_volume_up",
        AUTH: true,
    },
    MEDIA_VOLUME_DOWN: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_volume_down",
        AUTH: true,
    },
    SPLUNK_TELEMETRY: {
        TYPE: "POST",
        URI: "api/1/logs",
        AUTH: true,
    },
    APP_FEEDBACK_ENTITLEMENTS: {
        TYPE: "GET",
        URI: "api/1/diagnostics",
        AUTH: true,
    },
    APP_FEEDBACK_LOGS: {
        TYPE: "POST",
        URI: "api/1/reports",
        AUTH: true,
    },
    APP_FEEDBACK_METADATA: {
        TYPE: "POST",
        URI: "api/1/diagnostics",
        AUTH: true,
    },
    RETRIEVE_NOTIFICATION_PREFERENCES: {
        TYPE: "GET",
        URI: "api/1/notification_preferences",
        AUTH: true,
    },
    SEND_NOTIFICATION_PREFERENCES: {
        TYPE: "POST",
        URI: "api/1/notification_preferences",
        AUTH: true,
    },
    RETRIEVE_NOTIFICATION_SUBSCRIPTIONS: {
        TYPE: "GET",
        URI: "api/1/subscriptions",
        AUTH: true,
    },
    SEND_NOTIFICATION_SUBSCRIPTIONS: {
        TYPE: "POST",
        URI: "api/1/subscriptions",
        AUTH: true,
    },
    DEACTIVATE_DEVICE_TOKEN: {
        TYPE: "POST",
        URI: "api/1/device/{device_token}/deactivate",
        AUTH: true,
    },
    CALENDAR_SYNC: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/upcoming_calendar_entries",
        AUTH: true,
    },
    SET_VALET_MODE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_valet_mode",
        AUTH: true,
    },
    RESET_VALET_PIN: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/reset_valet_pin",
        AUTH: true,
    },
    SPEED_LIMIT_ACTIVATE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/speed_limit_activate",
        AUTH: true,
    },
    SPEED_LIMIT_DEACTIVATE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/speed_limit_deactivate",
        AUTH: true,
    },
    SPEED_LIMIT_SET_LIMIT: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/speed_limit_set_limit",
        AUTH: true,
    },
    SPEED_LIMIT_CLEAR_PIN: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/speed_limit_clear_pin",
        AUTH: true,
    },
    SCHEDULE_SOFTWARE_UPDATE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/schedule_software_update",
        AUTH: true,
    },
    CANCEL_SOFTWARE_UPDATE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/cancel_software_update",
        AUTH: true,
    },
    SET_SENTRY_MODE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_sentry_mode",
        AUTH: true,
    },
    TAKE_DRIVENOTE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/take_drivenote",
        AUTH: true,
    },
    POWERWALL_ORDER_SESSION_DATA: {
        TYPE: "GET",
        URI: "api/1/users/powerwall_order_entry_data",
        AUTH: true,
    },
    POWERWALL_ORDER_PAGE: {
        TYPE: "GET",
        URI: "powerwall_order_page",
        AUTH: true,
        CONTENT: "HTML",
    },
    ONBOARDING_EXPERIENCE: {
        TYPE: "GET",
        URI: "api/1/users/onboarding_data",
        AUTH: true,
    },
    ONBOARDING_EXPERIENCE_PAGE: {
        TYPE: "GET",
        URI: "onboarding_page",
        AUTH: true,
        CONTENT: "HTML",
    },
    GET_UPCOMING_SERVICE_VISIT_DATA: {
        TYPE: "GET",
        URI: "api/1/users/service_scheduling_data",
        AUTH: true,
    },
    GET_OWNERSHIP_XP_CONFIG: {
        TYPE: "GET",
        URI: "api/1/users/app_config",
        AUTH: true,
    },
    REFERRAL_DATA: {
        TYPE: "GET",
        URI: "api/1/users/referral_data",
        AUTH: true,
    },
    REFERRAL_PAGE: {
        TYPE: "GET",
        URI: "referral_page",
        AUTH: true,
        CONTENT: "HTML",
    },
    ROADSIDE_ASSISTANCE_DATA: {
        TYPE: "GET",
        URI: "api/1/users/roadside_assistance_data",
        AUTH: true,
    },
    ROADSIDE_ASSISTANCE_PAGE: {
        TYPE: "GET",
        URI: "roadside_assistance_page",
        AUTH: true,
        CONTENT: "HTML",
    },
    MESSAGE_CENTER_MESSAGE_COUNT: {
        TYPE: "GET",
        URI: "api/1/messages/count",
        AUTH: true,
    },
    MESSAGE_CENTER_MESSAGE_LIST: {
        TYPE: "GET",
        URI: "api/1/messages",
        AUTH: true,
    },
    MESSAGE_CENTER_MESSAGE: {
        TYPE: "GET",
        URI: "api/1/messages/{message_id}",
        AUTH: true,
    },
    MESSAGE_CENTER_MESSAGE_ACTION_UPDATE: {
        TYPE: "POST",
        URI: "api/1/messages/{message_id}/actions",
        AUTH: true,
    },
    SEND_DEVICE_KEY: {
        TYPE: "POST",
        URI: "api/1/users/keys",
        AUTH: true,
    },
    SITE_DATA: {
        TYPE: "GET",
        URI: "api/1/energy_sites/{site_id}/live_status",
        AUTH: true,
    },
    SITE_CONFIG: {
        TYPE: "GET",
        URI: "api/1/energy_sites/{site_id}/site_info",
        AUTH: true,
    },
    RATE_TARIFFS: {
        TYPE: "GET",
        URI: "api/1/energy_sites/rate_tariffs",
        AUTH: true,
    },
    SITE_TARIFF: {
        TYPE: "GET",
        URI: "api/1/energy_sites/{site_id}/tariff_rate",
        AUTH: true,
    },
    CALENDAR_HISTORY_DATA: {
        TYPE: "GET",
        URI: "api/1/energy_sites/{site_id}/calendar_history",
        AUTH: true,
    },
    SOLAR_SAVINGS_FORECAST: {
        TYPE: "GET",
        URI: "api/1/energy_sites/{site_id}/savings_forecast",
        AUTH: true,
    },
    ENERGY_REGISTER_PRODUCT: {
        TYPE: "POST",
        URI: "api/1/users/register_product",
        AUTH: true,
    },
    ENERGY_SITE_BACKUP_TIME_REMAINING: {
        TYPE: "GET",
        URI: "api/1/energy_sites/{site_id}/backup_time_remaining",
        AUTH: true,
    },
    ENERGY_SITE_PROGRAMS: {
        TYPE: "GET",
        URI: "api/1/energy_sites/{site_id}/programs",
        AUTH: true,
    },
    ENERGY_SITE_TELEMETRY_HISTORY: {
        TYPE: "GET",
        URI: "api/1/energy_sites/{site_id}/telemetry_history",
        AUTH: true,
    },
    BACKUP_RESERVE: {
        TYPE: "POST",
        URI: "api/1/energy_sites/{site_id}/backup",
        AUTH: true,
    },
    OFF_GRID_VEHICLE_CHARGING_RESERVE: {
        TYPE: "POST",
        URI: "api/1/energy_sites/{site_id}/off_grid_vehicle_charging_reserve",
        AUTH: true,
    },
    SITE_NAME: {
        TYPE: "POST",
        URI: "api/1/energy_sites/{site_id}/site_name",
        AUTH: true,
    },
    OPERATION_MODE: {
        TYPE: "POST",
        URI: "api/1/energy_sites/{site_id}/operation",
        AUTH: true,
    },
    ENERGY_SITE_IMPORT_EXPORT_CONFIG: {
        TYPE: "POST",
        URI: "api/1/energy_sites/{site_id}/grid_import_export",
        AUTH: true,
    },
    TIME_OF_USE_SETTINGS: {
        TYPE: "POST",
        URI: "api/1/energy_sites/{site_id}/time_of_use_settings",
        AUTH: true,
    },
    STORM_MODE_SETTINGS: {
        TYPE: "POST",
        URI: "api/1/energy_sites/{site_id}/storm_mode",
        AUTH: true,
    },
    ENERGY_SITE_COMMAND: {
        TYPE: "POST",
        URI: "api/1/energy_sites/{site_id}/command",
        AUTH: true,
    },
    ENERGY_SITE_ENROLL_PROGRAM: {
        TYPE: "POST",
        URI: "api/1/energy_sites/{site_id}/program",
        AUTH: true,
    },
    ENERGY_SITE_OPT_EVENT: {
        TYPE: "POST",
        URI: "api/1/energy_sites/{site_id}/event",
        AUTH: true,
    },
    ENERGY_SITE_PREFERENCE: {
        TYPE: "POST",
        URI: "api/1/energy_sites/{site_id}/preference",
        AUTH: true,
    },
    CHECK_ENERGY_PRODUCT_REGISTRATION: {
        TYPE: "GET",
        URI: "api/1/energy_sites/registered",
        AUTH: true,
    },
    ENERGY_EVENT: {
        TYPE: "POST",
        URI: "api/1/energy_sites/energy_event",
        AUTH: true,
    },
    VEHICLE_CHARGE_HISTORY: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/charge_history",
        AUTH: true,
    },
    ENERGY_SITE_PROGRAM_DETAILS: {
        TYPE: "GET",
        URI: "api/1/energy_sites/{site_id}/program",
        AUTH: true,
    },
    ENERGY_WALL_CONNECTOR_FIRMWARE_DOWNLOAD_URL: {
        TYPE: "GET",
        URI: "api/1/wall_connectors/firmware",
        AUTH: true,
    },
    SEND_NOTIFICATION_CONFIRMATION: {
        TYPE: "POST",
        URI: "api/1/notification_confirmations",
        AUTH: true,
    },
    SEND_TO_VEHICLE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/share",
        AUTH: true,
    },
    SEND_SC_TO_VEHICLE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/navigation_sc_request",
        AUTH: true,
    },
    SEND_GPS_TO_VEHICLE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/navigation_gps_request",
        AUTH: true,
    },
    REMOTE_SEAT_HEATER_REQUEST: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/remote_seat_heater_request",
        AUTH: true,
    },
    REMOTE_AUTO_SEAT_CLIMATE_REQUEST: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/remote_auto_seat_climate_request",
        AUTH: true,
    },
    REMOTE_SEAT_COOLING_REQUEST: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/remote_seat_cooler_request",
        AUTH: true,
    },
    REMOTE_STEERING_WHEEL_HEATER_REQUEST: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/remote_steering_wheel_heater_request",
        AUTH: true,
    },
    TRIGGER_VEHICLE_SCREENSHOT: {
        TYPE: "GET",
        URI: "api/1/vehicles/{vehicle_id}/screenshot",
        AUTH: true,
    },
    HERMES_AUTHORIZATION: {
        TYPE: "POST",
        URI: "api/1/users/jwt/hermes",
        AUTH: true,
    },
    HERMES_VEHICLE_AUTHORIZATION: {
        TYPE: "POST",
        URI: "api/1/vehicles/{id}/jwt/hermes",
        AUTH: true,
    },
    STATIC_SUPERCHARGER_FILE: {
        TYPE: "GET",
        URI: "static/superchargers/{file_path}",
        AUTH: true,
    },
    STATIC_CHARGER_FILE: {
        TYPE: "GET",
        URI: "static/chargers/{file_path}",
        AUTH: true,
    },
    PLAN_TRIP: {
        TYPE: "POST",
        URI: "api/1/vehicles/plan_trip",
        AUTH: true,
    },
    PLACE_SUGGESTIONS: {
        TYPE: "POST",
        URI: "api/1/vehicles/place_suggestions",
        AUTH: true,
    },
    DRIVING_PLAN: {
        TYPE: "POST",
        URI: "api/1/vehicles/driving_plan",
        AUTH: true,
    },
    REVERSE_GEOCODING: {
        TYPE: "GET",
        URI: "maps/reverse_geocoding/v3/",
        AUTH: true,
    },
    USER: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/user",
        AUTH: true,
    },
    OWNERSHIP_TRANSLATIONS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/static/protected/translations/{path}",
        AUTH: true,
    },
    ROADSIDE_INCIDENTS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/roadside/incidents",
        AUTH: true,
    },
    ROADSIDE_CREATE_INCIDENT: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/roadside/incidents",
        AUTH: true,
    },
    ROADSIDE_CANCEL_INCIDENT: {
        TYPE: "PUT",
        URI: "bff/v2/mobile-app/roadside/incidents/{incidentsId}",
        AUTH: true,
    },
    ROADSIDE_WARRANTY: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/roadside/warranty",
        AUTH: true,
    },
    ROADSIDE_LOCATIONS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/roadside/locations",
        AUTH: true,
    },
    ROADSIDE_COUNTRIES: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/roadside/countries",
        AUTH: true,
    },
    SERVICE_GET_SERVICE_VISITS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/appointments",
        AUTH: true,
    },
    SERVICE_UPDATE_APPOINTMENT: {
        TYPE: "PUT",
        URI: "bff/v2/mobile-app/service/appointments/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_CANCEL_APPOINTMENT: {
        TYPE: "PATCH",
        URI: "mobile-app/service/appointments/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_CREATE_ACTIVITIES: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/activities/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_UPDATE_ACTIVITIES: {
        TYPE: "PUT",
        URI: "bff/v2/mobile-app/service/activities/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_DELETE_ACTIVITIES: {
        TYPE: "PATCH",
        URI: "bff/v2/mobile-app/service/activities/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_GET_SERVICE_APPOINTMENTS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/service-appointments",
        AUTH: true,
    },
    SERVICE_CREATE_SERVICE_VISIT: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/appointments",
        AUTH: true,
    },
    SERVICE_TRACKER_DETAILS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/tracker/{serviceVisitID}",
        AUTH: true,
    },
    SERVICE_MOBILE_NEAREST_LOCATIONS: {
        TYPE: "GET",
        URI: "mobile-app/service/locations/mobile/nearest",
        AUTH: true,
    },
    SERVICE_MOBILE_OPEN_SLOTS: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/locations/mobile/slots",
        AUTH: true,
    },
    SERVICE_CENTER_OPEN_SLOTS: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/locations/center/slots",
        AUTH: true,
    },
    SERVICE_CENTER_FETCH_PREFERRED_CENTER: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/locations/preferred-service-center",
        AUTH: true,
    },
    SERVICE_CENTER_UPDATE_PREFERRED_CENTER: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/locations/preferred-service-center",
        AUTH: true,
    },
    SERVICE_SAVE_CENTER_APPOINTMENT: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/center",
        AUTH: true,
    },
    SERVICE_CREATE_MOBILE_APPOINTMENT: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/mobile",
        AUTH: true,
    },
    SERVICE_UPDATE_MOBILE_APPOINTMENT: {
        TYPE: "PATCH",
        URI: "bff/v2/mobile-app/service/mobile/{appointmentId}",
        AUTH: true,
    },
    SERVICE_SWITCH_TO_CENTER_APPOINTMENT: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/mobile/{appointmentId}/convert-to-center",
        AUTH: true,
    },
    SERVICE_SWITCH_TO_MOBILE_APPOINTMENT: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/center/{appointmentId}/convert-to-mobile",
        AUTH: true,
    },
    SERVICE_MOBILE_APPOINTMENT_DETAILS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/mobile/{appointmentId}",
        AUTH: true,
    },
    SERVICE_CENTER_APPOINTMENT_DETAILS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/center/{appointmentId}",
        AUTH: true,
    },
    SERVICE_HISTORY: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/history",
        AUTH: true,
    },
    SERVICE_SURVEY_ELIGIBILITY: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/surveys",
        AUTH: true,
    },
    SERVICE_SURVEY_QUESTIONS: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/surveys",
        AUTH: true,
    },
    SERVICE_SURVEY_ANSWER_QUESTIONS: {
        TYPE: "PUT",
        URI: "bff/v2/mobile-app/service/surveys",
        AUTH: true,
    },
    SERVICE_LOCATIONS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/center/locations",
        AUTH: true,
    },
    SERVICE_LOCATIONS_BY_TRT_ID: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/center/locations-by-trtid",
        AUTH: true,
    },
    SERVICE_MOBILE_ISSUES: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/feature-flag/mobile-service-issues",
        AUTH: true,
    },
    SERVICE_FEATURE_FLAG_SERVICE_TRACKER: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/feature-flag/mobile-app-service-tracker",
        AUTH: true,
    },
    SERVICE_FEATURE_FLAG_ALLOW_FILE_UPLOAD: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/feature-flag/service-scheduling-allow-file-upload",
        AUTH: true,
    },
    SERVICE_FEATURE_FLAG_MOBILE_SERVICE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/feature-flag/show-mobile-service",
        AUTH: true,
    },
    SERVICE_FEATURE_FLAG_MACGYVER: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/feature-flag/tao-4109-use-macgyver-mobile-app",
        AUTH: true,
    },
    SERVICE_FEATURE_FLAG_SCHEDULING_FALLBACK: {
        TYPE: "GET",
        URI: "mobile-app/feature-flag/TAO-13782-no-estimate-schedule-fallback",
        AUTH: true,
    },
    SERVICE_UPLOAD_FILE: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/files",
        AUTH: true,
    },
    SERVICE_DELETE_UPLOADED_FILE: {
        TYPE: "PUT",
        URI: "bff/v2/mobile-app/files/{uuid}",
        AUTH: true,
    },
    SERVICE_UPDATE_FILE_METADATA: {
        TYPE: "PATCH",
        URI: "bff/v2/mobile-app/files/{uuid}/metadata",
        AUTH: true,
    },
    SERVICE_GET_FILE_LIST: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/files/metadata",
        AUTH: true,
    },
    SERVICE_GET_FILE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/files/{uuid}",
        AUTH: true,
    },
    SERVICE_GET_APPOINTMENT_INVOICES: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/tracker/{serviceVisitID}/invoices",
        AUTH: true,
    },
    SERVICE_GET_ESTIMATE_APPROVAL_STATUS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/tracker/{serviceVisitID}/estimate-status",
        AUTH: true,
    },
    SERVICE_GET_ESTIMATE_COST_DETAILS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/tracker/invoices/{invoiceId}",
        AUTH: true,
    },
    SERVICE_APPROVE_ESTIMATE: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/tracker/{serviceVisitID}/estimate-status",
        AUTH: true,
    },
    SERVICE_GET_FINAL_INVOICE_AMOUNT_DUE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/tracker/{serviceVisitID}/amount-due",
        AUTH: true,
    },
    SERVICE_MACGYVER_ALERTS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/macgyver/alerts",
        AUTH: true,
    },
    SERVICE_MACGYVER_OUTSTANDING_WORK: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/macgyver/categories",
        AUTH: true,
    },
    SERVICE_ACTIVITY_INFO: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/macgyver/activity-info/{serviceVisitID}",
        AUTH: true,
    },
    SERVICE_MACGYVER_POST_CUSTOMER_ANSWERS: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/macgyver/customer-answers",
        AUTH: true,
    },
    SERVICE_MACGYVER_DISMISS_CUSTOMER_ANSWERS: {
        TYPE: "PUT",
        URI: "bff/v2/mobile-app/macgyver/customer-answers",
        AUTH: true,
    },
    SERVICE_MACGYVER_SERVICE_TYPE: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/macgyver/service-type",
        AUTH: true,
    },
    SERVICE_MACGYVER_DIAGNOSTIC_RESULT: {
        TYPE: "GET",
        URI: "mobile-app/macgyver/urgent-autodiag-result",
        AUTH: true,
    },
    SERVICE_MACGYVER_CLASSIFY_COLLISION_IMAGES: {
        TYPE: "POST",
        URI: "mobile-app/macgyver/classify-collision-images",
        AUTH: true,
    },
    SERVICE_ACCEPT_LOANER_AGREEMENT: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/loaner/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_CREATE_OFFLINE_ORDER: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/payment/create-offline-order",
        AUTH: true,
    },
    SERVICE_COMPLETE_OFFLINE_ORDER: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/payment/complete-offline-order",
        AUTH: true,
    },
    SERVICE_EXTERNAL_COLLISION_CENTER_LIST: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/locations/external-collision-center-list",
        AUTH: true,
    },
    SERVICE_FETCH_RECALLS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/campaign/recall-detail",
        AUTH: true,
    },
    SERVICE_FETCH_ENTITY_CODE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/appointments/get-trt/{trtId}",
        AUTH: true,
    },
    SERVICE_CREATE_INVOICE: {
        TYPE: "POST",
        URI: "mobile-app/service/estimate/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_ESTIMATE_DETAILS: {
        TYPE: "GET",
        URI: "mobile-app/service/estimate/{serviceVisitID}",
        AUTH: true,
    },
    SERVICE_RESCHEDULE_DISCLAIMER: {
        TYPE: "GET",
        URI: "mobile-app/service/reschedule-disclaimer",
        AUTH: true,
    },
    ENERGY_OWNERSHIP_GET_TOGGLES: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/energy/feature-flags",
        AUTH: true,
    },
    ENERGY_SERVICE_GET_SITE_INFORMATION: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/energy-service/site-information",
        AUTH: true,
    },
    ENERGY_SERVICE_GET_SERVICE_CASES: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/energy-service/appointments",
        AUTH: true,
    },
    ENERGY_SERVICE_POST_SERVICE_CASE: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/energy-service/appointments",
        AUTH: true,
    },
    ENERGY_SERVICE_GET_APPOINTMENT_SUGGESTIONS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/energy-service/appointment-suggestions",
        AUTH: true,
    },
    ENERGY_SERVICE_CANCEL_SERVICE_CASE: {
        TYPE: "PUT",
        URI: "bff/v2/mobile-app/energy-service/service-case",
        AUTH: true,
    },
    ENERGY_SERVICE_CANCEL_APPOINTMENT: {
        TYPE: "PUT",
        URI: "bff/v2/mobile-app/energy-service/appointments",
        AUTH: true,
    },
    ENERGY_DOCUMENTS_GET_DOCUMENTS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/energy-documents/documents",
        AUTH: true,
    },
    ENERGY_DOCUMENTS_DOWNLOAD_DOCUMENT: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/energy-documents/documents/{documentId}",
        AUTH: true,
    },
    ENERGY_GET_TROUBLESHOOTING_GUIDE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/energy-service/troubleshooting/{troubleshootingFlow}?version=3",
        AUTH: true,
    },
    ENERGY_SERVICE_GET_POWERWALL_WARRANTY_DETAILS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/energy-service/warranty-details",
        AUTH: true,
    },
    ENERGY_SERVICE_GET_CHAT_AVAILABILITY: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/energy-service/chat-availability",
        AUTH: true,
    },
    LOOTBOX_USER_INFO: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/referrals",
        AUTH: true,
    },
    LOOTBOX_GET_ONBOARDING_COPY: {
        TYPE: "GET",
        URI: "mobile-app/referrals/getOnboardingCopy",
        AUTH: true,
    },
    LOOTBOX_PAST_REFERRAL_DATA: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/referrals/past-referrals",
        AUTH: true,
    },
    REFERRAL_GET_USER_INFO: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/referrals/user-info",
        AUTH: true,
    },
    REFERRAL_GET_PRODUCT_INFO: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/referrals/product-info",
        AUTH: true,
    },
    REFERRAL_GET_CONTACT_LIST: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/referrals/contact-list",
        AUTH: true,
    },
    REFERRAL_POST_CONTACT_LIST: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/referrals/contact-list",
        AUTH: true,
    },
    REFERRAL_GET_CREDIT_HISTORY: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/referrals/credit-history",
        AUTH: true,
    },
    REFERRAL_GET_PAST_HISTORY: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/referrals/past-referral-history",
        AUTH: true,
    },
    REFERRAL_GET_PAST_HISTORY_COUNT: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/referrals/past-referral-history/count",
        AUTH: true,
    },
    REFERRAL_GET_FEATURE_FLAG: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/feature-flag/tao-69420-treasure",
        AUTH: true,
    },
    REFERRAL_GET_TERMS_AND_CONDITIONS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/referrals/terms-conditions",
        AUTH: true,
    },
    UPGRADES_GET_ELIGIBLE_UPGRADES: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/upgrades/eligible/v2",
        AUTH: true,
    },
    UPGRADES_GET_PURCHASED_UPGRADES_V2: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/upgrades/purchased/v2",
        AUTH: true,
    },
    UPGRADES_SUBMIT_REFUND: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/upgrades/refunds/v2",
        AUTH: true,
    },
    USER_ACCOUNT_GET_DETAILS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/account/details",
        AUTH: true,
    },
    USER_ACCOUNT_PUT_DETAILS: {
        TYPE: "PUT",
        URI: "bff/v2/mobile-app/account/details",
        AUTH: true,
    },
    USER_ACCOUNT_UPLOAD_PROFILE_PICTURE: {
        TYPE: "POST",
        URI: "images/upload",
        AUTH: true,
    },
    USER_ACCOUNT_DOWNLOAD_PROFILE_PICTURE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/account/profile-pic",
        AUTH: true,
    },
    UPGRADES_CREATE_OFFLINE_ORDER: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/upgrades/payment/offline-order",
        AUTH: true,
    },
    UPGRADES_COMPLETE_OFFLINE_ORDER: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/upgrades/payment/offline-purchase-complete/v2",
        AUTH: true,
    },
    SUBSCRIPTIONS_GET_ELIGIBLE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/subscriptions",
        AUTH: true,
    },
    SUBSCRIPTIONS_GET_PURCHASED_SUBSCRIPTIONS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/subscriptions/purchased/v2",
        AUTH: true,
    },
    SUBSCRIPTIONS_CREATE_OFFLINE_ORDER: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/subscriptions/offline-order",
        AUTH: true,
    },
    SUBSCRIPTIONS_POST_CREATE_OFFLINE_ORDER: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/subscriptions/offline-order",
        AUTH: true,
    },
    SUBSCRIPTIONS_PURCHASE: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/subscriptions",
        AUTH: true,
    },
    MANAGE_GET_SUBSCRIPTION_INVOICES: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/subscriptions/invoices",
        AUTH: true,
    },
    MANAGE_PATCH_AUTO_RENEW_SUBSCRIPTIONS: {
        TYPE: "PATCH",
        URI: "bff/v2/mobile-app/subscriptions/v2",
        AUTH: true,
    },
    MANAGE_GET_BILL_ME_LATER_LIST: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/bill-me-later/pending-orders",
        AUTH: true,
    },
    MANAGE_COMPLETE_BILL_ME_LATER_ORDER: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/bill-me-later/purchase-complete",
        AUTH: true,
    },
    MANAGE_CANCEL_BILL_ME_LATER_ORDER: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/bill-me-later/cancel",
        AUTH: true,
    },
    MANAGE_UPGRADE_BILL_ME_LATER_GET_OFFLINE_TOKEN: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/bill-me-later/token",
        AUTH: true,
    },
    MANAGE_GET_BILL_ME_LATER_TOGGLE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/bill-me-later/security-toggle",
        AUTH: true,
    },
    MANAGE_POST_BILL_ME_LATER_TOGGLE: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/bill-me-later/security-toggle",
        AUTH: true,
    },
    BILLING_ADDRESS_FORM_FEATURE_FLAG: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/billing-address/feature-flag/tao-8202-ownership-mobile-app-billing-address",
        AUTH: true,
    },
    VIDEO_GUIDES_GET_VIDEO_LIST: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/video-guides",
        AUTH: true,
    },
    PAYMENTS_GET_SIGNED_USER_TOKEN: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/payments/signed-user-token",
        AUTH: true,
    },
    PAYMENTS_GET_SIGNED_USER_TOKEN_V4: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/payments/v4/signed-user-token",
        AUTH: true,
    },
    PAYMENTS_POST_SIGNED_USER_TOKEN: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/payments/signed-user-token",
        AUTH: true,
    },
    PAYMENTS_GET_INSTRUMENT: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/payments/instrument",
        AUTH: true,
    },
    PAYMENTS_GET_BILLING_ADDRESS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/billing-address",
        AUTH: true,
    },
    PAYMENTS_UPDATE_BILLING_ADDRESS: {
        TYPE: "PUT",
        URI: "bff/v2/mobile-app/billing-address",
        AUTH: true,
    },
    PAYMENTS_FETCH_CN_ENTITY: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/payments/entity",
        AUTH: true,
    },
    DOCUMENTS_DOWNLOAD_INVOICE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/documents/invoices/{invoiceId}",
        AUTH: true,
    },
    SERVICE_MESSAGES: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/messages/{serviceVisitID}",
        AUTH: true,
    },
    SERVICE_SEND_MESSAGE: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/service/messages/{serviceVisitID}",
        AUTH: true,
    },
    SERVICE_MESSAGES_MARK_READ: {
        TYPE: "PATCH",
        URI: "bff/v2/mobile-app/service/messages/{serviceVisitID}",
        AUTH: true,
    },
    SERVICE_MESSAGES_USER_LIST: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/service/messages/users",
        AUTH: true,
    },
    COMMERCE_CATEGORIES: {
        TYPE: "GET",
        URI: "commerce-api/categories/v1{locale}",
        AUTH: true,
    },
    COMMERCE_RECOMMENDATIONS_CATEGORIES: {
        TYPE: "POST",
        URI: "commerce-api/recommendations/categories/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GET_ADDRESS: {
        TYPE: "GET",
        URI: "commerce-api/addresses/v1{locale}",
        AUTH: true,
    },
    COMMERCE_ADDRESS: {
        TYPE: "POST",
        URI: "commerce-api/addresses/v1{locale}",
        AUTH: true,
    },
    COMMERCE_CAPTURE: {
        TYPE: "POST",
        URI: "commerce-api/purchases/v1{locale}",
        AUTH: true,
    },
    COMMERCE_PROCESSPAYMENT: {
        TYPE: "POST",
        URI: "commerce-api/purchases/{purchaseNumber}/processpayment/v1{locale}",
        AUTH: true,
    },
    COMMERCE_CART_UPDATE: {
        TYPE: "PUT",
        URI: "commerce-api/carts/{cartId}/items/{lineItemId}/v1{locale}",
        AUTH: true,
    },
    COMMERCE_CART_DELETE: {
        TYPE: "DELETE",
        URI: "commerce-api/carts/{cartId}/items/{lineItemId}/v1{locale}",
        AUTH: true,
    },
    COMMERCE_ADD_CART: {
        TYPE: "POST",
        URI: "commerce-api/carts/items/v1{locale}",
        AUTH: true,
    },
    COMMERCE_CLEAR_CART: {
        TYPE: "DELETE",
        URI: "commerce-api/carts/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GET_CART: {
        TYPE: "GET",
        URI: "commerce-api/carts/v1{locale}",
        AUTH: true,
    },
    COMMERCE_INVENTORY: {
        TYPE: "POST",
        URI: "commerce-api/inventory/v2{locale}",
        AUTH: true,
    },
    COMMERCE_ITEM: {
        TYPE: "POST",
        URI: "commerce-api/items/v1{locale}",
        AUTH: true,
    },
    COMMERCE_TOKEN: {
        TYPE: "POST",
        URI: "commerce-api/tokens/v1{locale}",
        AUTH: true,
    },
    COMMERCE_ADDRESS_VALIDATION: {
        TYPE: "POST",
        URI: "commerce-api/addresses/validations/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GEOGRAPHIES: {
        TYPE: "GET",
        URI: "commerce-api/geographies/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GET_STORE_INFO: {
        TYPE: "GET",
        URI: "commerce-api/storeconfigurations/v1{locale}",
        AUTH: true,
    },
    COMMERCE_PURCHASE_HISTORY: {
        TYPE: "GET",
        URI: "commerce-api/purchases/v1{locale}",
        AUTH: true,
    },
    COMMERCE_PURCHASE_BY_ORDERNUMBER: {
        TYPE: "GET",
        URI: "commerce-api/purchases/{orderNumber}/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GET_VEHICLES: {
        TYPE: "GET",
        URI: "commerce-api/vehicles/v1{locale}",
        AUTH: true,
    },
    COMMERCE_POST_VEHICLES: {
        TYPE: "POST",
        URI: "commerce-api/vehicles/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GET_SERVICECENTERS: {
        TYPE: "GET",
        URI: "commerce-api/servicecenters/v1{locale}",
        AUTH: true,
    },
    COMMERCE_POST_SERVICECENTERS: {
        TYPE: "POST",
        URI: "commerce-api/servicecenters/v1{locale}",
        AUTH: true,
    },
    COMMERCE_POST_CANCELORDER: {
        TYPE: "POST",
        URI: "commerce-api/cancellation/v1{locale}",
        AUTH: true,
    },
    COMMERCE_POST_RETURNORDER: {
        TYPE: "POST",
        URI: "commerce-api/returns/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GET_INSTALLERS: {
        TYPE: "GET",
        URI: "commerce-api/installers/v1{locale}",
        AUTH: true,
    },
    COMMERCE_POST_INSTALLER_VENDOR: {
        TYPE: "POST",
        URI: "commerce-api/checkout/auditrecords/v1{locale}",
        AUTH: true,
    },
    COMMERCE_CONTENT: {
        TYPE: "GET",
        URI: "commerce-api/content/v2?file={fileName}",
        AUTH: true,
    },
    COMMERCE_CREATE_ENERGY_ORDER: {
        TYPE: "POST",
        URI: "commerce-api/energy/orders/v1{locale}",
        AUTH: true,
    },
    COMMERCE_STOCK_NOTIFICATION: {
        TYPE: "POST",
        URI: "commerce-api/stocknotifications/v1{locale}",
        AUTH: true,
    },
    MATTERMOST: {
        TYPE: "POST",
        URI: "Just a placeholder",
        AUTH: true,
    },
    SAFETY_RATING_GET_ELIGIBLE_FOR_TELEMATICS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/insurance/eligible-for-telematics",
        AUTH: true,
    },
    SAFETY_RATING_GET_DAILY_BREAKDOWN: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/insurance/daily-breakdown",
        AUTH: true,
    },
    SAFETY_RATING_GET_TRIPS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/insurance/trips",
        AUTH: true,
    },
    SAFETY_RATING_GET_ESTIMATED_SAFETY_SCORE: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/insurance/calculate-safety-rating",
        AUTH: true,
    },
    COMMERCE_POST_INVOICE: {
        TYPE: "POST",
        URI: "commerce-api/purchases/invoices/v1{locale}",
        AUTH: true,
    },
    COMMERCE_POST_CHECKOUT_INVOICE: {
        TYPE: "POST",
        URI: "commerce-api/checkout/invoices/v1{locale}",
        AUTH: true,
    },
    CHARGING_BALANCE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/charging/balance",
        AUTH: true,
    },
    CHARGING_BALANCE_CHARGE_TYPE_FLAG: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/feature-flag/tao-9296-filter-by-charge-type",
        AUTH: true,
    },
    CHARGING_BALANCE_CREATE_OFFLINE_ORDER: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/charging/payment",
        AUTH: true,
    },
    CHARGING_BALANCE_PAYMENT: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/charging/payment/complete",
        AUTH: true,
    },
    CHARGING_BALANCE_ZERO_DOLLAR_TX: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/charging/signed-token",
        AUTH: true,
    },
    CHARGING_BALANCE_GET_IS_BLOCKED: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/charging-cn/supercharger-status",
        AUTH: true,
    },
    CHARGING_HISTORY: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/charging/history",
        AUTH: true,
    },
    CHARGING_HISTORY_VEHICLES: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/charging/vehicles",
        AUTH: true,
    },
    CHARGING_HISTORY_VEHICLE_IMAGES: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/charging/vehicle-images",
        AUTH: true,
    },
    DOWNLOAD_CHARGING_INVOICE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/charging/invoice/{uuid}",
        AUTH: true,
    },
    DOWNLOAD_CHARGING_SUBSCRIPTION_INVOICE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/charging/subscription/invoice/{invoiceId}",
        AUTH: true,
    },
    CHARGING_DOWNLOAD_CSV: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/charging/export",
        AUTH: true,
    },
    CHARGING_GET_SITES_BOUNDING_BOX: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/charging/sites",
        AUTH: true,
    },
    CHARGING_GET_SITE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/charging/site/{id}",
        AUTH: true,
    },
    CHARGING_STOP_SESSION: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/charging/session/stop/{id}",
        AUTH: true,
    },
    FINANCING_IS_ENABLED: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/is-captive",
        AUTH: true,
    },
    FINANCING_FETCH_DETAILS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/details",
        AUTH: true,
    },
    FINANCING_FETCH_DOCUMENT_LIST: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/document-list",
        AUTH: true,
    },
    FINANCING_DOWNLOAD_DOCUMENT: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/document",
        AUTH: true,
    },
    FINANCING_GET_SIGNED_TOKEN: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/signed-token",
        AUTH: true,
    },
    FINANCING_GET_COMMERCIAL_SIGNED_TOKEN: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/commercial-signed-token",
        AUTH: true,
    },
    FINANCING_GET_BILLING_ADDRESS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/billing-address",
        AUTH: true,
    },
    FINANCING_GET_WIRE_TRANSFER_INFO: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/wire-transfer-info",
        AUTH: true,
    },
    FINANCING_UPDATE_BILLING_ADDRESS: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/billing-address",
        AUTH: true,
    },
    FINANCING_ONE_TIME_PAYMENT_SIGNED_TOKEN: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/one-time-payment-signed-token",
        AUTH: true,
    },
    FINANCING_UPDATE_ONE_TIME_PAYMENT_STATUS: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/update-one-time-payment-status",
        AUTH: true,
    },
    FINANCING_UPDATE_ENROLLMENT_SETTINGS: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/update-enrollment-settings",
        AUTH: true,
    },
    FINANCING_LOOKUP_WALLET: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/lookup-wallet",
        AUTH: true,
    },
    FINANCING_GET_FEATURE_FLAGS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/feature-flags",
        AUTH: true,
    },
    FINANCING_GET_E_SIGN_DOCUMENTS_STATUS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/documents-status",
        AUTH: true,
    },
    FINANCING_SUBMIT_FINANCING_ACTION: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/manage-financing-action",
        AUTH: true,
    },
    FINANCING_GET_EXTENSION_QUOTE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/extension-quote",
        AUTH: true,
    },
    FINANCING_GET_CAR_DETAILS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/car-details",
        AUTH: true,
    },
    FINANCING_GET_E_SIGN_SUMMARY: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/esign-summary",
        AUTH: true,
    },
    FINANCING_GET_E_SIGN_DOCUMENT: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/esign-document",
        AUTH: true,
    },
    FINANCING_GET_ACQUISITION_FILE_LIST: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/acquisition/files",
        AUTH: true,
    },
    FINANCING_GET_ACQUISITION_FILE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/acquisition/file",
        AUTH: true,
    },
    FINANCING_UPLOAD_ACQUISITION_FILE: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/acquisition/file",
        AUTH: true,
    },
    FINANCING_VALIDATE_E_SIGN_DETAILS: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/esign-validate-details",
        AUTH: true,
    },
    FINANCING_GET_ACQUISITION_DETAILS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/acquisition/details",
        AUTH: true,
    },
    FINANCING_GET_APPOINTMENT_DETAILS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/appointment/details",
        AUTH: true,
    },
    FINANCING_GET_APPOINTMENT_LOCATION: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/appointment/location",
        AUTH: true,
    },
    FINANCING_GET_SETTLEMENT_QUOTE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/settlement-quote",
        AUTH: true,
    },
    FINANCING_GENERATE_QUOTE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/quote",
        AUTH: true,
    },
    FINANCING_GENERATE_BUYOUT_QUOTE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/buyout-quote",
        AUTH: true,
    },
    FINANCING_GET_ODOMETER_INFO: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/odometer-info",
        AUTH: true,
    },
    FINANCING_REMOVE_ACQUISITION_FILE: {
        TYPE: "PUT",
        URI: "bff/v2/mobile-app/financing/acquisition/file",
        AUTH: true,
    },
    FINANCING_SUBMIT_ACQUISITION: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/acquisition/submit",
        AUTH: true,
    },
    FINANCING_STATUS_UPDATE_ACQUISITION: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/acquisition/status-update",
        AUTH: true,
    },
    FINANCING_SUBMIT_APPOINTMENT: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/appointment/save",
        AUTH: true,
    },
    FINANCING_CANCEL_APPOINTMENT: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/appointment/cancel",
        AUTH: true,
    },
    FINANCING_GET_NEAREST_LOCATIONS: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/appointment/nearest-locations",
        AUTH: true,
    },
    FINANCING_GET_OPEN_SLOTS: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/appointment/open-slots",
        AUTH: true,
    },
    FINANCING_GET_OPTION_CODES: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/option-codes",
        AUTH: true,
    },
    FINANCING_GET_TRANSLATIONS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/translations",
        AUTH: true,
    },
    FINANCING_REQUEST_INSPECTION_APPOINTMENT: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/financing/appointment/inspection-request",
        AUTH: true,
    },
    FINANCING_GET_REGISTRATION_ADDRESS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/financing/registration-address",
        AUTH: true,
    },
    DASHCAM_SAVE_CLIP: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/dashcam_save_clip",
        AUTH: true,
    },
    NON_OWNER_SUPPORTED_PRODUCTS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/user/supported-products",
        AUTH: true,
    },
    FEATURE_CONFIG: {
        TYPE: "GET",
        URI: "api/1/users/feature_config",
        AUTH: true,
    },
    SITE_LOCK_GET_SITES: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/charging-cn/get-locks",
        AUTH: true,
    },
    SITE_LOCK_SEND_UNLOCK_REQUEST: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/charging-cn/open-lock",
        AUTH: true,
    },
    SITE_LOCK_GET_STATUS: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/charging-cn/get-lock-status",
        AUTH: true,
    },
    FETCH_VEHICLE_SHARED_DRIVERS: {
        TYPE: "GET",
        URI: "api/1/vehicles/{vehicle_id}/drivers",
        AUTH: true,
    },
    CREATE_VEHICLE_SHARE_INVITE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/invitations",
        AUTH: true,
    },
    FETCH_VEHICLE_SHARE_INVITES: {
        TYPE: "GET",
        URI: "api/1/vehicles/{vehicle_id}/invitations",
        AUTH: true,
    },
    REVOKE_VEHICLE_SHARE_INVITE: {
        TYPE: "POST",
        URI: "api/1/vehicles/{vehicle_id}/invitations/{invite_id}/revoke",
        AUTH: true,
    },
    REMOVE_VEHICLE_SHARE_DRIVER: {
        TYPE: "DELETE",
        URI: "api/1/vehicles/{vehicle_id}/drivers/{share_user_id}",
        AUTH: true,
    },
    REDEEM_VEHICLE_SHARE_INVITE: {
        TYPE: "POST",
        URI: "api/1/invitations/redeem",
        AUTH: true,
    },
    AUTH_GENERATE_INSTANT_LOGIN: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/auth/generate-instant-login",
        AUTH: true,
    },
    GET_MANAGE_DRIVER_FLAG: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/feature-flag/TAO-14025-add-driver-flow",
        AUTH: true,
    },
    CONTACT_US_CLASSIFICATION: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/contact-us/classify-narrative",
        AUTH: true,
    },
    CONTACT_US_CONTENT_CATALOG: {
        TYPE: "GET",
        URI: "mobile-app/contact-us/content-catalog",
        AUTH: true,
    },
    VEHICLE_PSEUDONYM_DIRECTIVES: {
        TYPE: "POST",
        URI: "api/1/directives/products",
        AUTH: true,
    },
    VEHICLE_UPLOAD_PSEUDONYM_DIRECTIVE: {
        TYPE: "POST",
        URI: "api/1/directives/discover",
        AUTH: true,
    },
    VEHICLE_COMPLETE_PSEUDONYM_DIRECTIVE: {
        TYPE: "POST",
        URI: "api/1/directives/products/complete",
        AUTH: true,
    },
    OWNERSHIP_VEHICLE_SPECS_REQUEST: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/ownership/vehicle-details",
        AUTH: true,
    },
    OWNERSHIP_RESERVATION_DETAILS_REQUEST: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/ownership/reservation-details/{rn}",
        AUTH: true,
    },
    OWNERSHIP_WARRANTY_DETAILS_REQUEST: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/ownership/warranty-details",
        AUTH: true,
    },
    COMMERCE_FEATURE_FLAG: {
        TYPE: "GET",
        URI: "mobile-app/commerce/feature-flags",
        AUTH: true,
    },
    COMMERCE_SEARCH_PRODUCTS: {
        TYPE: "POST",
        URI: "commerce-api/searches/v1{locale}",
        AUTH: true,
    },
    VEHICLE_DOWNLOAD_VAULT: {
        TYPE: "GET",
        URI: "api/1/users/vault_profile",
        AUTH: true,
    },
    VEHICLE_UPLOAD_VAULT: {
        TYPE: "POST",
        URI: "api/1/users/vault_profile",
        AUTH: true,
    },
    USER_INFO: {
        TYPE: "GET",
        URI: "api/1/users/me",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_ASSETS_REQUEST: {
        TYPE: "GET",
        URI: "bff/mobile-app/transfer/assets",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_REMOVAL_ELIGIBILITY: {
        TYPE: "GET",
        URI: "bff/mobile-app/transfer/remove-car-eligibility",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_ADD_INITIATE: {
        TYPE: "POST",
        URI: "bff/mobile-app/transfer/add-initiate",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_VALIDATE_CAR_NAME: {
        TYPE: "POST",
        URI: "bff/mobile-app/transfer/validate-car-name",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_REMOVE_INITIATE: {
        TYPE: "POST",
        URI: "bff/mobile-app/transfer/remove-car",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_SECURITY_CODE: {
        TYPE: "POST",
        URI: "bff/mobile-app/transfer/security-code",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_UPLOAD_DOCUMENT: {
        TYPE: "POST",
        URI: "bff/mobile-app/transfer/upload-document",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_ADD_PROCESS: {
        TYPE: "POST",
        URI: "bff/mobile-app/transfer/add-process",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_USER_SIGNED_TOKEN: {
        TYPE: "GET",
        URI: "bff/mobile-app/transfer/user-signed-token",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_SIGNED_TOKEN: {
        TYPE: "POST",
        URI: "bff/mobile-app/transfer/signed-token",
        AUTH: true,
    },
    SECURITY_AND_PRIVACY_ASSETS_REQUEST: {
        TYPE: "GET",
        URI: "bff/mobile-app/security-privacy/assets",
        AUTH: true,
    },
    CONTACT_INFO_ASSETS_REQUEST: {
        TYPE: "GET",
        URI: "bff/mobile-app/account/contact-info-assets",
        AUTH: true,
    },
    VEHICLE_DETAILS_ASSETS_REQUEST: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/ownership/vehicle-details-assets",
        AUTH: true,
    },
    ESA_FETCH_ELIGIBLE: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/esa/eligible",
        AUTH: true,
    },
    ESA_CREATE_OFFLINE_ORDER: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/esa/payment/offline-order",
        AUTH: true,
    },
    ESA_OFFLINE_ORDER_COMPLETE: {
        TYPE: "POST",
        URI: "bff/v2/mobile-app/esa/payment/offline-purchase-complete",
        AUTH: true,
    },
    ESA_FETCH_PURCHASED: {
        TYPE: "GET",
        URI: "bff/v2/mobile-app/esa/purchased",
        AUTH: true,
    },
} as const
