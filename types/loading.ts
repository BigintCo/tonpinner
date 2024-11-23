export type IReturn = {
    key: string,
    status: 'error' | 'pending' | 'success'
    fetch: 'fetching' | 'idle' | 'paused',
    data: string | null,
    complete: boolean
}