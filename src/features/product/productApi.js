export function fetchAllProducts() {
  return new Promise(async(resolve) =>{
  const response=await fetch('http://localhost:8080/products')
  const data=await response.json()
  resolve({data})
  }
  );
}

export function fetchProductsByFilters(filter,sort) {
  //filter = {'category':['beauty','groceries']}
  //sort={_sort:'price'}
  // TODO: on server we will support multi values
  let queryString=''
  for(let key in filter){
    const categoryValues=filter[key]
    if(categoryValues){
      const lastCategoryValue=categoryValues[categoryValues.length-1]
    queryString+=`${key}=${lastCategoryValue}&`
    }
  }

  for(let key in sort){
    queryString+=`${key}=${sort[key]}&`
  }

  return new Promise(async(resolve) =>{
    //we will support multiple values in future
  const response=await fetch('http://localhost:8080/products?'+queryString)
  const data=await response.json()
  resolve({data})
  }
  );
}
