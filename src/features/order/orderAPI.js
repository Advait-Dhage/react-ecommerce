export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/orders/'+order.id, {
      method: 'PATCH',
      body: JSON.stringify(order),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort,pagination) {
  let queryString=''

  for(let key in sort){
    queryString+=`${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString+=`${key}=${pagination[key]}&`
  }
  console.log('querystring', queryString)
  return new Promise(async(resolve) =>{
    //we will support multiple values in future
    const response = await fetch(`http://localhost:8080/orders?${queryString}`);
  const OrderData=await response.json()
  // console.log("Fetched sorted orders:", OrderData);  // Debugging log
  resolve({data:{orders:OrderData.data,totalOrders:OrderData.items}})
  }
  );
}

