export type statusType = "Alive" | "Death"

export interface IRickMortyApiCharacters{
    id: number,
    name: string,
    status: statusType,
    image: string
}
export interface IRickMortyApi{
    info: {

        count: number,
        pages: number,
        next: string,
        prev: string | null
    },
    results: IRickMortyApiCharacters[]; //TODO: Replace with full data type
}