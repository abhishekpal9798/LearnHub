import React from 'react'
// import { toast } from "react-hot-toast"
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';


// ================ get Catalog Page Data  ================
export const getCatalogPageData = async (categoryId) => {
  // const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API,
      { categoryId: categoryId, });

    if (!response?.data?.success) {
      console.log("CATALOG PAGE DATA API ERROR RESPONSE............", response?.data?.message)
      throw new Error(response?.data?.message || "Could not Fetch Category page data");
    }

    console.log("CATALOG PAGE DATA API RESPONSE............", response)
    result = response?.data?.data;

  }
  catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    // toast.error(error.response?.data.message);
    // Don't set result to undefined on error, let it be null
  }
  // toast.dismiss(toastId);
  return result;
}

