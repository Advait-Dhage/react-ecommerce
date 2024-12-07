export function fetchAllProducts() {
  return new Promise(async(resolve) =>{
  const response=await fetch('http://localhost:8080/products')
  const data=await response.json()
  resolve({data})
  }
  );
}

export function fetchProductById(id) {
  return new Promise(async(resolve) =>{
  const response=await fetch('http://localhost:8080/products/'+id)
  const data=await response.json()
  resolve({data})
  }
  );
}

export function fetchProductsByFilters(filter,sort,pagination) {
  //filter = {'category':['beauty','groceries']}
  //sort={_sort:'price'}
  //pagination={_page:1,_per_page:10} ..._page=1&_per_page=10
  // TODO: on server we will support multi values
  let queryString=''
  for(let key in filter){
    const categoryValues=filter[key]
    if(categoryValues.length){
      const lastCategoryValue=categoryValues[categoryValues.length-1]
    queryString+=`${key}=${lastCategoryValue}&`
    }
  }

  for(let key in sort){
    queryString+=`${key}=${sort[key]}&`
  }
  console.log(pagination)
  for(let key in pagination){
    queryString+=`${key}=${pagination[key]}&`
  }

  return new Promise(async(resolve) =>{
    //we will support multiple values in future
  const response=await fetch('http://localhost:8080/products?'+queryString)
  const data=await response.json()
  console.log(data)
  const totalItems =data.items
  console.log(totalItems)
  resolve({data:{products:data,totalItems:+totalItems}})
  }
  );
}

export function fetchCategories() {
  return new Promise(async(resolve) =>{
  const response=await fetch('http://localhost:8080/categories')
  const data=await response.json()
  resolve({data})
  }
  );
}

export function fetchBrands() {
  return new Promise(async(resolve) =>{
  const response=await fetch('http://localhost:8080/brands')
  const data=await response.json()
  resolve({data})
  }
  );
}
