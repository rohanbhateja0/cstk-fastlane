import { Component } from "../Component";
import { CMSImageField } from "../Fields";

export type FlexGridFields = {
    column_settings: ColumnSettingFields;
    components: { components: Component[] };
    display_options: DisplayOptionFields;
    $: any;
}

export type ColumnSettingFields = {
    large_device_columns: string;
    medium_device_columns: string;
    small_device_columns: string;
}

export type DisplayOptionFields = {
    full_width: boolean;
    add_margins: boolean;
    add_top_margin: boolean;
    add_bottom_margin: boolean;
    centered: boolean;
    bordered: boolean;
    background_color: string;
    background_image: CMSImageField;
}