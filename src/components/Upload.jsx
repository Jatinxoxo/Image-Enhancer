const Upload = (props) => {

    const ShowImageHandler = (e) => {
        
        const file = e.target.files[0];
        
        if(file){
            props.UploadImageHandler(file);
        }
    }

  return (

    <div className=' bg-white shadow-lg rounded-2xl p-4 w-full max-w-2xl'>
      <label htmlFor="fileInput" className='block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg 
      p-4 text-center hover:border-blue-500 transition-all duration-200'>

        <input 
            type="file" 
            id="fileInput" 
            className='hidden' 
            onChange={ShowImageHandler} 
        />

            <span className=" text-lg font-medium text-gray-600" > Click and Drag to Upload your Image</span>

      </label>



    </div>
  )
}

export default Upload
