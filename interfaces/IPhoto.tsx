export default interface IPhoto {
    id: string;
    urls: {
        thumb: string,
        full: string,
        small: string,
        regular: string
    };
    description: string;
    alt_description: string;
    likes: number,
    user: {
      username: string
    },
    created_at: string
}