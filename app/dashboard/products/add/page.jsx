import { addProduct } from "@/app/lib/actions"
import { AddProductStyles } from "@/app/ui/dashboard"
const AddProductPage =()=>{
    return(
        <div className={AddProductStyles.container}>
            <form action={addProduct} className={AddProductStyles.form}>
                <input type="text" placeholder="title" name="title" required/>
                <select name="cat" id="cat">
                    <option value="kitche">kitchen</option>
                    <option value="phone">Phone</option>
                    <option value="computer">Computer</option>
                </select>
                <input  type="number" placeholder="price" name="price"/>
                <input  type="number" placeholder="stock" name="stock"/>
                <input  type="text" placeholder="color" name="color"/>
                <input  type="text" placeholder="size" name="size"/>
                <textarea
                    name="desc"
                    id="desc"
                    rows={16}
                    placeholder="Description">

                    </textarea>
                   
                    <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default AddProductPage