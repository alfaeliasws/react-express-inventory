import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProducts, getAllProducts, removeProducts, updateProducts } from '../services/Products';


function List() {

  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  // ! HELPER

  async function fetchProducts(){
    const response = await getAllProducts()
    if(response.status === 200){
      const data = response.products
      setData(prev => data)
    }
  }

  async function debounce(func, time) {
      const timer = setTimeout(async () => {
        const resp = await func;
        resolve(resp)
      }, time ?? 500)
      clearTimeout(timer)
  }

  function filterSearch(value){
    const filter = data?.filter((item) =>  {
      return (item.name ?? "").toLowerCase().includes((value ?? "").toLowerCase()) || (parseInt(item.stock) ?? 0) <= (parseInt(value) ?? 0)})
    setFilteredData(prev => filter)
  }

  // ! MAIN FUNCTION

  async function handleChange(e) {
    
    if(e.target.id === "search") {
      e.preventDefault()
      setSearch(prev => e.target.value)
      filterSearch(e.target.value)
    }

    //UPDATE DATA

    if(e.target.id.includes('index') && !e.target.id.includes('delete')){
      const id = e.target.id

      const num = id.match(/\d+/g);
      const prodId = parseInt(num[1])
      const stringArr = id.match(/[A-Za-z]+/g);
      const string = stringArr[1]
      const nonModifiedData = data.filter((item) => item.id !== prodId)

      const modifiedObject = data.filter((item) => item.id === prodId)[0]

      if(!e.target.value){
        if(string === "stock"){
          e.target.value = 0
        }
      }

      if(string === "stock" && e.target.value.toString().length > 1 && e.target.value.toString()[0] === "0"){
        e.target.value = parseInt(e.target.value)
      }

      modifiedObject[string] = e.target.value
      
      const newData = [...nonModifiedData, modifiedObject].sort((a,b) => a.id - b.id)
      
      setData((prevData) => newData);
      
      if(e.target.id.includes('filter')){
        filterSearch(search)
      }
      await debounce(updateProducts(modifiedObject, modifiedObject.id))

    }

    // ADD DATA

    if(e.target.id.includes('buttonAdd')){
      const id = e.target.id

      const addedObject = {
        "name": "",
        "stock": 0,
        "id": "new"
      }

      const newData = [...data, addedObject]

      setData(prev => newData)

      const addResponse = await addProducts(addedObject)

      const insertId = addResponse.products.insertId

      const dataWithId = data.filter((item) => item.id === "new")
      const dataWithIdOther = data.filter((item) => item.id !== "new")


      dataWithId.id = insertId

      const newestData = [...dataWithIdOther, dataWithId].sort((a,b) => a.id - b.id)

      setData(prev => newestData)

      await debounce(fetchProducts, 500)
    }


    // DELETE DATA

    if(e.target.id.includes('delete')){
      const id = e.target.id

      const num = id.match(/\d+/g);
      const prodId = parseInt(num[1])

      const newData = data.filter((item, i) => item.id !== prodId);

      await removeProducts(prodId)
      
      setData(prev => newData)

      await debounce(fetchProducts, 500)

    }
  }

  // ! USE EFFECT

  useEffect(() => {
    fetchProducts()
  },[])
  
  useEffect(() => {
  }, [data])


  return (
    <div className="flex overflow-hidden flex-col">
      <header className="flex flex-wrap gap-10 items-start px-2.5 py-7 whitespace-nowrap min-h-[71px] bg-[#222933] justify-between pr-3">
        <div className="relative text-2xl font-semibold text-blue-50">
          Inventory Lists
        </div>
      </header>
     
      <section className="flex relative z-10 flex-col pt-7 pr-11 pl-1.5 mt-0 w-full max-md:pr-5 max-md:max-w-full">
        <div className="flex flex-wrap px-16 max-w-full font-semibold w-8/12">
        </div>
        <div className="flex relative gap-5 justify-between mt-1 w-full font-semibold max-md:max-w-full">
          <div className="flex flex-col items-end pl-0 pt-3.5 pb-1 text-sm bg-black bg-opacity-0 text-neutral-400 max-md:pl-5 max-md:max-w-full w-3/12">
            <div className="flex px-3 py-2.5 bg-white border-2 border-solid border-neutral-300 w-full">
              <input id="search" className="flex-auto focus:outline-none" placeholder='Filter by name & filter by stock less by' type="text" onChange={(e) =>handleChange(e)} />
            </div>
          </div>

        </div>
      </section>

      <main className="flex relative flex-col w-full items-center min-h-[919px] max-md:pr-5 max-md:max-w-full">
        <div className="flex relative flex-wrap items-center mt-3.5">
          <div className="flex flex-col grow shrink-0 self-end mt-12 basis-0 w-fit max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col px-1 text-2xl font-medium text-gray-800 max-md:max-w-full">
              <div className="self-start">Products</div>
              <div className="flex shrink-0 mt-10 max-w-full h-0.5 bg-gray-100 w-[1213px]" />
            </div>
            <content>
              <section className="flex flex-wrap w-full justify-between mt-8 mb-8">
                <div className="flex flex-wrap w-full text-black text-lg font-black">
                  <div className="flex w-5/12 mb-2">Product</div>
                  <div className="flex w-4/12 mb-2">Stock</div>
                </div>
              </section>

              {
                search ?
                filteredData && filteredData.map((item, index) => {
                  return (
                    <div className="flex flex-wrap w-full text-black text-lg font-black">
                      <div className="flex w-5/12 px-3">
                        <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="text" id={`filter`+`index`+index+`name`+(item.id ?? 0)} onChange={handleChange} value={item.name} />
                      </div>
                      <div className="flex w-3/12 px-3" >
                        <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="number" min="0" id={`filter`+`index`+index+`stock`+(item.id ?? 0)} onChange={handleChange} value={item.stock} />
                      </div>
                      <div className="flex w-1/12 px-3">
                        <button className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-red-700 text-white justify-center px-4 font-medium hover:opacity-60 transition-all" id={`filter`+`index`+index+`delete`+(item.id ?? 0)} onClick={handleChange}>Del</button>
                      </div>
                    </div>
                  )
                })
                :
                data && data.map((item, index) => {
                  return (
                    <div className="flex flex-wrap w-full text-black text-lg font-black">
                      <div className="flex w-5/12 px-3">
                        <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="text" id={`index`+index+`name`+(item.id ?? 0)} onChange={handleChange} value={item.name} />
                      </div>
                      <div className="flex w-3/12 px-3" >
                        <input className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-slate-200 px-4 font-medium" type="number" min="0" id={`index`+index+`stock`+(item.id ?? 0)} onChange={handleChange} value={item.stock} />
                      </div>
                      <div className="flex w-1/12 px-3">
                        <button className="flex flex-wrap w-full py-3 rounded-lg mb-2 mt-1 bg-red-700 text-white justify-center px-4 font-medium hover:opacity-60 transition-all" id={`index`+index+`delete`+(item.id ?? 0)} onClick={handleChange}>Del</button>
                      </div>
                    </div>
                  )
                  })
                }
                {
                !search &&
                <div className="flex flex-wrap w-full text-black text-lg font-black flex-end items-end">
                  <div div className="flex w-9/12 px-3 justify-end">
                    <button className="flex flex-wrap w-1/12 py-3 rounded-lg mb-2 mt-1 bg-gray-700 text-white justify-center px-4 font-medium hover:opacity-60 transition-all" type="float" id={`buttonAdd`} onClick={handleChange}>Add</button>
                  </div>
                </div>
                }
            </content>
          </div>
        </div>
      </main>
    </div>
  )
}

export default List