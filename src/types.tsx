
export interface tagType {
    value: string,
    label: string
}

export interface detailsType {
    id: string
    title: string,
    tags?: readonly tagType[],
    note: string
}

export interface searchType{
    title: string,
    tags: readonly tagType[];
}

