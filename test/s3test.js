const imageform= document.querySelector('#imageForm')
const imageInput = document.querySelector('#imageInput')



imageform.addEventListener('submit', async (event)=>{
    event.preventDefault()
    const file= imageInput.files[0];

    // get sucure url form the server
    const{ url,  } =  await fetch('/s3Url' ).then( res => res.json()) 
    console.log(url)

 
    // post the image dirctly to the s3 bucket
    await fetch(url, {
        method: "PUT",
        headers:{
            "Content-Type": "multipart/form-data"
        },
        body: file
    })
    const imageUrl = url.split('?')[0]
    console.log(imageUrl)
    document.querySelector(".uploadedImg").src = imageUrl

    // post request to my server to store the any extra data
    

})

console.log('this is woriking')