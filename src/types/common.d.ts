export interface IResponse {
    url: string
    payload?: any
}

export interface IList {
    name: string
    id: string
    regions: ILIstRegion[]
    cnt?: number
}

export interface ILIstRegion {
    name: string
    id: string
}

export interface IHistory {
    item: IList
    event: string
    time: string
}

export interface IHistoryEvent {
    title: string
    type: string
}
