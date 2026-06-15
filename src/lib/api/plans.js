import { serverFetch } from "../core/server"

export const getPlansByPlanId = async(planId)=>{
    return serverFetch(`/api/plans?plan_id=${planId}`)
}