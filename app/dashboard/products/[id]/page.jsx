import { fetchProduct, updateProduct } from "@/app/lib/actions";
import { singleProductStyles } from "@/app/ui/dashboard";
import Image from "next/image";

const SingleProductPage = async({params}) => {
const {id} = params;
const product = await fetchProduct(id)
  return (
    <div className={singleProductStyles.container}>
      <div className={singleProductStyles.infoContainer}>
        <div className={singleProductStyles.imgContainer}>
          <Image src="/noavatar.png" fill alt="" />
        </div>
        {product.title}
      </div>
      <div className={singleProductStyles.formContainer}>
        <form action={updateProduct} className={singleProductStyles.form}>
          <input type="hidden" name="id" value={product.id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label>price</label>
          <input type="number" name="price" placeholder={product.price} />
          <label>Stock</label>
          <input type="number" name="stock" placeholder={product.stock}/>
          <label>Color</label>
          <input type="text" name="color" placeholder={product.color} />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="Kitchen">Kitchen</option>
            <option value="computer">Computer</option>
          </select>
          <label>Description</label>
          <textarea name="desc" id="desc"rows="10" placeholder={product.desc}/>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};
export default SingleProductPage;
