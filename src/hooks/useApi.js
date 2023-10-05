import axios from "axios"
import { useQuery } from "react-query"


export default function useApi(key,endPoint  )
{

    const BaseUrl = 'https://ecommerce.routemisr.com'

    function getData() {
        return axios.get(`${BaseUrl}/api/v1/${endPoint}`
      )
    }
    return  useQuery(key, getData)
}