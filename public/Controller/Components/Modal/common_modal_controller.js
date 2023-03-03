import {get} from "../../api/api.js";

export const load_more_docs= async(route,page,limit)=>{
    const res = await get(`${route}/page/${page}/limit/${limit}`)
    const docs  =res.data.docs;
    return docs;
}