export let basicNavOption = [
    // {title:"Home",link:"/", all:true},
    {title:"Art Collection",link:"/art", all:true},
    {title:"Exhibition" ,link:"/exhibition", all:true},
    {title:"Education Material",link:"/education", all:true}
]

export let adminNavOption = [
    {title:"Home",link:"/admin" ,all:true},
    {title:"Requests",link:"/admin/requests" , creator:false},
    {title:"Content Creation" ,link:"/admin/add-content", all:true},
     {title:"Edit/Delete Contents",link:"/admin/contents", all:true},
//    {title:"Users Info" ,link:"/admin/users-info", editor:false,creator:false},
//     {title:"Creators Info" ,link:"/admin/creators-info", creator:false},
    
]

export const BACKENDURL = "http://localhost/";
export const APIURL = BACKENDURL+"php/index.php?url=api"