export interface IMoment {
    id?: number,
    title: string,
    description: string,
    imagem: string,
    created_at?: string,
    updated_at: string,
    commnets?: [{ text: string, username: string }]
}