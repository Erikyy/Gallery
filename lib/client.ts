import { createClient } from "@supabase/supabase-js";

export const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_API_KEY as string
);



export const fetchPosts = async () => {
    const { data, error } = await client
            .from('gallery')
            .select('*');

    console.log(data);
    

}

export const addPost = async () => {}

export const removePost = async () => {}

export const fetchPostById = async (id: string) => {}
