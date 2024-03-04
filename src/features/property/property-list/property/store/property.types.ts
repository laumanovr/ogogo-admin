export interface IProperty {
    key: string,
    name: string,
    nameKy: string,
    nameEn: string,
    icoBase64: string,
    propertyType: number,
    propertyValueType: number,
    propertyGroupId: string,
    propertySubGroupId: string
    localization: boolean
    validationRules: object
}