import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // some endpoints might require headers
    })
    const user = session?.user || null;
    return user;
}

export const requiredRole = async(role)=>{
    const user = await getUserSession();
    if(user.role !== role){
        redirect('/unauthorized')
    }
}