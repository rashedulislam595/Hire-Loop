import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async (companyId,status="active")=>{
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    const data = await res.json();
    return data;
}

export const getAllJobs = async()=>{
    return serverFetch('/api/jobs');
}