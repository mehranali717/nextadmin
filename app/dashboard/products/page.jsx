import { deleteProduct } from "@/app/lib/actions";
import { fetchProducts } from "@/app/lib/data";
import { Pagination, Search, productStyles } from "@/app/ui/dashboard";
import Image from "next/image";
import Link from "next/link";

const ProductsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, products } = await fetchProducts(q, page);
  return (
    <div className={productStyles.container}>
      <div className={productStyles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/dashboard/products/add">
          <button className={productStyles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={productStyles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>
                <div className={productStyles.product}>
                  <Image
                    src="/noproduct.jpg"
                    alt=""
                    width={40}
                    height={40}
                    className={productStyles.productImage}
                  />
                  {product.title}
                </div>
              </td>
              <td>{product.desc}</td>
              <td>{product.price}</td>
              <td>23.2.2024</td>
              <td>{product.stock}</td>
              <td>
                <div className={productStyles.buttons}>
                  <Link href={`/dashboard/products/${product.id}`}>
                    <button
                      className={`${productStyles.button} ${productStyles.view}`}
                    >
                      View
                    </button>
                  </Link>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <button
                      className={`${productStyles.button} ${productStyles.delete}`}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};
export default ProductsPage;
