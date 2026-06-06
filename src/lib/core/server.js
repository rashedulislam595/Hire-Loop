const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const serverMutation = async(api,newJobData)=>{
    const res = await fetch(`${baseUrl}${api}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newJobData)
    })
    const data = await res.json();
    return data;
}