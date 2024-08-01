import "../css/AddProductPage.css"
import axios from "axios";


export function AddProductPage(){

    async function addProducts(event){
        event.preventDefault();
        try{
            const formData = new FormData();
            const proName = document.getElementById("proName").value;
            const proPrice = document.getElementById("price").value;
            const proOffer = document.getElementById("offer").value;
            const proType = document.getElementById("type").value;
            const proRatings = document.getElementById("ratings").value;
            const proDetails = document.getElementById("details").value;
            const proImage = document.getElementById("image").files[0];
            const category = document.getElementById("category").value;
            const sub_category = document.getElementById("sub-category").value;


            formData.append('product_name', proName);
            formData.append('price', proPrice);
            formData.append('offer' , proOffer);
            formData.append('product_type', proType);
            formData.append('ratings', proRatings);
            formData.append('product_detail', proDetails);
            formData.append('product_image', proImage);
            formData.append('product_category', category);
            formData.append('product_sub_category', sub_category);

            const resp = await axios.post("http://localhost:8082/addProducts",formData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log("Product added successfully.");
        }
        catch(error){
            console.log("Error while adding the product !",error);
            console.log(error);
        }
    }

    return(
        <div>
              <div class="product-form-container">
                <form class="product-form" onSubmit={addProducts}>
                    <h2>Add Product</h2>
                    <div class="form-group">
                        <label for="name">Product Name</label>
                        <input type="text" id="proName" name="name" required/>
                    </div>
                    <div class="form-group">
                        <label for="price">Price</label>
                        <input type="number" id="price" name="price" required/>
                    </div>
                    <div class="form-group">
                        <label for="offer">Offer</label>
                        <input type="number" id="offer" name="offer" required/>
                    </div>
                    <div class="form-group">
                        <label for="type">Type</label>
                        <select id="type" name="type" required>
                            <option value="">Select Type</option>
                            <option value="Cotton">Cotton</option>
                            <option value="Silk">Silk</option>
                            <option value="Plastic">Plastic</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ratings">Ratings</label>
                        <input type="text" id="ratings" name="ratings" min="1" max="5" required/>
                    </div>
                    <select id="category">
                        <option value="null">Select Category</option>
                        <option value="clothes">Clothes</option>
                        <option value="electronics">Electronics</option>
                        <option value="shoes">Shoes</option>
                    </select>
                    <select id="sub-category">
                        <option value="null">Select Sub_Category</option>
                        <option value="mens">Mens</option>
                        <option value="womens">Womens</option>
                        <option value="kids">Kids</option>
                    </select>
                    <div class="form-group">
                        <label for="details">Product Details</label>
                        <textarea id="details" name="details" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="image">Image Upload</label>
                        <input type="file" id="image" name="image" required/>
                    </div>
                    <button type="submit" class="add-product-button">Add Product</button>
                </form>
            </div>
        </div>
    )
}