const Page=()=>{
    const handleForm=async(formData)=>{
        "use server"
        console.log(formData);
    }
    return <form action={handleForm}>
        <input type="text" name="username"/>
        <button>Submit</button>
    </form>
}
export default Page