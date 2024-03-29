import { useEffect, useState } from "react";
import "./product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { REACT_APP_UPLOAD_URL } from "../../private";

const Product = () => {
    const id = useParams().id;
    const [selectedImg, setSelectedImg] = useState("img");
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const { 
        data, loading: productLoading, error: productError 
    } = useFetch(`/products/${id}?populate=*`);

    useEffect(() => {
        setLoading(productLoading);
        setProduct(data);
        setError(productError);
    }, [data, productError, productLoading]);


    return (
        <div className="product">
            {loading ? (
                "loading"
            ) : error ? (
                "Something went wrong!!"
            ) : (
                <>
                    <div className="left">
                        <div className="images">
                            <img
                                src={
                                    REACT_APP_UPLOAD_URL +
                                    product?.attributes?.img?.data?.attributes?.url
                                }
                                alt=""
                                onClick={(e) => setSelectedImg("img")}
                            />
                            <img
                                src={
                                    REACT_APP_UPLOAD_URL +
                                    product?.attributes?.img2?.data?.attributes?.url
                                }
                                alt=""
                                onClick={(e) => setSelectedImg("img2")}
                            />
                        </div>
                        <div className="mainImg">
                            <img
                                src={
                                    REACT_APP_UPLOAD_URL +
                                    product?.attributes[selectedImg]?.data?.attributes?.url
                                }
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="right">
                        <h1 className="title">{product?.attributes?.title}</h1>
                        <span className="price">${product?.attributes?.price}</span>
                        <p>{product?.attributes?.desc}</p>
                        <div className="quantity">
                            <button
                                onClick={() =>
                                    setQuantity(prev => (prev === 1 ? 1 : prev - 1))
                                }
                            >
                                -
                            </button>
                            {quantity}
                            <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                        </div>
                        <button
                            className="add"
                            onClick={() =>
                                dispatch(
                                    addToCart({
                                        id: product.id,
                                        title: product.attributes.title,
                                        desc: product.attributes.desc,
                                        price: product.attributes.price,
                                        img: product.attributes.img.data.attributes.url,
                                        quantity,
                                    })
                                )
                            }
                        >
                            <AddShoppingCartIcon /> ADD TO CART
                        </button>
                        <div className="links">
                            <div className="item">
                                <FavoriteBorderIcon /> ADD TO WISH LIST
                            </div>
                            <div className="item">
                                <BalanceIcon /> ADD TO COMPARE
                            </div>
                        </div>
                        <div className="info">
                            <span>Vendor: Polo</span>
                            <span>Product Type: T-Shirt</span>
                            <span>Tag: T-Shirt, Women, Top</span>
                        </div>
                        <hr />
                        <div className="info">
                            <span>DESCRIPTION</span>
                            <hr />
                            <span>ADDITIONAL INFORMATION</span>
                            <hr />
                            <span>FAQ</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};


export default Product;