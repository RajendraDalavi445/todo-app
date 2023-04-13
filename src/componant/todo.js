import React, { useEffect, useState } from 'react'
import todo from './images/calender.png'

const getLocalItems = () =>{
   let list = localStorage.getItem('lists');
   if(list){
     return JSON.parse(localStorage.getItem('lists'))
   }else{
     return [];
   }
}

const Todo = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItems] = useState(null);

  const addItem = () => {
    if (!inputData) {
      
    }else {
      const allInputData = {id: new Date().getTime().toString(), name:inputData}
      setItems([...items, allInputData]);
      setInputData('');
    }
  }

  const deleteItem = (index) =>{
    const updateditems = items.filter((elem)=>{
        return index !== elem.id;
    })
    setItems(updateditems);
  }

  const editItem = (id) =>{
    let newEditItem = items.find((elem)=>{
       return elem.id === id;
    })
      setToggleSubmit(false);
      setInputData(newEditItem.name);
      setIsEditItems(id);
  }

  const removeData = () =>{
    setItems([]);
  }

  useEffect(()=>{
    localStorage.setItem('lists', JSON.stringify(items))
  },[items]);

  return (
    <>
      
      <div className="main" >
        <div className="row text-center bg-orange" >
          <div className="col-lg-6 m-auto mt-5">
            <div>
              <img src={todo} alt="todo" style={{ "height": "120px" }} />
              <p>Add Your List Here ✌</p>
            </div>
            <div>
              <input type="text" placeholder='✍ Add Items...'
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
              {
                toggleSubmit ?  <span className='iconplus'><i class="fa-solid fa-plus" title='Add Item' onClick={addItem}></i></span>:
                <span className='edit'><i className="fa-solid fa-pen-to-square" onClick={addItem}></i></span>
              }
             
            </div>
            {
              items.map((elem,ind) => {
                return (
                  <>
                    <div className='d-flex showitem justify-content-between mt-3'key={elem.id}>
                      <h4>{elem.name}</h4>
                      <span className='editicon '><i className="fa-solid fa-pen-to-square" onClick={()=>editItem(elem.id)}></i></span>
                      <span className='icontrash'><i class="fa-solid fa-trash-can" onClick={()=>deleteItem(elem.id)}></i></span>
                    </div>
                  </>
                )
              })
            }
            <div>
              <button className='btn btn-success mt-3' onClick={removeData}><span>Remove Item</span></button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Todo;